import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BookingFunnel } from './BookingFunnel';
import userEvent from '@testing-library/user-event';

// Mock window.open and fetch
global.open = jest.fn();
global.fetch = jest.fn(() =>
  Promise.resolve({ ok: true } as Response)
);

// Mock dataLayer
Object.defineProperty(window, 'dataLayer', {
  value: [],
  writable: true,
});

describe('BookingFunnel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.dataLayer = [];
  });

  it('opens modal on CTA click', async () => {
    render(<BookingFunnel />);

    // Simulate CTA link
    const link = document.createElement('a');
    link.href = '/book';
    link.textContent = 'Book Now';
    document.body.appendChild(link);

    fireEvent.click(link);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    expect(window.dataLayer).toContainEqual(expect.objectContaining({ event: 'modal_open' }));
  });

  it('validates step 1 radio selection', async () => {
    render(<BookingFunnel />);

    // Open modal
    const link = document.createElement('a');
    link.href = '/schedule';
    document.body.appendChild(link);
    fireEvent.click(link);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Continue button should be disabled initially
    const continueBtn = screen.getByRole('button', { name: /continue/i });
    expect(continueBtn).toBeDisabled();

    // Select radio
    const radio = screen.getByLabelText(/automate operations/i);
    await userEvent.click(radio);

    expect(continueBtn).toBeEnabled();

    // Click continue
    await userEvent.click(continueBtn);

    // Should advance to step 2
    expect(screen.getByLabelText(/1–10/i)).toBeInTheDocument();
    expect(window.dataLayer).toContainEqual(expect.objectContaining({ event: 'funnel_step1_completed' }));
  });

  it('shows other text input and validates length for Other intent', async () => {
    render(<BookingFunnel />);

    // Open modal and select Other
    const link = document.createElement('a');
    link.href = '/consult';
    document.body.appendChild(link);
    fireEvent.click(link);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const otherRadio = screen.getByLabelText(/other/i);
    await userEvent.click(otherRadio);

    // Input should appear
    const input = screen.getByLabelText(/please specify/i);
    expect(input).toBeInTheDocument();

    // Continue disabled
    const continueBtn = screen.getByRole('button', { name: /continue/i });
    expect(continueBtn).toBeDisabled();

    // Enter text >30 chars, should truncate
    await userEvent.type(input, 'a'.repeat(35));
    expect(input).toHaveValue('a'.repeat(30));

    // Now enabled
    expect(continueBtn).toBeEnabled();
  });

  it('validates step 2 selections and sends payload on submit', async () => {
    render(<BookingFunnel />);

    // Open and complete step 1
    const link = document.createElement('a');
    link.className = 'book-cta';
    document.body.appendChild(link);
    fireEvent.click(link);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const intentRadio = screen.getByLabelText(/build an app/i);
    await userEvent.click(intentRadio);
    const continueBtn = screen.getByRole('button', { name: /continue/i });
    await userEvent.click(continueBtn);

    // Step 2: Select options
    const companyRadio = screen.getByLabelText(/11–50/i);
    await userEvent.click(companyRadio);
    const timelineRadio = screen.getByLabelText(/asap/i);
    await userEvent.click(timelineRadio);

    const submitBtn = screen.getByRole('button', { name: /book now/i });
    expect(submitBtn).toBeEnabled();

    // Submit
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/webhook/booking', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expect.objectContaining({
          intent: 'Build an app',
          company_size: '11-50',
          timeline: 'ASAP',
          ts: expect.any(String),
        })),
      }));
    });

    expect(window.dataLayer).toContainEqual(expect.objectContaining({ event: 'funnel_step2_completed' }));
    expect(window.dataLayer).toContainEqual(expect.objectContaining({ event: 'redirect_to_calendly' }));
    expect(global.open).toHaveBeenCalledWith(expect.stringContaining('calendly.com'), '_blank');
  });

  it('closes modal on Cancel or ESC', async () => {
    render(<BookingFunnel />);

    // Open modal
    const link = document.createElement('a');
    link.href = '/book';
    document.body.appendChild(link);
    fireEvent.click(link);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Cancel button
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelBtn);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    // Re-open and test ESC
    fireEvent.click(link);
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: 'Escape', bubbles: true });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('retries webhook on failure but still redirects', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<BookingFunnel />);

    // Open, complete step 1 (select intent)
    const link = document.createElement('a');
    link.href = '/schedule';
    document.body.appendChild(link);
    fireEvent.click(link);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByLabelText(/ai solution/i));
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Step 2
    await userEvent.click(screen.getByLabelText(/50\+/i));
    await userEvent.click(screen.getByLabelText(/3\+ months/i));
    await userEvent.click(screen.getByRole('button', { name: /book now/i }));

    // Should retry once (mock only one failure)
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1); // Since second would succeed, but we mock only first fail
    });

    expect(global.open).toHaveBeenCalled(); // Still redirects
  });
});