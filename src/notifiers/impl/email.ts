import nodemailer from 'nodemailer'
import sanitizeHtml from 'sanitize-html'
import 'dotenv/config'
import Notifier from '../notifier'
import EmailData from '../../models/email.model'

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM } =
  process.env

const transporter = nodemailer.createTransport({
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  secure: EMAIL_PORT === '465',
  host: EMAIL_HOST,
  port: parseInt(EMAIL_PORT ?? '587'),
})

const mailTemplate = {
  from: EMAIL_FROM,
  subject: 'Happy birthday!',
}

const emailNotifier: Notifier = {
  sendNotification: async (emailData: EmailData): Promise<void> => {
    try {
      const html = sanitizeHtml(
        `<p>Happy birthday, dear ${emailData.firstName}</p>`
      )
      await transporter.sendMail({ ...mailTemplate, to: emailData.email, html })

      console.log(`Successfully sent email to ${emailData.email}`)
    } catch (err) {
      console.error(err)
    }
  },
}

export default emailNotifier
