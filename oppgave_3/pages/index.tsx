import type { NextPage } from 'next'
import Link from 'next/link';
// import axios from 'axios';
import { useEffect, useState } from 'react';
import DownloadLunch from '../components/DownloadLunch';
import Search from '../components/Search';
import fetcher from '../lib/fetch'

const Home: NextPage = () => {
  const [lunches, setLunches] = useState<[]>([])
  const [minWeek, setMinWeek] = useState<string>('1')
  const [maxWeek, setMaxWeek] = useState<string>('52')
  const [status, setStatus] = useState<string>('idle')
  const [error, setError] = useState({})

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'
  
  useEffect(() => {
    const handler = async () => {
      const getLunch = async (data: any) => {
      return fetcher('/api/demo', {
        method: 'GET',
        ...data,
      })
    }
    try {
      const lunchData = await getLunch([])
      setStatus('success')
      setLunches(lunchData.data)
    } catch (error) {
      setStatus('error')
      setError(error as any)
      setTimeout(() => {
        setStatus('idle')
      }, 2000)
    }
    }
    handler()
  }, [])

  if (isLoading) {
    return <p>Henter data ...</p>
  }

  if (isError) {
    return <p>Noe gikk galt ...</p>
  }

  return (
    <div className='allWeeks'>
      <Search setStatus={setStatus} setError={setError} />
      <h1>Ukesoversikt</h1>
      {lunches.map((lunch: any) => (
        <div key={lunch.id}>
          <section className='weekBtn'>
            <ul>
              {lunch.weeks.map((week: any) => (   
                <Link href={`weeks/${week.id}`} key={week.id}><li>{week.week}</li></Link>
              ))}
            </ul>
          </section>

          <DownloadLunch thisLunch={lunch.id} setStatus={setStatus} setError={setError} />

          <div className='weekFilter'>
            <label>
              Fra uke: 
              <input type="text" placeholder='Fra uke' value={minWeek} onChange={(event) => setMinWeek(event.target.value)} />
            </label>
            <label>
              Til uke: 
              <input type="text" placeholder='Til uke' value={maxWeek} onChange={(event) => setMaxWeek(event.target.value)} />
            </label>
            {minWeek > maxWeek ? <p>Fra uke verdi kan ikke være høyere enn til uke verdi</p> : null}
          </div>

          <section id="lunchCards">
            {lunch.weeks.map((week: any) => (   
              week.week >= Number(minWeek) && week.week <= Number(maxWeek) ? 
                <article key={week.id}>
                  <h2>Uke {week.week}</h2> 
                  <ul>
                    {week.days.map((day: any) => (
                      <li key={day.id}>
                        <span className="day">{day.name}</span>: {day.employee ? `${day.employee.name}` : 'Ferie'}
                      </li> 
                    ))} 
                  </ul>
                </article>
              : null 
            ))}
          </section>
          
        </div>
      ))}
    </div>
  )
}

export default Home
