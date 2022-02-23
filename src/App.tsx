import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import {Form} from './components/form/Form';
import {checkAuth, InitialStateType, setIsLoggedOutTC} from './redux-store/authReducer';
import {AppRootStateType} from './redux-store/Store';

function App() {

    console.log('App render');
    const dispatch = useDispatch();
    const auth = useSelector<AppRootStateType, InitialStateType>(state => state.auth);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth());
        }
    }, []);

    const logout = () => {
        dispatch(setIsLoggedOutTC())
    }

    if (auth.isAuthorized) {
        return (
            <div>
                <h1>Пользователь ${auth.user.email} авторизован</h1>
                <button onClick={logout}>logout</button>
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
