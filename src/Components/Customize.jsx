import {supabase } from '../supabaseClient'
import { useState, useEffect } from 'react'

import {useNavigation, useLocation} from 'react-router-dom'

const Customize = () => {

    const location = useLocation();

    const cardToEdit = location.state?.cardToEdit;

    const arr = ['epic','rare', 'common'];

    const [selected, setSelected] = useState('');

    const [formData, setFormData] = useState({
        id: null,
        name: '',
        type: '',
        rarity: '',
        image: ''
    })

    useEffect(() => {
        if(cardToEdit) {
            setFormData({
                id: cardToEdit.id || null,
                name: cardToEdit.name || '',
                type: cardToEdit.type || '',
                rarity: cardToEdit.rarity || '',
                image: cardToEdit.image || ''
            });
            setSelected(cardToEdit.rarity || '');
        }
    }, [cardToEdit]);

    const handleChange = (e) => {
        const {name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['name', 'type', 'rarity', 'image'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            // Use a list to clearly show what's missing (instead of alert)
            alert(`Please fill out all required fields: ${missingFields.map(f => f.toUpperCase()).join(', ')}`);
            
            // Note: In a production app, you would show this message in a user-facing modal or toast notification.
            return; 
        }

        let result, error;

        const dataToSave = {
            name: formData.name,
            type: formData.type,
            rarity: formData.rarity,
            image: formData.image
        }


        if(formData.id) {
            ({data: result} = await supabase.from('Cards').update(dataToSave).eq('id', formData.id).select());

            setFormData({
                    name: '',
                    type: '',
                    rarity: '',
                    image: ''
                })
                setSelected('');
            }
        else {

            const {data} = await supabase.from('Cards').insert([
            {
            ...dataToSave,
            }, ]).select();
    
            if(error) {
                console.error("Error inserting card:", error);
            }
            else {
                setFormData({
                    name: '',
                    type: '',
                    rarity: '',
                    image: ''
                })
                setSelected('');
            }
        }
        
    }

    const setOption = (e) => {
        setSelected(e);
        setFormData(prevData => (
            {
                ...prevData,
                rarity: e,
            }
        ));
    }
    

    

    return (
        <>
            <div className = "flex flex-col ml-[12vw] text-center h-screen justify-center">
                <h1 className = "text-black text-5xl">Create Your Clash Royale Card!</h1>
                    <form className = "mt-8 flex flex-row justify-evenly">
                        <div className = "flex flex-col bg-black/75 p-3 rounded-xl">
                            <h2 className = "text-xl text-white">Enter card name</h2>
                            <input 
                                className = "mt-5 bg-white text-black"
                                placeholder = "Musketeer"      
                                type = "text"
                                id = "name"
                                name = "name"
                                value = {formData.name}
                                onChange = {handleChange}
                                required
                            />
                        </div>
                       <div className = "flex flex-col bg-black/75 p-3 rounded-xl">
                            <h2 className = "text-xl text-white">Enter card type (air, ground)</h2>
                            <input
                                className = "mt-5 bg-white text-black"
                                placeholder = "Ground"
                                type = "text"
                                id = "type"
                                name = "type"
                                value = {formData.type}
                                onChange = {handleChange}
                                required
                            />
                        </div>
                        <div className = "flex flex-col bg-black/75 p-3 rounded-xl">
                            <h3 className = "text-xl text-white">Choose Card type</h3>
                            {arr.map((type) => (
                                <button
                                type = "button"
                                key = {type}
                                onClick = {() => setOption(type)}
                                className = {`text-white pd-3 rounded-3xl mt-3 ${type == selected ? 'bg-black border-3 border-white' : 'bg-black/75' }`}>
                                {type}</button>
                            ))}
                        </div>
                       <div className = "flex flex-col bg-black/75 p-3 rounded-xl">
                            <h3 className = "text-xl text-white">Enter card image URL</h3>
                            <input
                                className = "mt-5 bg-white text-black"
                                placeholder = "https://musketeer.png"
                                type = "text"
                                id = "image"
                                name = "image"
                                value = {formData.image}
                                onChange = {handleChange}
                                required
                            />
                        </div>
                        

                        <button
                            onClick = {handleSubmit}
                            className = "p-5 bg-black text-white rounded-3xl"
                            type = "submit"
                        >
                        Create Card
                        </button>
                    </form>
                </div>
        </>
    )
}


export default Customize;