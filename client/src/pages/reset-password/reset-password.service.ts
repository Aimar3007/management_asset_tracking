/* eslint-disable no-unused-vars */
import { IResetPasswordValidation } from 'form-validation/reset-password.validation'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { postResetPassword } from 'repository/user.repository'
import { Toast } from 'components/toast/toast.component'

export const useResetPassword = () => {
    const navigate = useNavigate()

    const currentUrl = window.location.href
    const urlArray = currentUrl.split('?')
    const token = urlArray[1]
    if (!token) {
        navigate('/login')
    }

    // state
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()

    const submitResetPassword = async (values: IResetPasswordValidation) => {
        const payload = {
            ...values,
            passwordResetToken: token,
        }

        try {
            setLoading(true)
            const actionResult = await postResetPassword(payload)
            setLoading(false)
            const response = actionResult
            if (!response.isSuccess) {
                setErrorMessage(response.message)
                return
            }
            Toast({
                header: 'Success',
                message: 'Your password has been successfully changed!',
                type: 'success',
            })
            localStorage.removeItem('tokenResetPassword')
            navigate('/login')
        } catch (error) {
            setLoading(false)
            const errorMessage =
                typeof error !== 'string' ? 'Something went wrong' : error
            setErrorMessage(errorMessage)
        }
    }

    const removeResetTokenFromUrl = () => {
        const { history, location } = window
        const { search } = location
        if (search && search && history && history.replaceState) {
            // save reset token in local storage
            localStorage.setItem('tokenResetPassword', search.slice(1))

            // remove access_token from url
            const cleanSearch = search
                .replace(/(|\?)[^]*/, '')
                .replace(/^&/, '?')

            // replace search params with clean params
            const cleanURL = location.toString().replace(search, cleanSearch)
            // use browser history API to clean the params
            history.replaceState({}, '', cleanURL)
        }
    }

    useEffect(() => {
        removeResetTokenFromUrl()
    }, [])

    return {
        submitResetPassword,
        loading,
        errorMessage,
    }
}
