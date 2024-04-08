import { createTransport, SendMailOptions } from 'nodemailer'

const logErrorSpy = jest.spyOn(console, 'error')

describe('notify', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('send mail successfully', async () => {
    jest.mock('nodemailer', () => ({
      createTransport: jest.fn().mockReturnValueOnce({
        sendMail: jest.fn().mockResolvedValueOnce(null),
      }),
    }))
    const notify = require('../../../src/notifiers/email')
    await notify({
      email: 'john@hotmail.com',
      first_name: 'John',
    } as SendMailOptions)

    expect(logErrorSpy).toHaveBeenCalledTimes(0)
  })

  test('do not throw if an error occurs when sending the mail', async () => {
    jest.mock('nodemailer', () => ({
      createTransport: jest.fn().mockReturnValueOnce({
        sendMail: jest
          .fn()
          .mockRejectedValueOnce(new Error('Something went wrong')),
      }),
    }))
    const notify = require('../../../src/notifiers/email')
    await notify({
      email: 'john@hotmail.com',
      first_name: 'John',
    } as SendMailOptions)

    expect(logErrorSpy).toHaveBeenCalledTimes(1)
    expect(logErrorSpy).toHaveBeenCalledWith(new Error('Something went wrong'))
  })
})
