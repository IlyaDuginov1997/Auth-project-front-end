import React, {useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import {Form} from './components/form/Form';
import {checkAuth, fetchUsersTC, InitialStateType, setIsLoggedOutTC} from './redux-store/authReducer';
import {AppRootStateType} from './redux-store/Store';
import {authAPI, User} from './api/API';

function App() {

    console.log('App render');

    const [users, setUsers] = useState<User[]>([])
    
    const dispatch = useDispatch();
    const auth = useSelector<AppRootStateType, InitialStateType>(state => state.auth);

    useLayoutEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth());
        }
    }, []);

    if (auth.isLoading) {
        return <div>Loading...</div>
    }

    const logout = () => {
        dispatch(setIsLoggedOutTC())
    }

    const fetchUsers = () => {
        dispatch(fetchUsersTC())
    }

    if (auth.isAuthorized) {
        return (
            <div>
                <h1>Пользователь {auth.user.email} авторизован</h1>
                <h2>{auth.user.isActivated ? `Аккаунт подтвержден по почте` : `ПОДТВЕРДИТЕ АККАУНТ!!!`}</h2>
                <button onClick={logout}>logout</button>
                <button onClick={fetchUsers}>get all users</button>
                {auth.users.map( user => {
                    return(
                        <div key={user.id}>
                            {user.email}
                        </div>
                    )
                } )}
            </div>
        );
    }

    return (
        <div>
            <h1>АВТОРИЗУЙТЕСЬ</h1>
            <Form/>
        </div>
    );
}

export default App;
