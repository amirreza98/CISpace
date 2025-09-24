// email.js
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMail({ to, subject, html }) {
  const msg = {
    to,
    from: process.env.MAIL_FROM,  // باید همون sender تاییدشده باشه
    subject,
    html,
  };
  await sgMail.send(msg);
}

module.exports = { sendMail };
