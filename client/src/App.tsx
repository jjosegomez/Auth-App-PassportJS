import { useState } from 'react'
import axios from 'axios';
import './App.css'

type User = {
  email: String,
  password: String
}

function App() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")


  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Register", email, password);

    const url: string = "http://localhost:3000/register";
    const data = {
      email: email,
      password: password
    };

    try {
      // Since you are using axios.post, it returns a Promise. You should await its response.
      const response = await axios.post(url, data);
      console.log(response);
    } catch (error) {
      console.log(`error making post request: ${error} with response`);
    }
  }


  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("Login", email, password)

    const url: string = "http://localhost:3000/login"
    const data: User = {
      "email": email,
      "password": password
    }

    try {
      const response = axios.post(url, data)
      console.log(response)
    } catch (error) {
      console.log(`error making post request. ${error}`)
    }

  }



  return (
    <>
      <h1>Register</h1>
      <form id='registerForm' onSubmit={handleRegister} style={{ display: "flex", justifyContent: "space-around", alignContent: "space-evenly", flexFlow: "column", width: "400px", height: "200px" }} >
        <input style={{ fontSize: 24 }} type="email" placeholder='enter email' value={email} onChange={(e) => { setEmail(e.target.value) }} required />
        <input style={{ fontSize: 24 }} type="password" placeholder='enter password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />
        <button type='submit'>Register</button>
      </form>
      <hr />
      <h1>Login</h1>
      <form id='loginForm' onSubmit={handleLogin} style={{ display: "flex", justifyContent: "space-around", alignContent: "space-evenly", flexFlow: "column", width: "400px", height: "200px" }} >
        <input style={{ fontSize: 24 }} type="email" placeholder='enter email' value={email} onChange={(e) => { setEmail(e.target.value) }} required />
        <input style={{ fontSize: 24 }} type="password" placeholder='enter password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />
        <button type='submit'>Login</button>
      </form>

    </>
  )
}

export default App
