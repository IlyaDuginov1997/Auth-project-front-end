import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {Form} from './components/form/Form';
import { checkAuth, InitialStateType } from './redux-store/authReducer';
import { AppRootStateType } from './redux-store/Store';

function App() {

    console.log('App render')
    const dispath = useDispatch()
    const auth = useSelector<AppRootStateType, InitialStateType>(state => state.auth)

    useEffect( () => {
        if (localStorage.getItem('token')) {
            dispath(checkAuth())
        }
    }, [] )

    return (
        <div>
            <h1>{auth.isAuthorized ? `Пользователь авторизован` : `АВТОРИЗУЙТЕСЬ`}</h1>
            <Form/>
        </div>
    );
}

export default App;
