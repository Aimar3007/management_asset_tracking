import * as Yup from 'yup'
import { requiredMessage } from './validation-message.static'

// Interfaxe
export interface IInvoiceNumberValidation {
    invoiceNo: string
    shipmentNo: string
}
export interface IRouteCodeValidation {
    routeCode: string
    shipmentNo: string
}

//  Invoice Number Validation
export const invoiceNumberValidation = () => {
    const invoiceNumberValidation: Yup.ObjectSchema<IInvoiceNumberValidation> =
        Yup.object().shape({
            shipmentNo: Yup.string().required(requiredMessage('Shipment No.')),
            invoiceNo: Yup.string().required(requiredMessage('Invoice Number')),
        })
    const invoiceNumberInitial: IInvoiceNumberValidation = {
        invoiceNo: '',
        shipmentNo: '',
    }

    return {
        invoiceNumberValidation,
        invoiceNumberInitial,
    }
}

//  Route Code Validation
export const routeCodeValidation = () => {
    const routeCodeSchema: Yup.ObjectSchema<IRouteCodeValidation> =
        Yup.object().shape({
            routeCode: Yup.string().required(requiredMessage('Route Code')),
            shipmentNo: Yup.string().required(requiredMessage('Shipment No')),
        })
    const routeCodeInitial: IRouteCodeValidation = {
        routeCode: '',
        shipmentNo: '',
    }

    return {
        routeCodeSchema,
        routeCodeInitial,
    }
}
