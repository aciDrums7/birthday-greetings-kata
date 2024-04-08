import EmailNotifier from "../../../src/notifiers/impl/email"

const logErrorSpy = jest.spyOn(console, 'error')

describe('notifier', () => {

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('send mail successfully', async () => {
    jest.mock('nodemailer', () => ({
      createTransport: jest.fn().mockReturnValueOnce({
        sendMail: jest.fn().mockResolvedValueOnce(null),
      }),
    }))
    const emailNotifier = new EmailNotifier()
    await emailNotifier.sendNotification({
      email: 'john@hotmail.com',
      firstName: 'John',
    })

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
    const emailNotifier = new EmailNotifier()
    await emailNotifier.sendNotification({
      email: 'john@hotmail.com',
      firstName: 'John',
    })

    expect(logErrorSpy).toHaveBeenCalledTimes(1)
    expect(logErrorSpy).toHaveBeenCalledWith(new Error('Something went wrong'))
  })
})
