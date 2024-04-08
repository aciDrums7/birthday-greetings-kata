import { Notifier, Store } from "./configs/config"
import Scheduler from "./schedulers/schedule"

const store = new Store(new Notifier)
const scheduler = new Scheduler(store)

scheduler.schedule()