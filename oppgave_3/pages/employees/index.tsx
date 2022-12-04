import {  useState } from 'react'
import EmployeeList from '../../components/EmployeeList';
import NewEmployee from '../../components/NewEmployee';

const Employees = () => {
  const [newEmployee, setNewEmployee] = useState({})
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState({})

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'

  if (isLoading) {
    return <p>Henter data ...</p>
  }

  if (isError) {
    return <p>Noe gikk galt ...</p>
  }

  return (
    <div className='employees'>
      <EmployeeList newEmployee={newEmployee} setStatus={setStatus} setError={setError} />
      <NewEmployee setNewEmployee={setNewEmployee} setStatus={setStatus} setError={setError} />
    </div>
  )
}

export default Employees
