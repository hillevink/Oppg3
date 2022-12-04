import * as excelRepo from '../../features/excel/excel.repository'


export const listLunches = async ({lunchId}: {lunchId: string}) => {
  const excel = await excelRepo.findMany({lunchId})

  if (!excel.success) {return { success: false, error: excel.error }}


  return { success: true, data: excel.data }
}
