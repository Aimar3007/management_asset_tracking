import { IResponseData } from 'common/common.interface'
import { post } from 'common/common.service'
import { IUserAuth } from './interface/user-auth.interface'
import { endpoints } from 'common/common.static'
import { ILoginValidation } from 'form-validation/login.validation'

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
