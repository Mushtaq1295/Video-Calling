import { useEffect, useState } from 'react'
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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const data = await fetch('https://jsonplaceholder.typicode.com/todos');
  //       const json = await data.json();
  //       setData(json);
  //     } catch (error) {
  //       setError(error);
  //     }finally{
  //       setIsLoading(false);
  //     }
  //   };
  //   getData();
  // }, []);
  // console.log(data)

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
