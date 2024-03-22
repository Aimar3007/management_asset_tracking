import * as Yup from 'yup'
import { requiredMessage } from './validation-message.static'

export interface IResetPasswordValidation {
    newPassword: string
    passwordConfirmation: string
}

export const resetPasswordValidation: Yup.ObjectSchema<IResetPasswordValidation> =
    Yup.object().shape({
        newPassword: Yup.string()
            .required(requiredMessage('New Password'))
            .min(8, 'Password must be at least 8 characters long'),
        passwordConfirmation: Yup.string()
            .required(requiredMessage('Confirm Password'))
            .min(8, 'Password must be at least 8 characters long'),
    })

export const resetPasswordInitialValue: IResetPasswordValidation = {
    newPassword: '',
    passwordConfirmation: '',
}
