import csvParser from 'csv-parser'
import fs from 'fs'
import cron from 'node-cron'

import EmployeeEntity from '../../entities/employee.entity'
import Notifier from '../../notifiers/notifier'
import validateEmployee from '../../validators/employee'
import Store from '../store'

export default class CsvStore implements Store {
  constructor(private readonly notifier: Notifier) {}

  processRow = (row: EmployeeEntity) => {
    try {
      const { error } = validateEmployee(row)
      if (error) throw new Error(`${error}`)

      const dob = new Date(row.date_of_birth)
      // ? used this chron expression to fast check email shipping
      // const now = new Date()
      // const cronExpression = `0 ${now.getMinutes() + 1} ${now.getHours()} ${dob.getDate()} ${
      //   dob.getMonth() + 1
      // } * *`
      const cronExpression = `0 0 0 ${dob.getDate()} ${dob.getMonth() + 1} * *`
      if (!cron.validate(cronExpression)) {
        throw new Error(`Invalid cron expression (${cronExpression})`)
      }
      cron.schedule(cronExpression, () =>
        this.notifier.sendNotification({
          firstName: row.first_name,
          email: row.email,
        })
      )
    } catch (err) {
      console.error(err)
    }
  }

  loadAndProcessStore = (filePath: string) => {
    const csv = fs.createReadStream(filePath)
    csv
      .pipe(csvParser())
      .on('data', (row: EmployeeEntity) => this.processRow(row))
      .on('end', () => {
        console.log('Loaded schedule successfully')
        csv.destroy()
      })
      .on('close', () => console.log('Stream has been successfully destroyed'))
      .on('error', (err: Error) => {
        console.error('Error reading CSV file', err)
        process.exit(1)
      })
  }
}
