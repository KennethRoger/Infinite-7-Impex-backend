import nodemailer, { Transporter } from 'nodemailer';
import { Resend } from 'resend';
import { config } from '../config';

export interface CustomerEnquiryNotificationPayload {
  fullName: string;
  country: string;
  email: string;
  phone: string;
  message: string;
  createdAt?: Date | string | undefined;
}

export class EmailService {
  private resend: Resend | null = null;
  private transporter: Transporter | null = null;

  constructor() {
    const { resendApiKey, host, port, secure, user, pass } = config.mail;

    // 1. Prioritize Resend HTTP API (Port 443 - never blocked by cloud firewalls like Render)
    if (resendApiKey) {
      this.resend = new Resend(resendApiKey);
      console.log('[EmailService] Initialized with Resend HTTP API');
    } else if (host && user) {
      // 2. Fallback to Nodemailer SMTP (for local dev or custom SMTP servers)
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        },
        pool: true,
        maxConnections: 3,
        maxMessages: 100,
        connectionTimeout: 10000,
        greetingTimeout: 5000,
        socketTimeout: 15000,
      });
      console.log(`[EmailService] Initialized with SMTP (${host}:${port})`);
    } else {
      console.log('[EmailService] Neither RESEND_API_KEY nor SMTP credentials configured');
    }
  }

  async sendCustomerEnquiryNotification(
    payload: CustomerEnquiryNotificationPayload
  ): Promise<boolean> {
    const { fullName, country, email, phone, message } = payload;
    const adminEmail = config.mail.adminEmail;

    const subject = `New Customer Enquiry: ${fullName} (${country})`;

    const textContent = `
New Customer Enquiry Received:

Full Name: ${fullName}
Email:     ${email}
Phone:     ${phone}
Country:   ${country}

Message:
${message}
    `.trim();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">New Customer Enquiry</h2>
        <p>A new customer has submitted an enquiry through the website:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr>
            <td style="padding: 8px; font-weight: bold; width: 120px; border-bottom: 1px solid #eee;">Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Country:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${country}</td>
          </tr>
        </table>
        <h3 style="color: #1e293b; margin-top: 16px;">Enquiry Message:</h3>
        <blockquote style="background-color: #f8fafc; padding: 12px 16px; border-left: 4px solid #3b82f6; margin: 0; white-space: pre-wrap;">
          ${message}
        </blockquote>
      </div>
    `.trim();

    // 1. Send via Resend HTTP API if configured
    if (this.resend) {
      try {
        // Resend requires a verified domain or 'onboarding@resend.dev' for testing/free tier
        const fromAddress =
          config.mail.resendFrom ||
          (config.mail.from.includes('@resend.dev') || config.mail.from.includes('@infinite7impex.com')
            ? config.mail.from
            : 'Infinite 7 Impex <onboarding@resend.dev>');

        const { data, error } = await this.resend.emails.send({
          from: fromAddress,
          to: [adminEmail],
          replyTo: email,
          subject,
          text: textContent,
          html: htmlContent,
        });

        if (error) {
          console.error('[EmailService] Resend API error:', error);
          return false;
        }

        console.log(`[EmailService] Admin enquiry notification sent via Resend: ${data?.id}`);
        return true;
      } catch (resendError) {
        console.error('[EmailService] Failed to send email notification via Resend:', resendError);
        return false;
      }
    }

    // 2. Send via SMTP if configured
    if (this.transporter) {
      try {
        const info = await this.transporter.sendMail({
          from: config.mail.from,
          to: adminEmail,
          replyTo: email,
          subject,
          text: textContent,
          html: htmlContent,
        });

        console.log(`[EmailService] Admin enquiry notification sent via SMTP: ${info.messageId}`);
        return true;
      } catch (smtpError) {
        console.error('[EmailService] Failed to send email notification via SMTP:', smtpError);
        return false;
      }
    }

    // 3. Fallback when neither is configured
    console.log(
      `[EmailService] Neither Resend nor SMTP configured. Notification to admin (${adminEmail}) for customer "${fullName}" logged to console:\n${textContent}`
    );
    return false;
  }
}
