import React, {ChangeEvent, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {InitialStateType, setIsLoggedInTC, setRegistrationTC} from '../../redux-store/authReducer';
import s from './Form.module.css'
import {AppRootStateType} from '../../redux-store/Store';

export const Form = () => {
    console.log('Form render')

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch()

    const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const login = function () {
        dispatch(setIsLoggedInTC(email, password))
    }

    const registration = function () {
        dispatch(setRegistrationTC(email, password))
    }

    return (
        <div className={s.formContainer}>
            <input
                type="text"
                placeholder={'email'}
                value={email}
                onChange={changeEmail}
            />
            <input
                type="password"
                placeholder={'password'}
                value={password}
                onChange={changePassword}
            />
            <button onClick={login}>Login</button>
            <button onClick={registration}>Registration</button>
        </div>
    )

}
