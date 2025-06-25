
import React from 'react'
import logo from '../assets/quiz-logo.png'

export default function Header() {
  return (
   <header>
        <img src={logo} alt="quiz logo" />

        <h1>My Quiz app</h1>
   </header>
  )
}
