import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
    const {setUser, setNotifMsg} = props

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
        const userTokenObj = await loginService.login({
            username, 
            password,
        })
        
        window.localStorage.setItem('userInSession', JSON.stringify(userTokenObj))
        blogService.setToken(userTokenObj.token)
        setUser(userTokenObj)
        setUsername('')
        setPassword('')
        // console.log('successful login')
        }
        catch (exception) {
        setNotifMsg(`wrong username or password`)
        setTimeout(() => {
            setNotifMsg('')
        }, 2000)
        // console.log('Wrong credentials')
        }
    }

    return (
    <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
            <div>
            username
            <input 
                type="text" 
                value={username} 
                name="Username"
                onChange={(event) => setUsername(event.target.value)}
            />
            </div>
            <div>
            password
            <input 
                type="password" 
                value={password} 
                name="Password" 
                onChange={(event) => setPassword(event.target.value)}
            />
            </div>
            <button type="submit">login</button>
        </form>
    </div>
    )
}

LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired, 
    setNotifMsg: PropTypes.func.isRequired,
}

export default LoginForm
