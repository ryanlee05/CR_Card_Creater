import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home.jsx'
import NavBar from './Components/NavBar.jsx'
import Customize from './Components/Customize.jsx'
import View from './Components/View.jsx'
import CardDetail from './Components/CardDetail.jsx'

function App() {

  return (
    <div className="min-h-screen text-[#040404] font-sans">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/customize" element = {<Customize/>}/>
          <Route path = "/view" element = {<View/>}/>
          <Route path = "/card-detail/:slug" element = {<CardDetail/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  
  )
}

export default App
