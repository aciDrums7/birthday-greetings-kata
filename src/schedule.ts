import path from 'path'
import { config } from './config'
import emailNotifier from './notifiers/impl/email'
import Notifier from './notifiers/notifier'
import csvStore from './stores/impl/csv'

const schedule = () => {
  const DUMMY_DATA_PATH = path.resolve(
    process.cwd(),
    './tests/unit/mocks/good_employees.csv'
  )
  try {
    // const storeModule = await import(`./stores/${config.store}`)
    // const notifyModule = await import(`./notifiers/${config.notifier}`)

    // const loader = storeModule.default
    // const notifier: Notifier = notifyModule.default

    csvStore.loadAndProcessStore(emailNotifier, DUMMY_DATA_PATH)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

schedule()
