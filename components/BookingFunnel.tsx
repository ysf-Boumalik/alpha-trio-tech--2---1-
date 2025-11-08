"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogPortal,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/booking-alphatriotech/30min";
const WEBHOOK_URL = "/api/webhook/booking";

interface BookingData {
  intent: string;
  otherText?: string;
  company_size: string;
  timeline: string;
  ts: string;
}

const INTENT_OPTIONS = [
  { value: "Automate operations", label: "Automate operations" },
  { value: "Build an app", label: "Build an app" },
  { value: "AI solution", label: "AI solution" },
  { value: "Other", label: "Other" },
];

const COMPANY_SIZE_OPTIONS = [
  { value: "1-10", label: "1–10" },
  { value: "11-50", label: "11–50" },
  { value: "50+", label: "50+" },
];

const TIMELINE_OPTIONS = [
  { value: "ASAP", label: "ASAP" },
  { value: "1-3 months", label: "1–3 months" },
  { value: "3+ months", label: "3+ months" },
];

const socialTweets = [
  {
    author: "Elon Musk",
    text: "Businesses that ignore AI will fall behind faster than they expect.",
    handle: "@elonmusk",
    timestamp: "2024-11-01",
  },
  {
    author: "Sam Altman",
    text: "Integrating AI isn’t optional anymore — it’s infrastructure.",
    handle: "@sama",
    timestamp: "2024-10-28",
  },
  {
    author: "Naval Ravikant",
    text: "The future of business is AI-driven personalization and automation.",
    handle: "@naval",
    timestamp: "2024-11-05",
  },
];

export function BookingFunnel() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [intent, setIntent] = useState("");
  const [otherText, setOtherText] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [timeline, setTimeline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  const pushToDataLayer = (event: string, data?: any) => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event, ...data });
    } else {
      console.log("DataLayer event:", event, data);
    }
  };

  const sendWebhook = async (payload: BookingData): Promise<boolean> => {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error("Webhook error:", error);
      return false;
    }
  };

  const handleContinueStep3 = async () => {
    setIsSubmitting(true);
    const payload: BookingData = {
      intent,
      otherText: intent === "Other" ? otherText : undefined,
      company_size: companySize,
      timeline,
      ts: new Date().toISOString(),
    };

    pushToDataLayer("funnel_step3_completed", { payload });

    let success = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      success = await sendWebhook(payload);
      if (success) break;
      // Retry delay
      await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
    }

    pushToDataLayer("funnel_step4_started", { success, attempts: 3 });

    setIsSubmitting(false);
    setStep(4);
  };

  const resetForm = () => {
    setStep(1);
    setIntent("");
    setOtherText("");
    setCompanySize("");
    setTimeline("");
  };

  const handleCancel = () => {
    pushToDataLayer("modal_close");
    setIsOpen(false);
    resetForm();
  };

  const handleContinueStep1 = () => {
    pushToDataLayer("funnel_step1_completed", { intent, otherText });
    setStep(2);
  };

  const handleContinueStep2 = () => {
    pushToDataLayer("funnel_step2_completed", {});
    setStep(3);
  };

  const canContinueStep1 =
    intent &&
    (intent !== "Other" ||
      (intent === "Other" &&
        otherText.trim().length > 0 &&
        otherText.trim().length <= 30));
  const canContinueStep3 = companySize && timeline;

  // Focus management for accessibility
  useEffect(() => {
    if (!dialogRef.current) return;

    // Trap focus in dialog (shadcn Dialog handles basic trapping, but enhance for steps)
    const focusableElements = dialogRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        (lastElement as HTMLElement).focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus first element when dialog opens
      setTimeout(() => firstElement?.focus(), 100);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Focus first form element when step changes
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    let target: HTMLElement | null = null;
    if (step === 1) {
      target = dialogRef.current.querySelector(
        'input[type="radio"]'
      ) as HTMLElement;
    } else if (step === 3) {
      target =
        (dialogRef.current.querySelector("#company-1-10") as HTMLElement) ||
        (dialogRef.current.querySelector('input[type="radio"]') as HTMLElement);
    } else if (step === 2) {
      target = dialogRef.current.querySelector(
        ".continue-step2"
      ) as HTMLElement;
    }

    if (target) {
      setTimeout(() => target?.focus(), 100);
    }
  }, [step, isOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest(
        'a[href*="book" i], a[href*="schedule" i], a[href*="consult" i], .book-cta'
      );
      if (link) {
        e.preventDefault();
        pushToDataLayer("clicked_book", {
          href: (link as HTMLAnchorElement).href,
        });
        pushToDataLayer("modal_open");
        setIsOpen(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleCancel();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Auto redirect on step 4
  useEffect(() => {
    if (step === 4) {
      pushToDataLayer("redirect_to_calendly", {});
      const timer = setTimeout(() => {
        window.open(CALENDLY_URL, "_blank");
        setIsOpen(false);
        resetForm();
      }, 2000); // 2 seconds delay
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogPortal>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md">
          <DialogContent
            ref={dialogRef}
            className="sm:max-w-2xl max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            onInteractOutside={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                {step === 1
                  ? "What’s the main problem you want solved?"
                  : step === 2
                  ? "What leaders are saying about AI and online presence"
                  : step === 3
                  ? "A bit more about your needs"
                  : "Let's schedule a call"}
                <span id="dialog-title" className="sr-only">
                  {step === 1
                    ? "What’s the main problem you want solved?"
                    : step === 2
                    ? "What leaders are saying about AI and online presence"
                    : step === 3
                    ? "A bit more about your needs"
                    : "Let's schedule a call"}
                </span>
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                50+ projects • 30+ happy clients • 5+ years
              </DialogDescription>
              <Progress value={Math.round((step / 4) * 100)} className="mt-4" />
            </DialogHeader>

            <div className="py-4 space-y-6">
              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <RadioGroup value={intent} onValueChange={setIntent}>
                      {INTENT_OPTIONS.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                            aria-label={`Select intent ${option.label}`}
                            ref={
                              option.value === "Automate operations"
                                ? firstFocusableRef
                                : undefined
                            }
                          />
                          <Label htmlFor={option.value}>{option.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {intent === "Other" && (
                      <div className="pt-2">
                        <Label htmlFor="otherText">
                          Please specify (max 30 chars)
                        </Label>
                        <Input
                          id="otherText"
                          value={otherText}
                          onChange={(e) =>
                            setOtherText(e.target.value.slice(0, 30))
                          }
                          placeholder="e.g., Custom integration"
                          maxLength={30}
                          className="mt-1"
                          aria-describedby="other-count"
                        />
                        <p
                          id="other-count"
                          className="text-xs text-muted-foreground mt-1 sr-only"
                        >
                          {otherText.length} of 30 characters
                        </p>
                        <p
                          className="text-xs text-muted-foreground mt-1"
                          aria-hidden="true"
                        >
                          {otherText.length}/30
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={handleContinueStep1}
                      disabled={!canContinueStep1}
                      aria-label="Continue to next step"
                    >
                      Continue
                    </Button>
                  </div>
                </>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="space-y-4 max-h-[300px] overflow-y-auto">
                    <h3 className="text-lg font-semibold">
                      What leaders are saying about AI and online presence
                    </h3>
                    <Carousel className="w-full">
                      <CarouselContent className="h-[200px]">
                        {socialTweets.map((tweet, index) => (
                          <CarouselItem key={index}>
                            <div className="p-1">
                              <Card className="h-full">
                                <CardContent className="flex items-start p-4 space-y-2 h-full">
                                  <img
                                    src="/placeholder-user.jpg"
                                    alt={`${tweet.author}'s avatar`}
                                    className="w-8 h-8 rounded-full flex-shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-medium text-sm">
                                        {tweet.author}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {tweet.handle}
                                      </span>
                                    </div>
                                    <p className="text-sm text-foreground leading-tight max-h-[3em] overflow-hidden">
                                      {tweet.text}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                      {tweet.timestamp}
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                    <p className="text-sm text-muted-foreground">
                      AI-powered systems are redefining efficiency and
                      visibility. Let’s prepare your business to stay ahead.
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      Industry leaders agree — AI and digital presence are the
                      new growth levers. Let’s explore how for your company.
                    </p>
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={handleContinueStep2}
                      className="continue-step2"
                    >
                      Continue
                    </Button>
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">
                        Company size
                      </Label>
                      <RadioGroup
                        value={companySize}
                        onValueChange={setCompanySize}
                        className="pt-2 space-y-2"
                      >
                        {COMPANY_SIZE_OPTIONS.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={`company-${option.value}`}
                              aria-label={`Select company size ${option.label}`}
                            />
                            <Label htmlFor={`company-${option.value}`}>
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Timeline</Label>
                      <RadioGroup
                        value={timeline}
                        onValueChange={setTimeline}
                        className="pt-2 space-y-2"
                      >
                        {TIMELINE_OPTIONS.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={`timeline-${option.value}`}
                              aria-label={`Select timeline ${option.label}`}
                            />
                            <Label htmlFor={`timeline-${option.value}`}>
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="mr-auto"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleContinueStep3}
                      disabled={!canContinueStep3 || isSubmitting}
                      aria-label="Continue"
                    >
                      {isSubmitting ? "Sending..." : "Continue"}
                    </Button>
                  </div>
                </>
              )}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="space-y-4 text-center">
                    <p className="text-lg font-semibold">
                      Great! We're redirecting you to Calendly to schedule your
                      call.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      If the page doesn't open automatically,{" "}
                      <a
                        href={CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        click here
                      </a>
                      .
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </DialogContent>
        </div>
      </DialogPortal>
    </Dialog>
  );
}
