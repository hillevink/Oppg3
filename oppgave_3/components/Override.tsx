import { useEffect, useState } from 'react'
import fetcher from '../lib/fetch'

type OverrideProps = {
  id: string,
  setStatus: (value: string) => void,
  setError: (value: object) => void
}

const Override = ({id, setStatus, setError}: OverrideProps) => {
  const [day, setDay] = useState('')
  const [employee, setEmployee] = useState('')
  const [employeeList, setEmployeeList] = useState([])
  const [override, setOverride] = useState({})

  useEffect(() => {
    const handler = async () => {
      const getEmployees = async (data: any) => {
        return fetcher('/api/employees', {
          method: 'GET',
          ...data
        })
      }
      const allEmployees = await getEmployees([])
      setEmployeeList(allEmployees.data)
    }
    handler()
  }, [])

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const createOverride = async(data: any) => {
      return fetcher('/api/weeks/override', {
        method: 'PUT',
        data: {
          day,
          employee,
          id
        },
        body: JSON.stringify(data)
      })
    }
    console.log({id, employee, day})
    try {
      const overrides = await createOverride({id, day, employee})
      setStatus('success')
      setOverride(overrides.data)
      console.log(overrides)
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
    <section className="override">
    <h3>Overskriv dag</h3>
    <form onSubmit={handleSubmit}>
      <label>
        Dag: 
        <select id='#' name='day' value={day} onChange={(event) => setDay(event.target.value)}>
          <option value=""></option>
          <option value="Mandag">Mandag</option>
          <option value="Tirsdag">Tirsdag</option>
          <option value="Onsdag">Onsdag</option>
          <option value="Torsdag">Torsdag</option>
          <option value="Fredag">Fredag</option>
        </select>
      </label>
      <label htmlFor="employees">
      Ansatt:
        <select id="#" name="employees" onChange={(event) => setEmployee(event.target.value)}>
          <option value=""></option>
          {employeeList.map((employee) => (
            <option value={employee.id} key={employee.id}>{employee.name}</option>
          ))}
        </select>
      </label>
      <input type='submit' value='Legg til' className='submitBtn' />
    </form>
  </section>
  )
}

export default Override