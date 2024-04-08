import path from 'path'
import Notifier from '../notifiers/notifier'
import Store from '../stores/store'

export default class Scheduler {
  constructor(
    private readonly store: Store,
  ) {}

  public schedule() {
    const DUMMY_DATA_PATH = path.resolve(
      process.cwd(),
      './tests/unit/mocks/good_employees.csv'
    )
    try {
      this.store.loadAndProcessStore(DUMMY_DATA_PATH)
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }
}
