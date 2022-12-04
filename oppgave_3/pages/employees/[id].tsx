import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import UpdateName from '../../components/UpdateName'
import fetcher from '../../lib/fetch'

const Employee = () => {
  const router = useRouter()
  const [data, setData]: any = useState({})
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState({})


  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'

  const id = router.query.id

  useEffect(() => {
    if (!id) return
    const handler = async () => {
      try {
        const getEmployee = async (id: Number) => {
      setStatus('success')
          return fetcher(`/api/employees/${id}`, {
            method: 'GET',
              id
          })
        }
        const employee = await getEmployee(Number(id))
        setData(employee.data)
        // setName(data.name)
        console.log(employee.data.day)
      } catch (error) {
        setStatus('error')
        setError(error as any)
        setTimeout(() => {
          setStatus('idle')
        }, 2000)
      }
    } 
    handler()
  }, [id])



  if (isLoading) {
    return <p>Henter data ...</p>
  }

  if (isError) {
    return <p>Noe gikk galt ...</p>
  }

  return (
    <div className="employee">
      <h2>{data.name}</h2>
      <UpdateName id={id} setStatus={setStatus} setError={setError} /> 
      <p>Ansattid: {data.id}</p>
      <p>Regel: {data.rules}</p>
      <h3>Arbeidsdager</h3>
      <ul>
        {data.day?.length && data.day.map((day) => (
          <li key={day.id}><span className='week'>Uke {day.week.week}</span> {day.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Employee