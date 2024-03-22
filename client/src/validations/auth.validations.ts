import { commonErrorMessage } from 'common/common.static'
import * as YUP from 'yup'

export interface ILogin {
    username: string
    password: string
}
export const loginValidations = YUP.object().shape({
    password: YUP.string().required(`Password ${commonErrorMessage}`),
    username: YUP.string().required(`Username ${commonErrorMessage}`),
} as Record<keyof ILogin, any>)

export interface IForgotPassword {
    email: string
}

export const forgotPasswordValidations = YUP.object().shape({
    email: YUP.string()
        .email('Email should be formatted i.e. mail@onebyone.io')
        .required(`Email ${commonErrorMessage}`),
} as Record<keyof IForgotPassword, any>)
