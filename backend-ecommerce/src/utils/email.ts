import nodemailer, { Transporter } from "nodemailer";

interface EmailOptions {
    email: string;
    subject: string;
    message: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || '',
        secureConnection: true,
        port: Number(process.env.EMAIL_PORT) || 0,
        auth: {
            user: process.env.EMAIL_ID || '',
            pass: process.env.EMAIL_PASS || ''
        },
    } as nodemailer.TransportOptions);

    const emailOptions = {
        from: "Prolite Support<support@prolite.in>",
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(emailOptions);
};

