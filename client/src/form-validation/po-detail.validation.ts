import * as Yup from 'yup'
import { requiredMessage } from './validation-message.static'

// Edit Line Items --------------------------------------------------------------
export interface IGoodsFromSchema {
    data: {
        poLineId: string
        poGoodValue: string
    }[]
}
export interface IContactSupplierSchema {
    contactSupplier: string
}

export const poDetailValidation = () => {
    // Goods From -------------------------------------------------------
    const goodsFromSchema = Yup.object({
        data: Yup.array().of(
            Yup.object().shape({
                poLineId: Yup.string().required('Line Id'),
                poGoodValue: Yup.string().required(requiredMessage('Country')),
            }),
        ),
    })
    const goodsFromInitial: IGoodsFromSchema = {
        data: [],
    }

    // Contact Supplier --------------------------------------------------------------
    const contactSupplierSchema: Yup.ObjectSchema<IContactSupplierSchema> =
        Yup.object().shape({
            contactSupplier: Yup.string().required(
                requiredMessage('Supplier Contact'),
            ),
        })
    const contactSupplierInitial: IContactSupplierSchema = {
        contactSupplier: '',
    }

    return {
        goodsFromSchema,
        goodsFromInitial,
        contactSupplierSchema,
        contactSupplierInitial,
    }
}

// form validation YUP for formik
