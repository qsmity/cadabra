import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as AuthAction from '../reducers/session'

const SignupForm = () => {
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const signup = (e) => {
        e.preventDefault()
        dispatch(AuthAction.signup(firstName, lastName, email, password, confirmPassword))
        console.log('you submitted')
    }

    return (
        <form onSubmit={signup} className='form'>
            <label htmlFor='firstName'>First Name: </label>
            <input value={firstName} name='firstName' id='firstName'
                type='firstName' onChange={e => setFirstName(e.target.value)} />

            <label htmlFor='lastName'>Last Name: </label>
            <input value={lastName} name='lastName' id='lastName'
                type='lastName' onChange={e => setLastName(e.target.value)} />

            <label htmlFor='email'>Email: </label>
            <input value={email} name='email' id='email'
                type='text' onChange={e => setEmail(e.target.value)} />

            <label htmlFor='password'>Password: </label>
            <input value={password} name='password' id='password'
                type='password' onChange={e => setPassword(e.target.value)} />


            <label htmlFor='confirmPassword'>Confirm Password: </label>
            <input value={confirmPassword} name='confirmPassword' id='confirmPassword'
                type='password' onChange={e => setConfirmPassword(e.target.value)} />

            <button type='submit'>Signup</button>
        </form>
    )
}

export default SignupForm