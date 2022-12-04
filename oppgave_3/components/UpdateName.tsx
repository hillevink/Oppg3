import fetcher from '../lib/fetch'
import { useState } from 'react'

type UpdateNameProps = {
  id: number,
  setStatus: (value: string) => void,
  setError: (value: object) => void
}

const UpdateName = ({id, setStatus, setError}: UpdateNameProps) => {
  // const  = props

  const [name, setName] = useState('')
  const [newName, setNewName] = useState('')
// console.log(typeof)
  const handleSubmit = async () => {
    // event.preventDefault()
    const updateEmployee = async (id: number, name: string) => {
      return fetcher(`/api/employees/${id}`, {
        method: 'PUT',
        id: id, 
        name: newName,
        body: JSON.stringify(name)
      })
    }
    try {
      const updateName = await updateEmployee(id, newName)
      setStatus('success')
      setName(updateName.data)
      console.log(updateName)
      console.log(name)
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
    <form onSubmit={handleSubmit}>
      <input type='text' name='name' value={newName} onChange={(event) => setNewName(event.target.value)} />
      <input type='submit' value='Endre navn' />
    </form>
  )
}

export default UpdateName