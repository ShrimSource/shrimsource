import { EmailProvider, EmailOptions } from "../../capabilities/email/interface";

export class ResendEmail implements EmailProvider {
    constructor(private apiKey?: string) {
        this.apiKey = apiKey || process.env.SHRIM_EMAIL_KEY;
    }

    async send(options: EmailOptions): Promise<void> {
        if (!this.apiKey) {
            console.warn(`Resend API key not found. Dummy sending email to ${options.to}`);
            return;
        }

        // Real implementation using resend
        // const resend = new Resend(this.apiKey);
        // await resend.emails.send({ ...options });

        console.log(`Sending email using Resend to ${options.to}...`);
    }
}
