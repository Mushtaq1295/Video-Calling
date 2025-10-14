import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './Pages/HomePage'
import { SignUpPage } from './Pages/SignUpPage'
import { NotificationsPage } from './Pages/NotificationsPage'
import { CallPage } from './Pages/CallPage'
import { ChatPage } from './Pages/ChatPage'
import { OnboardingPage } from './Pages/OnboardingPage'
import { LoginPage } from './Pages/LoginPage'

function App() {

  return (
     <div className="h-screen" data-theme='night'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/notifications' element={<NotificationsPage />} />
        <Route path='/call' element={<CallPage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/onboarding' element={<OnboardingPage />} />
      </Routes>
    </div>
)
}

export default App
