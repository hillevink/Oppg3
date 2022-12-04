import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../../types'
import prisma from '../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const id =
        req.query.id instanceof Array
          ? Number(req.query.id.find((i) => i.includes(id)))
          : Number(req.query.id)

      if (!Number(id))
        return res.status(400).json({ status: false, error: 'Id is missing' })

      const employee = await prisma.employee.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          day: {
            include: {
              week: true
            }
          }
        },
      })
      if (!employee)
        return res.status(404).json({ status: false, error: 'Employee not found' })

      return res.status(200).json({ status: true, data: employee })

      case 'put':
        const newId = Number(req.query.id)
        const data = req.body

        const updatedEmployee = await prisma.employee.update({
          where: {
            id: newId
          },
          data: {
            name: data
          }
        })
        
        if (!data)
        return res.status(400).json({ status: false, error: 'Name is missing' })

        return res.status(201).json({ status: true, data: updatedEmployee })
        
  }
}