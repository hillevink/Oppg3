import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/db'

import {employees} from "../../data/employees"

import calendar from '../../lunch.json'
const lunch = calendar.year

const employeeList = employees

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const lunchData = req.body
      if (!lunchData)
      return res.status(400).json({ status: false, error: 'Lunch is missing' })

      const lunchCalendar = await prisma.lunch.findMany({
        include: {
          weeks: {include: {days: {include: {employee: true}}}}
        },
      })

      return res.status(200).json({ status: true, data: lunchCalendar})
    case 'post':
      
      // const data = req.body
      // if (!data)
      //   return res
      //     .status(400)
      //     .json({ status: false, error: 'Data is required' })

          await prisma.day.deleteMany({})
          await prisma.week.deleteMany({})
          await prisma.lunch.deleteMany({})
          await prisma.employee.deleteMany({})
          await prisma.override.deleteMany({})




const fillDb = async () => {
  // const employees = 
  // employeeList.map(async (employee) => {
    for (const employee of employeeList) {
    await prisma.employee.create({
      data: {
        ...employee, 
      }
    })}
  // })  
  // await Promise.all(employees)
  
  const lunchList = await prisma.lunch.create({ data: {} })

  for (const [key, value] of Object.entries(lunch)) {
  const lunchWeeks =
    await prisma.week.create({
      data: {
        week: key,
        lunch: {connect: {id: lunchList.id}},
      }
    })

    // const days = Object.entries(value.week).map( async([k, v]) => {
    for (const [k, v] of Object.entries(value.week)) {
      if (!v) {
        await prisma.day.create({
          data: {
            name: k,
            // employee: {connect: {id: v.id}},
            week: {connect: {id: lunchWeeks.id}}
          }
        })
      } else {
      await prisma.day.create({
        data: {
          name: k,
          employee: {connect: {id: v.id}},
          week: {connect: {id: lunchWeeks.id}}
        }
      })}
    // })
    // Promise.all(days)
    // console.log(days)
  }
}}
fillDb()

      // for(const x in list) {
      //   const week = await prisma.week.create(yourData, connectToLunch)
      //   const dayData = getDayFromList()
      //   const day = await prisma.week.create(dayData, connectToWeek, connectToEmployee)
      // }    
      


      return res.status(201).json({ status: true, data: 'hello' })
    default:
      return res.status(405).json({
        success: false,
        error: 'Method not allowed',
      })
  }
}







// const employee = employeeList.map(async (employee) => {
        
//   await prisma.employee.create({
//     data: {
//       ...employee, 
//     }
//   })

// })    
// console.log(employee)
// // await Promise.all(employee)

// const lunchList =
// await prisma.lunch.create({ data: {} })


// Object.entries(lunch).map( async ([key, value]) => {
// const lunchWeeks =
//   await prisma.week.create({
//     data: {
//       week: key,
//       lunch: {connect: {id: lunchList.id}},
//     }
//   })
// await Promise.all(
// Object.entries(value.week).map(async([key, value]) => {
//   await prisma.day.create({
//     data: {
//       name: key,
//       employee: {connect: {id: value.id}},
//       week: {connect: {id: lunchWeeks.id}}
//     }
//   })
// }))
// })  