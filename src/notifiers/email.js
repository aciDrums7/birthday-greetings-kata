const nodemailer = require('nodemailer')
const sanitizeHtml = require('sanitize-html')
require('dotenv').config()


const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM } =
  process.env

const transporter = nodemailer.createTransport({
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  secure: EMAIL_PORT === 465,
  host: EMAIL_HOST,
  port: EMAIL_PORT,
})

const mailTemplate = {
  from: EMAIL_FROM,
  subject: 'Happy birthday!',
}

const sendEmail = async ({ email: to, first_name }) => {
  try {
    const html = sanitizeHtml(`<p>Happy birthday, dear ${first_name}</p>`)
    await transporter.sendMail({ ...mailTemplate, to, html })

    console.log(`Successfully sent email to ${to}`)
  } catch (err) {
    console.error(err)
  }
}

module.exports = sendEmail
