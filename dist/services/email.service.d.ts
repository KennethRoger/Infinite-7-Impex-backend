export interface CustomerEnquiryNotificationPayload {
    fullName: string;
    country: string;
    email: string;
    phone: string;
    message: string;
    createdAt?: Date | string | undefined;
}
export declare class EmailService {
    private transporter;
    private readonly isConfigured;
    constructor();
    sendCustomerEnquiryNotification(payload: CustomerEnquiryNotificationPayload): Promise<boolean>;
}
//# sourceMappingURL=email.service.d.ts.map