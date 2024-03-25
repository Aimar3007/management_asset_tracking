import * as YUP from 'yup'
import { requiredMessage } from './validation-message.static'

export interface IFAssetManagement {
    name: string
    description: string
    brand: string
    serialNumber: string
    condition: string
    purchaseDate: string
    city: string
    userId: number
}

export const createAssetValidation = YUP.object().shape({
    name: YUP.string().required(requiredMessage('description')),
    description: YUP.string().required(requiredMessage('city')),
    brand: YUP.string().required(requiredMessage('brand')),
    serialNumber: YUP.string().required(requiredMessage('serialNumber')),
    condition: YUP.string().required(requiredMessage('condition')),
    purchaseDate: YUP.string().required(requiredMessage('purchaseDate')),
    city: YUP.string().required(requiredMessage('city')),
    userId: YUP.number().required(requiredMessage('userId')),
} as Record<keyof IFAssetManagement, any>)

// form user initial data
export const createAssetInitial: IFAssetManagement = {
    name: '',
    description: '',
    brand: '',
    serialNumber: '',
    condition: '',
    purchaseDate: '',
    city: '',
    userId: 0,
}
