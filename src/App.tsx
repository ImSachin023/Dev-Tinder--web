import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./navbar"

function App() {
  return (
    <>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<div>base page</div>}/>
      <Route path="/login" element={<div>login page</div>}/>
      <Route path="/test" element={<div>test page</div>}/>
      <Route path="/feed" element={<div>feed</div>}/>
    </Routes>
    </BrowserRouter>
      <Navbar/>    
      <h1 className="text-3xl font-bold underline">Hello world</h1>      
    </>
  )
}

export default App
