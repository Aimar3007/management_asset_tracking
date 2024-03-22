import * as Yup from 'yup'
import { requiredMessage } from './validation-message.static'

const invalidEmailMessage = 'Invalid email address'

// interface for validation
export interface IForgotPassword {
    email: string
}

// form validation YUP for formik
export const forgotPasswordValidation: Yup.ObjectSchema<IForgotPassword> =
    Yup.object().shape({
        email: Yup.string()
            .email(invalidEmailMessage)
            .required(requiredMessage('Email')),
    })

// form login initial data
export const forgotPasswordInitialValue: IForgotPassword = {
    email: '',
}
