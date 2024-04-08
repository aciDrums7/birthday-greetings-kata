import path from 'path'
import { store, notifier } from './config'

const schedule = () => {
  const DUMMY_DATA_PATH = path.resolve(
    process.cwd(),
    './tests/unit/mocks/good_employees.csv'
  )
  try {
    store.loadAndProcessStore(notifier, DUMMY_DATA_PATH)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

schedule()
