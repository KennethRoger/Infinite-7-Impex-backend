"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
class EmailService {
    constructor() {
        this.transporter = null;
        const { host, port, secure, user, pass } = config_1.config.mail;
        this.isConfigured = Boolean(host && user);
        if (this.isConfigured) {
            this.transporter = nodemailer_1.default.createTransport({
                host,
                port,
                secure,
                auth: {
                    user,
                    pass,
                },
            });
        }
    }
    async sendCustomerEnquiryNotification(payload) {
        const { fullName, country, email, phone, message } = payload;
        const adminEmail = config_1.config.mail.adminEmail;
        const fromAddress = config_1.config.mail.from;
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
        if (!this.transporter) {
            console.log(`[EmailService] SMTP not fully configured. Notification to admin (${adminEmail}) for customer "${fullName}" logged to console:\n${textContent}`);
            return false;
        }
        try {
            const info = await this.transporter.sendMail({
                from: fromAddress,
                to: adminEmail,
                subject,
                text: textContent,
                html: htmlContent,
            });
            console.log(`[EmailService] Admin enquiry notification sent: ${info.messageId}`);
            return true;
        }
        catch (error) {
            console.error('[EmailService] Failed to send email notification:', error);
            return false;
        }
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map