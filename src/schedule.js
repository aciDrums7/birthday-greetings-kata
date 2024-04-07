const config = require('./config.js')
const load = require(`./stores/${config.store}.js`)
const notify = require(`./notifiers/${config.notifier}.js`)

const schedule = async () => {
  try {
    await load({ notify })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

schedule()
