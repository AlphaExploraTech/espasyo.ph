import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { firstName, lastName, email, inquiryType, message } = req.body;

        // 1. Notify Espasyo's inbox
        const { error: notifyError } = await resend.emails.send({
            from: 'ESPASYO Website <inquire@espasyo.ph>',
            to: ['inquire@espasyo.ph'],
            subject: `[${inquiryType}] New Inquiry from ${firstName} ${lastName}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2 style="color: #3A2618;">New Contact Request</h2>
                    <hr/>
                    <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
                </div>
            `
        });

        if (notifyError) {
            console.error("Resend API Error (notify):", notifyError);
            return res.status(400).json({ error: notifyError });
        }

        // 2. Send confirmation to the user
        const { error: confirmError } = await resend.emails.send({
            from: 'ESPASYO <inquire@espasyo.ph>',
            to: [email],
            subject: `We received your inquiry, ${firstName}!`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #3A2618;">Thanks for reaching out, ${firstName}!</h2>
                    <p style="color: #555;">We've received your message and will get back to you as soon as possible.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
                    <p><strong>Your Message:</strong></p>
                    <p style="background: #f4f4f4; padding: 15px; border-radius: 5px; color: #333;">${message}</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="color: #888; font-size: 13px;">
                        ESPASYO Study & Office Hub<br/>
                        6A T. Bugallon Street, Marikina Heights, Marikina City<br/>
                        0921 233 4805 | inquire@espasyo.ph
                    </p>
                </div>
            `
        });

        if (confirmError) {
            // Non-fatal: Espasyo's copy was already sent, just log this
            console.error("Resend API Error (confirmation):", confirmError);
        }

        return res.status(200).json({ message: 'Email sent successfully!' });

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}