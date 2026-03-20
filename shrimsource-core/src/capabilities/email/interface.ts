export interface EmailOptions {
    to: string | string[];
    subject: string;
    body: string;
    from?: string;
    html?: string;
}

export interface EmailProvider {
    /**
     * Send an email.
     */
    send(options: EmailOptions): Promise<void>;
}
