import { useState } from 'react'
import fetcher from '../lib/fetch'

type NewEmployeeProps = {
  setNewEmployee: (value: object) => void,
  setStatus: (value: string) => void,
  setError: (value: object) => void
}

const NewEmployee = ({setNewEmployee, setStatus, setError}: NewEmployeeProps) => {
  // const  = props
  const [name, setName] = useState('')
  const [rule, setRule] = useState('')

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const createEmployee = async(data: any) => {
      return fetcher('/api/employees', {
        method: 'POST',
        data:{  
          name,
          rule
        },
        body: JSON.stringify(data),
      })
    }
    try {
      const addEmployee = await createEmployee({name, rule})
      setStatus('success')
      setNewEmployee(addEmployee.data)
    } catch (error) {
      setStatus('error')
      setError(error as any)
      setTimeout(() => {
        setStatus('idle')
      }, 2000)
    }
  }

  return (
    <section className='newEmployee'>
      <h2>Legg til ny ansatt</h2>
      <form onSubmit={handleSubmit} data-testid="new-form-test">
        <label>Navn:
          <input id="newEmployeeId" data-testid="add-word-input" type='text' name='name' value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label htmlFor="filter">
        Regel:
          <select id="rules" data-testid="rules-test" name="rules" onChange={(event) => setRule(event.target.value)}>
            <option value=""></option>
            <option value='*'>*(alle dager)</option>
            <option value='1'>1 (mandag)</option>
            <option value='2'>2 (tirsdag)</option>
            <option value='3'>3 (onsdag)</option>
            <option value='4'>4 (torsdag)</option>
            <option value='5'>5 (fredag)</option>
            <option value='days:24'>days:24 (tir og tor)</option>
            <option value='days:*|week:odd'>days:*|week:odd</option>
            <option value='days:*|week:even'>days:*|week:even</option>
          </select>
        </label>
        <input type='submit' name='submit' value='Legg til' className='submitBtn' data-testid="new-employee-button"/>
      </form>
    </section>
  )
}

export default NewEmployee