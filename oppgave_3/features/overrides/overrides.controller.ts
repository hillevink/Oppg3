import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../types'
import * as overrideService from './overrides.service'

export const createOverride = async (req: NextApiRequest, res: NextApiResponse<Result>) => {

  // POST
  const {id, day, name} = req.body
  if(!id || !day || !name) return res.status(400).json({
    status: false, 
    error: 'Id, day or employee is missing'
  })

  const createdOverride = await overrideService.create({
      day,
      name,
      id
  })

  if(!createdOverride.status) {
    switch (createdOverride?.type) {
      case 'Override.Duplicate':
        return res.status(409).json({
          success: false,
          error: createdOverride.error
        })
        case 'User.NotExist':
          return res.status(404).json({
            success: false,
            error: createdOverride.error  
          })
        default: 
        return res.status(500).json({
          status: false, 
          error: createdOverride.error
        })
    } 
  }

  return res.status(201).json({
    status: true,
    data: createdOverride.data
  })
}
