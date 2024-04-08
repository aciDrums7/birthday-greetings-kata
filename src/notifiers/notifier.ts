import EmailData from "../models/email.model";

export default interface Notifier {
    sendNotification: (data: EmailData) => Promise<void>;
}