import { Tool } from "../types";
import { EmailProvider } from "../capabilities/email/interface";

export function createEmailTool(provider: EmailProvider): Tool {
    return {
        name: "send_email",
        description: "Send an email to a user",
        run: async ({ input }) => {
            const options = input as { to: string; subject: string; body: string };
            await provider.send(options);
            return { status: "success", message: `Email sent to ${options.to}` };
        }
    };
}
