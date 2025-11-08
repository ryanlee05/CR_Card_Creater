import {useState, useEffect} from 'react'
import { supabase} from '../supabaseClient'

import {Link} from 'react-router-dom'

const View = () => {
    const[data, setData] = useState([]);
    
        useEffect(() => {
            async function fetchData() {
                const {data: records, error} = await supabase.from('Cards').select('*').order('creation', {ascending : false});
    
                if(error) console.error('Error fetching items', error);
    
                else setData(records);
            }
            fetchData();
        }, [])

    if(data.length == 0) return (
        <>
            <div className = "flex flex-col items-center h-screen justify-center ml-[12vw] text-center">
                <h1 className = "text-5xl mb-20">Your Card Gallery</h1>
                <h1 className = "text-black text-4xl" >No Cards to View!</h1>
                <Link to = "/customize">
                    <button className = "mt-8 bg-black text-white text-2xl p-3 rounded-3xl duration-150 shadow-2xl hover:cursor-pointer hover:bg-black/75">Start Customizing Now</button>
                </Link>
            </div>
        </>
    )

    
    else return (
        <>
            <h1 className = "ml-[12vw] text-center text-5xl relative top-30">Your Clash Royale Cards!</h1>
            <div className = "ml-[12vw] grid grid-cols-4 mt-40 justify-center text-center">
                    {data.map((card) => (
                    
                    <div className = "p-8 hover:cursor-pointer">
                        <Link to = {`/card-detail/${card.name}`}
                        state = {{cardData: card}}>
                            <div key = {card.id} className = {`flex flex-col ${card.rarity == 'epic' ? 'bg-indigo-400 ' : card.rarity == 'rare' ? 'bg-amber-600' : 'bg-gray-500'} rounded-3xl w-full max-w-xs`}>
                                <img className = "border-2 border-black object-cover h-80 width-auto align-center rounded-t-3xl" src = {card.image}/>
                                <h1 className = "text-3xl">{card.name}</h1>
                                <h1 className = "text-2xl ">{card.type} Unit</h1>
                                <h1 className = "text-xl font-bold">{card.rarity}</h1>
                            </div>
                        </Link>
                    </div>
                   
                ))}
                </div>
        </>
    )

}

export default View;