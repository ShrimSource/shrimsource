import { ProviderOption } from '../templates/registry';

export const EMAIL_PROVIDERS: ProviderOption[] = [
    { id: 'resend', label: 'Resend' },
    { id: 'sendgrid', label: 'SendGrid' },
    { id: 'smtp', label: 'Custom SMTP Server' }
];
