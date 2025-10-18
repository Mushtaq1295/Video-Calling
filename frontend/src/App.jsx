import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './Pages/HomePage'
import { SignUpPage } from './Pages/SignUpPage.jsx'
import { NotificationsPage } from './Pages/NotificationsPage'
import { CallPage } from './Pages/CallPage'
import { ChatPage } from './Pages/ChatPage'
import { OnboardingPage } from './Pages/OnboardingPage'
import { LoginPage } from './Pages/LoginPage'
import { useQuery } from '@tanstack/react-query';
import useAuthUser from './assets/hooks/useAuthUser.js'


function App() {
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  const {isLoading, authUser} = useAuthUser();;

  // const {data, isLoading, error} = useQuery({
  //   queryKey: ['authUser'],
  //   queryFn: async() => {
  //     const res = await axiosIntance.get('/auth/me');
  //     return res.data;
  //   },
  //   retry: false
  // });

  // const authUser = authData?.user || null;

  return (
     <div className="h-screen" data-theme='night'>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path='/signup' element={!authUser ?<SignUpPage /> : <Navigate to="/"/>} />
        <Route path='/login' element={!authUser ?<LoginPage /> : <Navigate to="/"/>} />
        <Route path='/notifications' element={authUser ? <NotificationsPage /> : <Navigate to="/login"/>} />
        <Route path='/call' element={authUser ? <CallPage /> : <Navigate to="/login"/>} />
        <Route path='/chat' element={authUser ? <ChatPage /> : <Navigate to="/login"/>} />
        <Route path='/onboarding' element={authUser ? <OnboardingPage /> : <Navigate to="/login"/>} />
      </Routes>
    </div>
)
}

export default App
