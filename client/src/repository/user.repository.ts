import { IResponseData } from 'common/common.interface'
import { fetch, post, put } from 'common/common.service'
import { IUserAuth } from './interface/user-auth.interface'
import { endpoints } from 'common/common.static'
import { ILoginValidation } from 'form-validation/login.validation'
import {
    IDMUFilter,
    IUpdateUserPayload,
    IUser,
    IUserPayload,
} from './interface/user.interface'
import axios from 'axios'
import { IFUser } from 'validations/user.validation'

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

export const getDMUfilter = async () => {
    try {
        const response = await fetch<IResponseData<IDMUFilter>, null>({
            endpoint: endpoints.MU_getDropdown,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IDMUFilter>
        err.isSuccess = false
        return err
    }
}

export const updateUser = async (payload: IUpdateUserPayload) => {
    try {
        const response = await put<IResponseData<IUser>, IUpdateUserPayload>({
            endpoint: endpoints.user_getAll,
            payload,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IUser>
        err.isSuccess = false
        return err
    }
}

export const createUser = async (payload: IFUser) => {
    try {
        const response = await post<IResponseData<any>, IFUser>({
            endpoint: endpoints.user_create,
            payload,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IUser>
        err.isSuccess = false
        return err
    }
}
