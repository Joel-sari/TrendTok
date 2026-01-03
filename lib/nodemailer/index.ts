import nodemailer from "nodemailer"
import {WELCOME_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,

    }
})

export const sendWelcomeEmail = async ({email, name, intro}: WelcomeEmailData) => {

    // we are taking the welcome email template from templates
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE

        // Replaces the placeholders!
        .replace('{{name}}', name)
        .replace('{{intro}}', intro);

    //defining email options
    const mailOptions = {
        from: `"TrendTok" <joelsitobusiness@gmail.com>`,
        to: email,
        subject: 'Welcome to TrendTok, your stock market tool kit is ready!',
        text: 'Thanks for joining TrendTok',
        html:htmlTemplate,

    }
    //transport.sendM
    await transporter.sendMail(mailOptions)

}