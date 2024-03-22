import { IResponseData } from 'common/common.interface'
import { fetch, post, put } from 'common/common.service'
import { endpoints } from 'common/common.static'
import { ILoginValidation } from 'form-validation/login.validation'
import { IUserAuth } from 'repository/data/user-auth.interface'
import { IUser } from './data/user.interface'
import { IUserAccessFilter } from 'pages/user-acces/user-access.interface'
import { IUserStatusTotal } from './data/user-status-count.interface'
import { IFRoleModule } from 'form-validation/role-module.validation'
import { IForgotPassword } from 'validations/auth.validations'
import { IResetPasswordValidation } from 'form-validation/reset-password.validation'
import { IChangePasswordValidation } from 'form-validation/change-password.validation'
import { Toast } from 'components/toast/toast.component'

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

export const getUserData = async (filter: IUserAccessFilter) => {
    try {
        const response = await fetch<IResponseData<IUser[]>, IUserAccessFilter>(
            {
                endpoint: endpoints.staff_get,
                params: filter,
            },
        )
        return response
    } catch (error: any) {
        throw error.message
    }
}

export const getUserStatusCount = async () => {
    try {
        const response = await fetch<IResponseData<IUserStatusTotal>, any>({
            endpoint: endpoints.staff_getAllStatus,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IUserStatusTotal>
        err.isSuccess = false
        return err
    }
}

export const createUser = async (payload: any) => {
    try {
        const execute = await post<IResponseData<any>, ILoginValidation>({
            endpoint: endpoints.staff_create,
            payload,
        })
        return execute
    } catch (error: any) {
        return error.response.data
    }
}

export const changePassword = async (payload: any) => {
    try {
        await put<IResponseData<any>, IChangePasswordValidation>({
            endpoint: endpoints.staff_changePassword,
            payload,
        })
        Toast({
            header: 'Success',
            message: 'Success Update Password',
            type: 'success',
        })
        return 'success'
    } catch (error: any) {
        Toast({
            header: 'Failed!',
            message: error?.response?.data ?? 'Failed Update Password',
            type: 'error',
        })
        return error.response.data as string
    }
}

export const updateUser = async (id: string, payload: any) => {
    try {
        const execute = await put<IResponseData<any>, ILoginValidation>({
            endpoint: endpoints.staff_update + '/' + id,
            payload,
        })
        return execute
    } catch (error: any) {
        return error.response.data
    }
}

export const getUserDetail = async (uuid: string) => {
    try {
        const response = await fetch<IResponseData<IUser>, { uuid: string }>({
            endpoint: endpoints.staff_get + '/' + uuid,
            params: { uuid },
        })
        return response
    } catch (error: any) {
        return error.response.data
    }
}

export const suspendUser = async (uuid: string) => {
    try {
        const response = await put<IResponseData<any>, { uuid: string }>({
            endpoint: endpoints.staff_delete + '/' + uuid,
            params: { uuid },
        })
        return response
    } catch (error: any) {
        throw error.response.data
    }
}

export const unSuspendUser = async (uuid: string) => {
    try {
        const response = await put<IResponseData<any>, { uuid: string }>({
            endpoint: endpoints.staff_unsuspend + '/' + uuid,
            params: { uuid },
        })
        return response
    } catch (error: any) {
        throw error.response.data
    }
}

export const updateModuleUser = async (uuid: string, payload: IFRoleModule) => {
    try {
        const response = await put<IResponseData<any>, IFRoleModule>({
            endpoint: endpoints.staff_updateModule + '/' + uuid,
            payload: payload,
        })
        return response
    } catch (error: any) {
        throw error.response.data
    }
}

export const forgotPassword = async (payload: IForgotPassword) => {
    try {
        const response = await post<IResponseData<any>, IForgotPassword>({
            endpoint: endpoints.staff_forgotPassword,
            params: payload,
        })
        return response
    } catch (error: any) {
        throw error.response.data
    }
}

export const postResetPassword = async (payload: IResetPasswordValidation) => {
    try {
        const response = await post<
            IResponseData<any>,
            IResetPasswordValidation
        >({
            endpoint: endpoints.staff_resetPassword,
            payload,
        })
        return response
    } catch (error: any) {
        throw error.response.data
    }
}

export const getUserCurrent = async () => {
    try {
        const response = await fetch<IResponseData<any>, IUserAccessFilter>({
            endpoint: endpoints.user_currentUser,
        })
        return response
    } catch (error: any) {
        console.log(error?.message)
    }
}
