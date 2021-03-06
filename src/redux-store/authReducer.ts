import axios from "axios"
import {Dispatch} from "redux"
import {authAPI, CommonType, User} from "../api/API"

type ActionsType = ReturnType<typeof setIsAuthorized>
    | ReturnType<typeof setUserData>
    | ReturnType<typeof setIsLoading>
    | ReturnType<typeof fetchUsers>

const initialState = {
    isAuthorized: false,
    user: {} as User,
    isLoading: false,
    users: [] as User[]
}

export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'AUTH/SET-IS-AUTHIRIZED':
            return {
                ...state,
                isAuthorized: action.isAuthorized
            };
        case 'AUTH/SET-USER-DATA':
            return {
                ...state,
                user: {...action.userData}
            }
        case "AUTH/SET-IS-LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            }
        case "AUTH/FETCH-USERS":
            return {
                ...state,
                users: action.users
            }
        default:
            return state
    }
}

export const setIsAuthorized = (isAuthorized: boolean) => {
    return {
        type: 'AUTH/SET-IS-AUTHIRIZED',
        isAuthorized
    } as const
}

export const setUserData = (userData: User) => {
    return {
        type: 'AUTH/SET-USER-DATA',
        userData
    } as const
}

export const setIsLoading = (isLoading: boolean) => {
    return {
        type: 'AUTH/SET-IS-LOADING',
        isLoading
    } as const
}

export const fetchUsers = (users: User[]) => {
    return {
        type: 'AUTH/FETCH-USERS',
        users
    } as const
}

export const setIsLoggedInTC = (email: string, password: string) => {
    return (dispatch: authReducerThunkDispatch) => {
        authAPI.login(email, password)
            .then(res => {
                console.log(res)
                dispatch(setIsAuthorized(true))
                dispatch(setUserData(res.user))
                localStorage.setItem('token', res.accessToken)
            })
            .catch(err => console.log(err.response?.data?.message))
    }
}

export const setIsLoggedOutTC = () => {
    return (dispatch: authReducerThunkDispatch) => {
        authAPI.logout()
            .then(res => {
                console.log(res)
                dispatch(setIsAuthorized(false))
                dispatch(setUserData({} as User))
                localStorage.removeItem('token')
            })
            .catch(err => console.log(err.response?.data?.message))
    }
}

export const setRegistrationTC = (email: string, password: string) => {
    return (dispatch: authReducerThunkDispatch) => {
        authAPI.registration(email, password)
            .then(res => {
                console.log(res)
                dispatch(setIsAuthorized(true))
                dispatch(setUserData(res.user))
                localStorage.setItem('token', res.accessToken)
            })
            .catch(err => console.log(err.response?.data?.message))
    }
}

export const fetchUsersTC = () => {
    return (dispatch: authReducerThunkDispatch) => {
        authAPI.fetchUsers()
            .then(res => {
                console.log(res)
                dispatch(fetchUsers(res))
            })
            .catch(err => console.log(err.response?.data?.message))
    }
}

export const checkAuth = () => {
    return (dispatch: authReducerThunkDispatch) => {
        dispatch(setIsLoading(true))
        axios.get<CommonType>(`${process.env.REACT_APP_BASE_URL}refresh`, {withCredentials: true})
            .then(res => {
                dispatch(setIsAuthorized(true))
                dispatch(setUserData(res.data.user))
                localStorage.setItem('token', res.data.accessToken)
            })
            .catch(err => console.log(err))
            .finally(() => {
                dispatch(setIsLoading(false))
            })
    }
}

export type authReducerThunkDispatch = Dispatch<ActionsType>