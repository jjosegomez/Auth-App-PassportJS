import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  function handleLogin(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    console.log("Login", email, password)
  }

  function handleRegister(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    console.log("Register", email, password)
  }

  return (
    <>
      <h1>Register</h1>
      <form id='registerForm' onSubmit={handleRegister} style={{display:"flex", justifyContent:"space-around", alignContent: "space-evenly", flexFlow:"column", width:"400px", height:"200px"}} >
        <input style={{fontSize:24}} type="email" placeholder='enter email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
        <input style={{fontSize:24}} type="password" placeholder='enter password' value={password} onChange={(e)=>{setPassword(e.target.value)}}  required />
        <button type='submit'>Register</button>
      </form>
      <hr/>
      <h1>Login</h1>
      <form id='loginForm' onSubmit={handleLogin} style={{display:"flex", justifyContent:"space-around", alignContent: "space-evenly", flexFlow:"column", width:"400px", height:"200px"}} >
        <input style={{fontSize:24}} type="email" placeholder='enter email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
        <input style={{fontSize:24}} type="password" placeholder='enter password' value={password} onChange={(e)=>{setPassword(e.target.value)}}  required />
        <button type='submit'>Login</button>
      </form>
    </>
  )
}

export default App
