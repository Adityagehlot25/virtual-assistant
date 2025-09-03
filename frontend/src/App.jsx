import React from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import { UserDataProvider } from "./context/userContext.jsx"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
  

    </div>
  )
}

export default App
