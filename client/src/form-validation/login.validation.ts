import * as Yup from 'yup'
import { requiredMessage } from './validation-message.static'

const invalidEmailMessage = 'Invalid email address'

// interface for validation
export interface ILoginValidation {
    email: string
    password: string
}

// form validation YUP for formik
export const loginValidation: Yup.ObjectSchema<ILoginValidation> =
    Yup.object().shape({
        email: Yup.string()
            .email(invalidEmailMessage)
            .required(requiredMessage('Email')),
        password: Yup.string().required(requiredMessage('Password')),
    })

// form login initial data
export const loginInitialValue: ILoginValidation = {
    email: '',
    password: '',
}
