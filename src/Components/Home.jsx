import MegaKnight from './MG.png'
import Pekka from './Pekka.png'
import Witch from './Witch.png'
import Illustration from './Illustration.png'

const Home = () => {

    return (
        <>
            <div className = "flex flex-col text-center ml-[12vw]">
              <h1 className = "text-5xl mt-5">Clash Royale Make Your Deck</h1>
              <div className = "flex flex-row justify-center mt-10 space-x-15">
                <img className = "w-50 h-auto rounded-3xl shadow-xl" src = {MegaKnight}/>
                <img className = "w-50 h-auto rounded-3xl shadow-xl" src = {Pekka}/>
                <img className = "w-50 h-auto rounded-3xl shadow-xl" src = {Witch}/>
              </div>
              <h1 className = "text-4xl mt-5">Add real cards, or your own!</h1>
              <div className = "flex justify-center mt-5">
                <img className = "rounded-3xl shadow-xl w-200 h-auto" src = {Illustration}/>
              </div>
              
              
            </div>
            
        </>
    );

}

export default Home;