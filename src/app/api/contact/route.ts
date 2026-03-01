import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, message, honeypot } = body;

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Validation
    if (!name || name.length < 2) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters.' }, { status: 400 });
    }

    const contactEmail = process.env.CONTACT_EMAIL || 'info@asmaasalem.com';

    await getResend().emails.send({
      from: 'Asmaa Salem Website <onboarding@resend.dev>',
      to: contactEmail,
      replyTo: email,
      subject: `New Contact: ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px;">
          <h2 style="color: #2f353e; margin-bottom: 24px;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6B7280; width: 120px;">Name</td>
              <td style="padding: 8px 0; color: #2f353e; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #ff523d;">${email}</a></td>
            </tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #6B7280;">Phone</td><td style="padding: 8px 0; color: #2f353e;">${phone}</td></tr>` : ''}
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-left: 3px solid #ff523d;">
            <p style="margin: 0; color: #2f353e; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    console.error('Contact form submission failed');
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
