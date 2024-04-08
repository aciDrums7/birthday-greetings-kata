import 'dotenv/config'
import nodemailer from 'nodemailer'
import sanitizeHtml from 'sanitize-html'
import EmailData from '../../models/email.model'
import Notifier from '../notifier'

export default class EmailNotifier implements Notifier {
  private transporter: nodemailer.Transporter
  private mailTemplate: nodemailer.SendMailOptions

  constructor() {
    const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM } =
      process.env

    this.transporter = nodemailer.createTransport({
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      secure: EMAIL_PORT === '465',
      host: EMAIL_HOST,
      port: parseInt(EMAIL_PORT ?? '587'),
    })

    this.mailTemplate = {
      from: EMAIL_FROM,
      subject: 'Happy birthday!',
    }
  }

  sendNotification = async (emailData: EmailData): Promise<void> => {
    try {
      const html = sanitizeHtml(
        `<p>Happy birthday, dear ${emailData.firstName}</p>`
      )
      await this.transporter.sendMail({
        ...this.mailTemplate,
        to: emailData.email,
        html,
      })

      console.log(`Successfully sent email to ${emailData.email}`)
    } catch (err) {
      console.error(err)
    }
  }
}
