const cron = require('node-cron')
const path = require('path')
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const goodEmployees = path.resolve(__dirname, '../mocks/good_employees.csv')
const badEmployees = path.resolve(__dirname, '../mocks/bad_employees.csv')

const cronValidateSpy = jest.spyOn(cron, 'validate')
const logErrorSpy = jest.spyOn(console, 'error')

const load = require('../../../src/stores/csv')
const notify = jest.fn()

describe('load', () => {
  test('csv successfully', async () => {
    cron.schedule = jest.fn()
    load({ notify, file: goodEmployees })
    await sleep(2000)

    expect(cronValidateSpy).toHaveBeenCalledTimes(3)
    expect(cron.schedule).toHaveBeenCalledTimes(3)
    expect(logErrorSpy).toHaveBeenCalledTimes(0)
  })

  test('do not throw if employee or cron validations fails', async () => {
    cron.schedule = jest.fn()
    load({ notify, file: badEmployees })
    await sleep(2000)

    expect(cronValidateSpy).toHaveBeenCalledTimes(1)
    expect(cron.schedule).toHaveBeenCalledTimes(0)
    expect(logErrorSpy).toHaveBeenCalledTimes(4)
    expect(logErrorSpy).toHaveBeenCalledWith(
      new Error(
        'ValidationError: "date_of_birth" with value "1982/10/" fails to match the required pattern: /^[0-9]{4}\\/[0-9]{1,2}\\/[0-9]{1,2}$/'
      )
    )
    expect(logErrorSpy).toHaveBeenCalledWith(
      new Error('ValidationError: "email" must be a valid email')
    )
    expect(logErrorSpy).toHaveBeenCalledWith(
      new Error('Invalid cron expression (0 0 0 NaN NaN * *)')
    )
    expect(logErrorSpy).toHaveBeenCalledWith(
      new Error(
        'ValidationError: "last_name" length must be at least 3 characters long'
      )
    )
  })
})
