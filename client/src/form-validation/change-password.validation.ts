import * as YUP from 'yup'
import { requiredMessage } from './validation-message.static'

export interface IChangePasswordValidation {
    newPassword: string
    newPasswordConfirmation: string
    currentPassword: string
}

export const changePasswordValidation = () => {
    const changePasswordSchema = YUP.object().shape({
        newPassword: YUP.string().required(requiredMessage('New Password')),
        newPasswordConfirmation: YUP.string().required(
            requiredMessage('New Password Confirmation'),
        ),
        currentPassword: YUP.string().required(
            requiredMessage('Current Password'),
        ),
    } as Record<keyof IChangePasswordValidation, any>)

    // form user initial data
    const changePasswordInitial: IChangePasswordValidation = {
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
    }

    return {
        changePasswordSchema,
        changePasswordInitial,
    }
}
