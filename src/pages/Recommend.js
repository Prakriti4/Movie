import React from 'react'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { Card } from '../components'
import Spinner from '../components/Spinner'


const Recommend = () => {
    const [data, setData] = useState([]);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOptions = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BASE_URL + "movies-list");
            const result = await response.json();
            setOptions(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchData = async (movie) => {
        try {
            const response = await fetch(process.env.REACT_APP_BASE_URL + "recommend" + `?name=${movie}`);
            const result = await response.json();
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOptions();
    }, [])

    const handle_movie_recommend = (e) => {
        fetchData(e.value);
    }


    return (
        <main>
            <section className="max-w-7xl mx-auto py-7">
                {loading ?
                    <div className='flex justify-center'><Spinner /> </div> :
                    <>
                        <div className='react-select w-full'>
                            <Select options={options} onChange={handle_movie_recommend} />
                            <h1 className='mt-3 text-3xl text-center text-slate-400 font-semibold'>Top 5 Recommend Movies</h1>
                        </div>

                        <div className="mt-5 grid grid-cols-5 gap-5">
                            {
                                data?.map((movie, index) =>
                                    <Card key={index} movie={movie} />
                                )
                            }
                        </div>
                    </>
                }
            </section>
        </main>
    )
}

export default Recommend