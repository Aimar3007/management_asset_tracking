/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { userDataSelector } from 'pages/login/login.slice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IUserAuth } from 'repository/data/user-auth.interface'
import { getUserCurrent } from 'repository/user.repository'

export const useAxios = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user: IUserAuth = useSelector(userDataSelector)

    if (user) {
        axios.defaults.baseURL = process.env.REACT_APP_API_URL
        axios.defaults.paramsSerializer = { indexes: null }
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common.Accept = 'application/json'
        axios.defaults.headers.common.Authorization = `Bearer ${user.token}`
        axios.defaults.timeout = 500000

        axios.interceptors.request.use((request) => request)
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error?.response?.status === 401) {
                    dispatch({ type: 'SET_EXPIRED', payload: true })
                    navigate('/login')
                }
                return Promise.reject(error)
            },
        )
    }

    const checkSession = async () => {
        await getUserCurrent()
    }

    // check session
    useEffect(() => {
        checkSession()
    }, [])

    // handling session
    useEffect(() => {
        if (!user?.token) {
            navigate('/login', {
                replace: true,
            })
        }
    }, [user])
}
