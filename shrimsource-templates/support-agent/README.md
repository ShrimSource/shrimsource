# Client Support Agent

Analyze incoming support tickets to extract intent, evaluate urgency, search the knowledge base, and draft a response.

Run with Shrimsource:
```bash
npx create-shrimsource support-agent
```

## Example

**Input:**
```
Hi, I just got locked out of my account and I urgently need to reset my password. Can you help?
```

**Output:**
```
Ticket Analysis:
- Category: authentication
- Urgency: high

Suggested Reply:
Hi there,

Thanks for reaching out! To reset a password, users should go to /settings/security or click 'Forgot Password' on the login screen. Please let me know if you need any further assistance.

Best regards,
Support Team
```
