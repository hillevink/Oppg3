import { useRouter } from "next/router"
import { useEffect, useState } from 'react'
import fetcher from '../../lib/fetch'
import Override from "../../components/Override";

const Week = () => {
  const router = useRouter()
  const [data, setData] = useState({})
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState({})

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'

  const id: any = router.query.id

  useEffect(() => {
    if (!id) return
    const handler = async () => {
      try {
        const getWeek = async (id: any) => {
      setStatus('success')
          return fetcher(`/api/weeks/${id}`, {
            method: 'GET',
              id,  
            })
          }
          const week = await getWeek(id)
          setData(week.data)
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
    <div className="weekInfo">
      <h2>Uke {data.week}</h2>
      {data.days?.length && data.days.map((value: any) => (
        <div key={value.id}>
          <h4 key={value.id} >{value.name}</h4>
          {(value.employee == null) ? 
            <p>Ferie</p> : 
            Object.entries(value).map(([k, v]: any) => (
            <p key={k}>{v.name}</p>
          ))}
        </div>
      ))}
      <Override id={id} setStatus={setStatus} setError={setError} />
    </div>
  )
}

export default Week