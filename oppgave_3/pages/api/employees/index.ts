import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const employees = await prisma.employee.findMany({})
      return res.status(200).json({ status: true, data: employees })

      
    case 'post':
      const data = req.body
      if (!data.name)
        return res
          .status(400)
          .json({ status: false, error: 'Id is required' })
        
        const newEmployee = await prisma.employee.create({
          data: {
            name: data.name,
            rules: data.rule,
          }
        })

      return res.status(201).json({ status: true, data: newEmployee })
    default:
      return res.status(405).json({
        success: false,
        error: 'Method not allowed',
      })
  }
}
