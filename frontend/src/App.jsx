import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import UserProvider from './context/UserContext'
import Dashboard from './pages/Dashboard'
import { Toaster } from 'react-hot-toast'
import EditResume from './components/EditResume'
import AuthSuccess from './pages/AuthSuccess'
import Login from './components/Login'

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/resume/:resumeId' element={<EditResume />} />
        <Route path='/auth-success' element={<AuthSuccess/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>

      <Toaster toastOptions={{
        className: "",
        style: {
          fontSize: "13px"
        }
      }}>


      </Toaster>
    </UserProvider>
  )
}

export default App
