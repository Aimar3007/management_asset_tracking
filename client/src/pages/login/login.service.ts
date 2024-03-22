/* eslint-disable no-unused-vars */
import { ILoginValidation } from 'form-validation/login.validation'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { forgotPassword, postLogin } from 'repository/user.repository'
import { useAppDispatch } from 'store'
import { setLoginData } from './login.slice'
import { IForgotPassword } from 'form-validation/forgot-password.validation'
import { Toast } from 'components/toast/toast.component'

export const useLogin = () => {
    // initial
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()

    // add function (can more than one)
    const submitLogin = async (values: ILoginValidation) => {
        try {
            setLoading(true)
            const actionResult = await postLogin(values)
            setLoading(false)
            const response = actionResult
            if (!response.isSuccess) {
                setErrorMessage(response.message)
                return
            }
            const data = {
                ...response.data,
            }
            dispatch(setLoginData(data))

            navigate('/asset-management')
        } catch (e) {
            setLoading(false)
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            setErrorMessage(errorMessage)
        }
    }

    // return function or variable
    return {
        submitLogin,
        loading,
        errorMessage,
    }
}

export const useForgotPassword = () => {
    // initial
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()

    // add function (can more than one)
    const submitForgotPassword = async (values: IForgotPassword) => {
        try {
            const action = await forgotPassword(values)

            Toast({
                header: 'Success',
                message: 'Reset Password link sent to your email',
                type: 'success',
            })
        } catch (error: any) {
            Toast({
                header: 'Failed!',
                message: error,
                type: 'error',
            })
        }
    }

    // return function or variable
    return {
        submitForgotPassword,
        loading,
        errorMessage,
        setLoading,
        setErrorMessage,
    }
}
