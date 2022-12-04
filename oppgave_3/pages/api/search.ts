import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method?.toLowerCase()) {
    case 'post':
      
      const name = req.body
      if (!name)
      return res.status(400).json({ status: false, error: 'Name is missing' })

      const employees = await prisma.employee.findMany({
        where: {
          name: {
            startsWith: name,
          }
        }
      })
      return res.status(200).json({ status: true, data: employees })
  }
}