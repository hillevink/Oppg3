import Link from 'next/link';
import { useEffect, useState } from 'react'
import fetcher from '../lib/fetch'

type EmployeeListProps = {
  newEmployee: object,
  setStatus: (value: string) => void,
  setError: (value: object) => void
}

const EmployeeList = ({newEmployee, setStatus, setError}: EmployeeListProps) => {
  // const  = props
  const [data, setData] = useState([])

  useEffect(() => {
    const handler = async () => {
      
      const getEmployees = async (data: any) => {
        return fetcher('/api/employees', {
          method: 'GET',
          ...data
        })
      }
      try {
        const allEmployees = await getEmployees([])
        setData(allEmployees.data)
      } catch (error) {
        setStatus('error')
        setError(error as any)
        setTimeout(() => {
          setStatus('idle')
        }, 2000)
      }
    }
    handler()
  }, [newEmployee])

  return (
    <section>
      <h1>Ansatte</h1>
      <div className='employeeList' data-testid="employees-test">
      {data.map((employee) => (
        <Link href={`employees/${employee.id}`} key={employee.id}><a>{employee.name}</a></Link>
      ))}
      </div>
    </section>
  )
}

export default EmployeeList