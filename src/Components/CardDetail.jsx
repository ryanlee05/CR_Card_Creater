import { useLocation, useNavigate } from 'react-router-dom'

import { supabase } from '../supabaseClient'

const CardDetail = () => {

    const location = useLocation();
    
    const navigate = useNavigate();

    const card = location.state?.cardData;

    const deleteFunction = async () => {
        await supabase.from('Cards').delete().eq('id', card.id);
        navigate('/view')
    }

    const handleEdit = () => {
        navigate('/customize', {state: {cardToEdit: card}})
    }

    const arr = [
        "One of the best cards in the game, if used correctly.",
        "Not a great card, but pairs well with a variety of cards.",
        "Nerf miner.",
        "Such a versatile card, with air and ground attacking abilities, it suits the arena well.",
        "Another pay to win card."
    ]

    
    if(card) return (
        <div className = "flex gap-8 ml-[12vw] h-screen justify-center items-center">
            <div className = "flex flex-col items-center gap-4 p-20 bg-black/75 rounded-3xl">
                <div className = "flex flex-row gap-4">
                   <img className = {`border-2 ${card.rarity == 'rare' ? 'border-amber-600' : card.rarity == 'epic' ? 'border-indigo-400' : 'border-gray-500'} object-cover h-80 width-auto align-center rounded-3xl`} src = {card.image}/>
                    <div className = "flex flex-col space-around gap-8">
                        <h1 className = "text-white text-3xl">{card.name}</h1>
                        <h1 className = "text-white text-2xl">{card.type} Unit </h1>
                        <h1 className = {`text-2xl font-bold ${card.rarity == 'rare' ? 'text-amber-600' : card.rarity == 'epic' ? 'text-indigo-400' : 'text-gray-500'}`}>{card.rarity}</h1>
                    </div> 
                </div>
                <div>
                    <h2 className = "text-white text-xl">{arr[Math.floor(Math.random() * 5)]}</h2>
                </div>
                <div className = "flex flex-row gap-5">
                    <button onClick = {deleteFunction} className = "bg-black text-white p-2 rounded-3xl shadow-2xl hover:cursor-pointer">Delete Item</button>
                    <button onClick = {handleEdit} className = "bg-black text-white p-2 rounded-3xl shadow-2xl hover:cursor-pointer">Edit Item</button>
                </div>
                
            </div>
        </div>
    )


}

export default CardDetail;