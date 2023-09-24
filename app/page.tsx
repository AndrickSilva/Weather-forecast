"use client"
import { useState } from 'react'

export default function Home() {
  const [data, setData] = useState<any>({});
  const [change, setChange] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = `http://api.weatherstack.com/current?access_key=ddb1498ce5ea181fa311dbbff43221c1&query=${change}`

    try {
      const fetchWeather = await fetch(url)
      if (!fetchWeather.ok) {
        throw new Error("Invalid Data")
      }
      setData(await fetchWeather.json())
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="flex min-h-screen  items-center justify-between bg-slate-500">
      <form onSubmit={handleSubmit}>
        <input type="text" value={change} onChange={(e) => setChange(e.target.value)} placeholder='Enter Country name' />
        <button type='submit'>Submit</button>
      </form>
      <p className='text-4xl'>{data?.current?.temperature}</p>

    </main>
  )
}
