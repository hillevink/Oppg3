import { NextApiRequest, NextApiResponse } from 'next'
import * as excelService from '../../features/excel/excel.service'
import { Result } from '../../types'

//GET
export const listExcel = async (req: NextApiRequest, res) => {

  const lunchId = req.body as string
  

  const excel = await excelService.listLunches({lunchId})

  if (excel.error) return res.status(500).json(excel.error)

  return res.status(200).json(excel)
}