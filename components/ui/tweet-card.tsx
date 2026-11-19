"use client"

import { useEffect, useState } from "react"
import { enrichTweet, type EnrichedTweet } from "react-tweet"
import type { Tweet } from "react-tweet/api"
import { cn } from "@/lib/utils"

type TweetCardProps = {
  id: string
  className?: string
  onError?: (error: Error) => void
}

type SavedTweetCardProps = {
  id: string
  name: string
  handle: string
  text: string
  className?: string
}

export const SavedTweetCard = ({
  id,
  name,
  handle,
  text,
  className,
}: SavedTweetCardProps) => {
  const postUrl = `https://x.com/${handle}/status/${id}`
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)

  return (
    <article
      className={cn(
        "flex h-full w-full min-w-72 max-w-lg flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-purple-100 font-semibold text-purple-700 dark:bg-purple-900 dark:text-purple-200"
        >
          {initials}
          <img
            src={`https://unavatar.io/twitter/${handle}`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display = "none"
            }}
          />
        </div>
        <div className="min-w-0">
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate font-semibold hover:underline"
          >
            {name}
          </a>
          <p className="truncate text-sm text-gray-500">@{handle}</p>
        </div>
        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${name}'s original post on X`}
          className="ml-auto shrink-0 font-bold text-sky-500"
        >
          X
        </a>
      </div>

      <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
        {text}
      </p>

      <a
        href={postUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto text-xs text-gray-500 hover:underline"
      >
        View original post
      </a>
    </article>
  )
}

export const TweetSkeleton = ({
  className,
}: {
  className?: string
}) => (
  <div
    className={cn(
      "flex min-w-72 flex-col gap-3 rounded-lg border p-4",
      className
    )}
  >
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
      <div className="h-8 flex-1 animate-pulse rounded bg-gray-200" />
    </div>
    <div className="h-24 animate-pulse rounded bg-gray-200" />
  </div>
)

export const TweetNotFound = ({
  id,
  className,
}: {
  id?: string
  className?: string
}) => (
  <div
    className={cn(
      "flex min-w-72 flex-col items-center justify-center gap-3 rounded-lg border p-4",
      className
    )}
  >
    <p className="text-sm text-gray-500">
      Tweet unavailable
    </p>
    {id && (
      <a
        href={`https://x.com/i/status/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-500 hover:underline"
      >
        View Tweet on X
      </a>
    )}
  </div>
)

export const MagicTweet = ({
  tweet,
  className,
}: {
  tweet: Tweet
  className?: string
}) => {
  const raw = tweet as Tweet & {
    entities?: unknown
    text?: string
    full_text?: string
    id_str?: string
  }

  let enrichedTweet: EnrichedTweet | null = null

  try {
    const normalizedTweet = {
      ...raw,
      entities: Array.isArray(raw.entities)
        ? raw.entities
        : [],
    } as Tweet

    enrichedTweet = enrichTweet(normalizedTweet)
  } catch (error) {
    console.error("Error enriching tweet:", error)
  }

  const user = enrichedTweet?.user ?? tweet.user

  if (!user) {
    return (
      <TweetNotFound
        id={tweet.id_str}
        className={className}
      />
    )
  }

  const tweetUrl =
    enrichedTweet?.url ||
    `https://x.com/i/status/${tweet.id_str}`

  const tweetText =
    raw.full_text || raw.text || ""

  const entities = enrichedTweet?.entities

  const photos = enrichedTweet?.photos
  const video = enrichedTweet?.video

  return (
    <article
      className={cn(
        "relative flex h-full w-full min-w-72 max-w-lg flex-col gap-3 overflow-hidden rounded-lg border p-4 backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {user.profile_image_url_https && (
            <img
              src={user.profile_image_url_https}
              alt={user.name || "Profile"}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
            />
          )}

          <div className="min-w-0">
            <p className="truncate font-semibold">
              {user.name}
              {(user.verified || user.is_blue_verified) && (
                <span className="ml-1 text-blue-500">
                  ✓
                </span>
              )}
            </p>
            <p className="truncate text-sm text-gray-500">
              @{user.screen_name}
            </p>
          </div>
        </div>

        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-sm font-bold text-gray-500"
          aria-label="View on X"
        >
          X
        </a>
      </div>

      <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
        {Array.isArray(entities) && entities.length > 0
          ? entities.map((entity, index) => {
              if (entity.type === "text") {
                return (
                  <span key={index}>
                    {entity.text}
                  </span>
                )
              }

              return (
                <a
                  key={index}
                  href={entity.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {entity.text}
                </a>
              )
            })
          : tweetText}
      </div>

      {Array.isArray(photos) && photos.length > 0 && (
        <div className="flex gap-2 overflow-x-auto">
          {photos.map((photo) => (
            <img
              key={photo.url}
              src={photo.url}
              alt="Tweet media"
              className="max-h-72 w-full rounded-lg object-cover"
            />
          ))}
        </div>
      )}

      {video && (
        <video
          poster={video.poster}
          controls
          playsInline
          className="w-full rounded-lg"
        >
          {video.variants
            .filter((variant) => variant.type === "video/mp4")
            .slice(0, 1)
            .map((variant) => (
              <source
                key={variant.src}
                src={variant.src}
                type="video/mp4"
              />
            ))}
        </video>
      )}

      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto text-xs text-gray-500 hover:underline"
      >
        View original tweet
      </a>
    </article>
  )
}

export const TweetCard = ({
  id,
  className,
  onError,
}: TweetCardProps) => {
  const [tweet, setTweet] = useState<Tweet | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchTweet = async () => {
      setLoading(true)
      setTweet(null)
      setError(null)

      try {
        if (!id) {
          throw new Error("Tweet ID is missing")
        }

        const response = await fetch(
          `/api/tweet/${encodeURIComponent(id)}`
        )

        if (!response.ok) {
          throw new Error(
            `Failed to fetch tweet: ${response.status}`
          )
        }

        const data: Tweet & { error?: string } =
          await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        if (!data.id_str) {
          throw new Error("Invalid tweet data")
        }

        if (!cancelled) {
          setTweet(data)
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error
              ? err.message
              : "Unknown error"

          console.error(`Tweet ${id}:`, err)
          setError(message)

          onError?.(
            err instanceof Error
              ? err
              : new Error(message)
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchTweet()

    return () => {
      cancelled = true
    }
  }, [id, onError])

  if (loading) {
    return <TweetSkeleton className={className} />
  }

  if (error || !tweet) {
    return (
      <TweetNotFound
        id={id}
        className={className}
      />
    )
  }

  return (
    <MagicTweet
      tweet={tweet}
      className={className}
    />
  )
}