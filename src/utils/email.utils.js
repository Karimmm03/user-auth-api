const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendResetPasswordEmail = async ({to, resetUrl}) => {
    const mailOptions = {
        from: `"Auth API" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Password Reset Request',
        html: `
            <h2>Password Reset</h2>
            <p>You requested a password reset. Click the link below to set a new password:</p>
            <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:6px;">
                Reset Password
            </a>
            <p>This link will expire in <strong>30 minutes</strong>.</p>
            <p>If you did not request this, please ignore this email. Your password will remain unchanged.</p>
        `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {sendResetPasswordEmail};