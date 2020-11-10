import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as AuthAction from '../reducers/session'

const LoginForm = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = (e) => {
        e.preventDefault()
        dispatch(AuthAction.login(email, password))
        console.log('you submitted login')
    }

    return (
        <form onSubmit={login} className='form'>
            <label htmlFor='email'>Email: </label>
            <input value={email} name='email' id='email'
                type='text' onChange={e => setEmail(e.target.value)} />

            <label htmlFor='password'>Password: </label>
            <input value={password} name='password' id='password'
                type='password' onChange={e => setPassword(e.target.value)} />

            <button type='submit'>Login</button>
        </form>
    )
}

export default LoginForm