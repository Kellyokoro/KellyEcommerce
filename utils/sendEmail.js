const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
    // 1. Create the transporter using your hidden .env keys
    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
        }
    })

    // 2. Define what the email looks like
    const mailOptions = {
        from: 'Kelly E-commerce <noreply@kellyecommerce.com>', // The sender name
        to: options.email, // The recipient (passed in from the controller)
        subject: options.subject, // The subject line
        text: options.message, // The actual email body
    }
    // 3. Fire the email!
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail