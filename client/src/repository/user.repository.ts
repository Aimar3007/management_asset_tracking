import { IResponseData } from 'common/common.interface'
import { fetch, post } from 'common/common.service'
import { IUserAuth } from './interface/user-auth.interface'
import { endpoints } from 'common/common.static'
import { ILoginValidation } from 'form-validation/login.validation'
import { IUser, IUserPayload } from './interface/user.interface'
import axios from 'axios'

export const postLogin = async (payload: ILoginValidation) => {
    try {
        const response = await post<IResponseData<IUserAuth>, ILoginValidation>(
            {
                endpoint: endpoints.login,
                payload,
            },
        )
        return response
    } catch (error: any) {
        console.error('Login failed:', error)
        if (error?.response && error?.response?.status === 400) {
            const response: IResponseData<any> = error?.response?.data
            return response
        } else {
            const err = error as IResponseData<IUserAuth>
            err.isSuccess = false
            return err
        }
    }
}

export const getCurrentUser = async () => {
    try {
        // Menyertakan cookie sesi dalam header permintaan
        const response = await axios.get('user/current-user', {
            withCredentials: true, // Mengizinkan Axios untuk menyertakan cookie dalam permintaan
        })
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch current user')
    }
}

export const getAllUser = async (payload: IUserPayload) => {
    try {
        const response = await post<IResponseData<IUser[]>, IUserPayload>({
            endpoint: endpoints.user_getAll,
            payload,
        })
        return response
    } catch (error: any) {
        console.error('Login failed:', error)
        if (error?.response && error?.response?.status === 400) {
            const response: IResponseData<any> = error?.response?.data
            return response
        } else {
            const err = error as IResponseData<IUser>
            err.isSuccess = false
            return err
        }
    }
}

export const getUserDetail = async (id: string) => {
    try {
        const response = await fetch<IResponseData<IUser>, string>({
            endpoint: `${endpoints.user_getDetail}${id}`,
        })
        return response
    } catch (error: any) {
        console.error('Login failed:', error)
        if (error?.response && error?.response?.status === 400) {
            const response: IResponseData<any> = error?.response?.data
            return response
        } else {
            const err = error as IResponseData<IUser>
            err.isSuccess = false
            return err
        }
    }
}
