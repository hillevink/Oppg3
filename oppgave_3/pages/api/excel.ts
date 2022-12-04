import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../types'
import * as excelController from '../../features/excel/excel.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  switch (req.method?.toLowerCase()) {
    case 'post':

      await excelController.listExcel(req, res)
      break

    default:
      return res.status(405).json({
        status: false,
        error: 'Method not allowed'
      })   
  }
}