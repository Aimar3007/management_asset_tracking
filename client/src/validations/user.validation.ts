import * as YUP from 'yup'
import {
    invalidEmailMessage,
    requiredMessage,
} from './validation-message.static'
export interface IFUser {
    userName: string
    password: string
    email: string
    roleId: number
    city: string
    position: string
}

export const createUserValidation = YUP.object().shape({
    userName: YUP.string().required(requiredMessage('username')),
    city: YUP.string().required(requiredMessage('city')),
    password: YUP.string().required(requiredMessage('password')),
    email: YUP.string()
        .email(invalidEmailMessage())
        .required(requiredMessage('email')),
    roleId: YUP.string().required(requiredMessage('roleId')),
} as Record<keyof IFUser, any>)

// form user initial data
export const createUserInitial: IFUser = {
    // personal
    userName: '',
    password: '',
    email: '',
    roleId: 0,
    city: '',
    position: '',
}
