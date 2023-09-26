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
      <div className={`w-full min-h-screen ${true ? `bg-blue-400` : `bg-yellow-100`} flex justify-center items-center flex-col relative`}>
        <p className='text-sm text-slate-900'>Last updated : {data?.current?.observation_time ? data?.current?.observation_time : '12/02/23'}</p>
        {true ?
          <Image
            src='/moon.svg' alt='weather icon'
            width={100}
            height={200}
            className='w-full'
          />
          :
          <Image
            src='/sun.svg' alt='weather icon'
            width={200}
            height={200}
            className='w-1/2'
          />
        }
        <p className={`text-6xl font-bold ${true ? `text-blue-800` : `text-orange-400`} absolute bottom-32`}>{data?.current?.temperature ? data?.current?.temperature + "°C" : '24 °C'}</p>
        <p className={`text-3xl  ${true ? `text-blue-100` : `text-orange-900`} absolute bottom-20`}>{data?.current?.weather_descriptions[0] ? data?.current?.weather_descriptions[0] : 'Mist'}</p>
      </div>
      <div className={`w-full min-h-screen flex justify-center items-center flex-col gap-10 ${true ? `bg-blue-100` : `bg-orange-50`}`}>
        <form onSubmit={handleSubmit} className='relative w-1/2'>
          <input type="text" value={change} onChange={(e) => setChange(e.target.value)} placeholder='Enter Country name' className={`px-6 py-2 rounded-full border ${true ? `border-blue-800` : `border-orange-400`} w-full`} />
          <button type='submit' className={`${true ? `bg-blue-800` : `bg-yellow-400`} text-white px-6 h-full rounded-full absolute top-0 right-0`}>Submit</button>
        </form>
        <div className="flex flex-col gap-2 w-full justify-center items-center">
          <div className="flex items-center justify-between w-1/2 ">
            <p className={`text-xl ${true ? `text-blue-800` : `text-orange-400`}`}>Wind speed</p>
            <span className={`text-2xl font-bold ${true ? `text-blue-900` : `text-orange-900`}`}>{data?.current?.wind_speed ? data?.current?.wind_speed : '19'}</span>
          </div>
          <div className="flex items-center justify-between w-1/2 ">
            <p className={`text-xl ${true ? `text-blue-800` : `text-orange-400`}`}>Wind degree</p>
            <span className={`text-2xl font-bold ${true ? `text-blue-900` : `text-orange-900`}`}>{data?.current?.wind_degree ? data?.current?.wind_degree : '29'}</span>
          </div>
          <div className="flex items-center justify-between w-1/2 ">
            <p className={`text-xl ${true ? `text-blue-800` : `text-orange-400`}`}>Wind direction</p>
            <span className={`text-2xl font-bold ${true ? `text-blue-900` : `text-orange-900`}`}>{data?.current?.wind_dir ? data?.current?.wind_dir : 'North'}</span>
          </div>
          <div className="flex items-center justify-between w-1/2 ">
            <p className={`text-xl ${true ? `text-blue-800` : `text-orange-400`}`}>Pressure</p> <span
              className={`text-2xl font-bold ${true ? `text-blue-900` : `text-orange-900`}`}>{data?.current?.pressure ? data?.current?.pressure : '10'}</span>
          </div>
          <div className="flex items-center justify-between w-1/2 ">
            <p className={`text-xl ${true ? `text-blue-800` : `text-orange-400`}`}>precip</p> <span
              className={`text-2xl font-bold ${true ? `text-blue-900` : `text-orange-900`}`}>{data?.current?.precip ? data?.current?.precip : '19'}</span>
          </div>
          <div className="flex items-center justify-between w-1/2 ">
            <p className={`text-xl ${true ? `text-blue-800` : `text-orange-400`}`}>Humidity</p> <span
              className={`text-2xl font-bold ${true ? `text-blue-900` : `text-orange-900`}`}>{data?.current?.humidity ? data?.current?.humidity : '18'}</span>
          </div>
          <div className="flex items-center justify-between w-1/2 ">
            <p className={`text-xl ${true ? `text-blue-800` : `text-orange-400`}`}>Cloud cover</p>
            <span className={`text-2xl font-bold ${true ? `text-blue-900` : `text-orange-900`}`}>{data?.current?.cloudcover ? data?.current?.cloudcover : '19'}</span>
          </div>
          <div className="flex items-center justify-between w-1/2 ">
            <p className={`text-xl ${true ? `text-blue-800` : `text-orange-400`}`}>Feels like</p>
            <span className={`text-2xl font-bold ${true ? `text-blue-900` : `text-orange-900`}`}>{data?.current?.feelslike ? data?.current?.feelslike : '12%'}</span>
          </div>
          <div className="flex items-center justify-between w-1/2 ">
            <p className={`text-xl ${true ? `text-blue-800` : `text-orange-400`}`}>UV index</p>
            <span className={`text-2xl font-bold ${true ? `text-blue-900` : `text-orange-900`}`}>{data?.current?.uv_index ? data?.current?.uv_index : '14'}</span>
          </div>
          <div className="flex items-center justify-between w-1/2 ">
            <p className={`text-xl ${true ? `text-blue-800` : `text-orange-400`}`}>Visibility</p> <span
              className={`text-2xl font-bold ${true ? `text-blue-900` : `text-orange-900`}`}>{data?.current?.visibility ? data?.current?.visibility : '4'}</span>
          </div>
        </div>
      </div>

    </main>
  )
}
