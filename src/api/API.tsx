import React from 'react'
import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

instance.interceptors.response.use((config) => {
    return config
}, (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        axios.get<CommonType>(`${process.env.REACT_APP_BASE_URL}refresh`, {withCredentials: true})
            .then(res => {
                localStorage.setItem('token', res.data.accessToken)
                return instance.request(originalRequest)
            })
            .catch(e => {
                console.log('Не авторизован')
            })
    }
})

export type User = {
    email: string
    isActivated: boolean
    id: string
}

export type CommonType = {
    accessToken: string
    refreshToken: string
    user: User
}


export const authAPI = {
    registration(email: string, password: string) {
        return instance.post<CommonType>('registration', {email, password})
            .then(res => res.data)
    },

    login(email: string, password: string) {
        return instance.post<CommonType>('login', {email, password})
            .then(res => res.data)
    },

    logout() {
        return instance.post<CommonType>('logout')
            .then(res => res.data)
    },
    fetchUsers() {
        return instance.get<User[]>('users')
            .then(res => res.data)
    }
}