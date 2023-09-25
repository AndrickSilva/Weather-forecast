"use client"
import Image from 'next/image';
import { useState } from 'react'
// import 'dotenv/config'

export default function Home() {
  const [data, setData] = useState<any>({});
  const [change, setChange] = useState("India");

  // const apiKey = process.env.REACT_APP_API_KEY;
  // console.log(apiKey);

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
    <main className="flex min-h-screen  items-center justify-between">
      <div className="w-full min-h-screen bg-blue-600">
        <Image
        src={data?.current?.weather_icons[0]} alt='weather icon'
        width={200}
        height={200}
        />
      </div>
      <div className="w-full min-h-screen bg-slate-300">
        <form onSubmit={handleSubmit}>
          <input type="text" value={change} onChange={(e) => setChange(e.target.value)} placeholder='Enter Country name' />
          <button type='submit'>Submit</button>
        </form>
        <p className='text-xl text-slate-400'>Last Updated : {data?.current?.observation_time}</p>
        <p className='text-2xl'>Temperature : {data?.current?.temperature}</p>
        <p className='text-2xl'>Description : {data?.current?.weather_descriptions[0]}</p>
        <p className='text-2xl'>Wind speed : {data?.current?.wind_speed}</p>
        <p className='text-2xl'>wind_degree : {data?.current?.wind_degree}</p>
        <p className='text-2xl'>wind_dir : {data?.current?.wind_dir}</p>
        <p className='text-2xl'>pressure : {data?.current?.pressure}</p>
        <p className='text-2xl'>precip : {data?.current?.precip}</p>
        <p className='text-2xl'>humidity : {data?.current?.humidity}</p>
        <p className='text-2xl'>cloudcover : {data?.current?.cloudcover}</p>
        <p className='text-2xl'>feelslike : {data?.current?.feelslike}</p>
        <p className='text-2xl'>uv_index : {data?.current?.uv_index}</p>
        <p className='text-2xl'>visibility : {data?.current?.visibility}</p>
        <p className='text-2xl'>is_day : {data?.current?.is_day}</p>

      </div>

    </main>
  )
}
