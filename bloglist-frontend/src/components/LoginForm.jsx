import { useState } from 'react'

const LoginForm = ({ addUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    await addUser(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
      username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          id='username'
        />
      </div>
      <div>
      password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id='password'
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
}

export default LoginForm