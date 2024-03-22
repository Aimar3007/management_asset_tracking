import * as Yup from 'yup'
import { requiredMessage } from './validation-message.static'

// interface for validation
export interface IAttachPoValidation {
    data: {
        poId: string
        poLines: {
            poLineId: string
            qty: string
        }[]
    }[]
}

// form validation YUP for formik
export const attachPoValidation = Yup.object({
    data: Yup.array().of(
        Yup.object().shape({
            poId: Yup.string(),
            poLines: Yup.array().of(
                Yup.object().shape({
                    poLineId: Yup.string().required('Name required'),
                    qty: Yup.string().required(requiredMessage('qty')),
                }),
            ),
        }),
    ),
})

// form login initial data
export const attachPoInitialValue: IAttachPoValidation = {
    data: [],
}
