import fetcher from '../lib/fetch'
import Link from 'next/link';
import { useState } from 'react';

type SearchProps = {
  setStatus: (value: string) => void,
  setError: (value: object) => void
}

const Search = ({setStatus, setError}: SearchProps) => {
  const [name, setName] = useState<string>('')
  const [nameData, setNameData] = useState([])

  const handleSearch = async (event: any) => {
    event.preventDefault()
    // let key = event.keyCode
    if( name == '' ) {
        return;
    }
    const searchEmployee = async (name: string) => {
      return fetcher('api/search', {
        method: 'POST',
        name,
        body: JSON.stringify(name)
      })
    }
    try {
      const names = await searchEmployee(name)
      setStatus('success')
      setNameData(names.data)
      // console.log(name)
    } catch(error) {
      setStatus('error')
      setError(error as any)
      setTimeout(() => {
        setStatus('idle')
      }, 2000)
      // console.log(error)
    }
  }

  return (
    <div id='search'>
    <input type="text" placeholder='Søk etter ansatt' value={name} onKeyUp={handleSearch} onChange={(event) => setName(event.target.value)} />
    {nameData.map((name: any) => (
      <Link href={`employees/${name.id}`} key={name.id}><a>{name.name}</a></Link>  
    ))}    
  </div>  
  )
}

export default Search