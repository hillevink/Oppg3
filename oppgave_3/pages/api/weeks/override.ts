import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../../types'
import prisma from '../../../lib/db'
import * as overrideController from '../../../features/overrides/overrides.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  switch (req.method?.toLowerCase()) {
    // case 'get':

    // const overrides = await prisma.override.findUnique({
    //   where: {
    //     id: 'id', 
    //   }
    // })
    
    // return res.status(200).json({status: true, data: overrides})
      case 'put':
        await overrideController.updateEmployee(req, res)
        break

      case 'post':
        await overrideController.createOverride(req, res)
        break
      default:
        return res.status(405).json({
          status: false,
          error: 'Method not allowed'
        })

        
  }
}