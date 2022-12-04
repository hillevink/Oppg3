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
          ? req.query.id.find((i) => i.includes(id))
          : req.query.id

      if (!id)
        return res.status(400).json({ status: false, error: 'Id is missing' })

      const week = await prisma.week.findUnique({
        where: {
          id
        },
        include: {
          days: {
            include: {
              employee: true
            }
          },
          overrides: {
            include: {
              week: true
            }
          }
          
        },
      })
      if (!week)
        return res.status(404).json({ status: false, error: 'week not found' })

      return res.status(200).json({ status: true, data: week })
      
  }
}