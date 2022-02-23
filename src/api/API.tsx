import React from 'react'
import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

instance.interceptors.request.use( (config) => {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
} )

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
    }
}