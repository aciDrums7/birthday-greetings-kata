import Notifier from "../notifiers/notifier";

export default interface Store {
    loadAndProcessStore: (notifier: Notifier, filePath: string) => void
}