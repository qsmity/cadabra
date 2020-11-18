import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as AuthAction from '../reducers/session'


const LoginForm = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = (e) => {
        e.preventDefault()
        dispatch(AuthAction.login(email, password))
    }

    const loginDemoUser = (e) => {
        e.preventDefault()
        dispatch(AuthAction.login('demo@example.com', 'password'))
    }

    return (
        <div className='login-page-container'>
            <div className='login-page-img-left'></div>
            <div className='login-page-form-right'>
                <form onSubmit={login} className='form gradient-border'>
                    <label htmlFor='email'>Email: </label>
                    <input value={email} name='email' id='email'
                        type='text' onChange={e => setEmail(e.target.value)} />

                    <label htmlFor='password'>Password: </label>
                    <input value={password} name='password' id='password'
                        type='password' onChange={e => setPassword(e.target.value)} />
                    <p>Don't have an account <a href='/signup'>Signup</a></p>
                    <Link onClick={loginDemoUser} to='#'>Demo User</Link>

                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm