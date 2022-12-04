import { useState } from 'react';
import fetcher from '../lib/fetch'
import * as ExcelJS from "exceljs";
import { saveAs } from 'file-saver';

type DownloadLunchProps = {
  thisLunch: string,
  setStatus: (value: string) => void,
  setError: (value: object) => void
}

const DownloadLunch = ({thisLunch, setStatus, setError}: DownloadLunchProps) => {
  const [lunchList, setLunchList] = useState({})
  const [lunchId, setLunchId] = useState<string>('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const getLunchList = async (lunchId: string) => {
      return fetcher('api/excel', {
        method: 'POST',
        lunchId,
        body: JSON.stringify(lunchId)
      })
    }
    try {
      const wholeLunchList = await getLunchList(lunchId)
      setLunchList(wholeLunchList.data)
      // setLunchId(thisLunch)

      const workbook = new ExcelJS.Workbook();

      const sheet = workbook.addWorksheet('lunchlist')
      sheet.columns = [
        {header: "LunchId", key: "lunchId", width: 32},
        {header: "Week", key: "week", width:10},
        {header: "WeekId", key: "weekId", width: 32},
        {header: "Day", key: "day", width: 15},
        {header: "DayId", key: "dayId", width: 32},
        {header: "Employee", key: "employee", width: 15},
        {header: "EmployeeId", key: "employeeId", width: 10},
        {header: "Override", key: "override", width: 32},
        {header: "OverrideEmployee", key: "overrideEmployee", width: 15},
        {header: "OverrideId", key: "overrideId", width: 32},
      ]

    sheet.addRow({lunchId: wholeLunchList.data.id})
    Object.values(lunchList).map((value) => {
      console.log(value)
      Object.values(value).map((week) => {
        sheet.addRow({week: week.week, weekId: week.id})
        week.days?.length && week.days.map((day) => {
          sheet.addRow({day: day.name, dayId: day.id})
          // console.log(day.employee)
          day.employee == null 
            ?sheet.addRow({employee: 'ferie', employeeId: 'ferie'})
            :sheet.addRow({employee: day.employee.name, employeeId: day.employee.id})
        }),
        week.overrides?.length && week.overrides.map((override) =>{
          override == null 
            ? null
            : sheet.addRow({override: override.weekDay, overrideEmployee: override.employeeName, overrideId: override.id})
        })
      })
    })

    const buffer = await workbook.xlsx.writeBuffer()
    saveAs(new Blob([buffer]), 'lunsjliste.xlsx')

  } catch (error) {
    setStatus('error')
    setError(error as any)
    setTimeout(() => {
      setStatus('idle')
    }, 2000)
    console.log(error)
  }
}

  return (
    <>
      <form onSubmit={handleSubmit} className="excelForm">
        <input type="submit" value="Last ned lunsjlisten" onClick={() => setLunchId(thisLunch)}/>
      </form>
    </>
  )
}

export default DownloadLunch