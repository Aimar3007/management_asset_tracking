import { commonErrorMessage } from '../common/common.static'
import * as YUP from 'yup'

export interface IUniversalShipment {
    id: string
    transportMode: string
    incoterm: string
    serviceLevel: string
    weight: string
    volume: string
    commodity: string
    chargeable: string
    goodsValue: string
    insuranceValue: string
    pCompany: string
    pAddress: string
    pPostalCode: string
    pCity: string
    pOrigin: string
    pCountry: string
    pContact: string
    pPhone: string
    pFax: string
    pEmail: string
    dCompany: string
    dAddress: string
    dPostalCode: string
    dCity: string
    dDestination: string
    dCountry: string
    dContact: string
    dPhone: string
    dFax: string
    dEmail: string
}

export const universalShipmentSchema = YUP.object().shape({
    id: YUP.string().required(` Id ${commonErrorMessage}`),
    transportMode: YUP.string().required(
        ` Transport Mode ${commonErrorMessage}`,
    ),
    incoterm: YUP.string().required(` Incoterm ${commonErrorMessage}`),
    serviceLevel: YUP.string().required(` Service Level ${commonErrorMessage}`),
    weight: YUP.string().required(` Weight ${commonErrorMessage}`),
    volume: YUP.string().required(` Volume ${commonErrorMessage}`),
    commodity: YUP.string().required(` Commodity ${commonErrorMessage}`),
    chargeable: YUP.string().required(` Chargeable ${commonErrorMessage}`),
    goodsValue: YUP.string().required(` Goods Value ${commonErrorMessage}`),
    insuranceValue: YUP.string().required(
        ` Insurance Value ${commonErrorMessage}`,
    ),
    pCompany: YUP.string().required(` Company ${commonErrorMessage}`),
    pAddress: YUP.string().required(` Address ${commonErrorMessage}`),
    pPostalCode: YUP.string().required(` Postalcode ${commonErrorMessage}`),
    pCity: YUP.string().required(` City ${commonErrorMessage}`),
    pOrigin: YUP.string().required(` Origin ${commonErrorMessage}`),
    pCountry: YUP.string().required(` Country ${commonErrorMessage}`),
    pContact: YUP.string().required(` Contact ${commonErrorMessage}`),
    pPhone: YUP.string().required(` Phone ${commonErrorMessage}`),
    pFax: YUP.string().required(` Fax ${commonErrorMessage}`),
    pEmail: YUP.string().required(
        ` Email should be formatted i.e. mail@onebyone.io`,
    ),
    dCompany: YUP.string().required(` Company ${commonErrorMessage}`),
    dAddress: YUP.string().required(` Address ${commonErrorMessage}`),
    dPostalCode: YUP.string().required(` Postalcode ${commonErrorMessage}`),
    dCity: YUP.string().required(` City ${commonErrorMessage}`),
    dDestination: YUP.string().required(` Destination ${commonErrorMessage}`),
    dCountry: YUP.string().required(` Country ${commonErrorMessage}`),
    dContact: YUP.string().required(` Contact ${commonErrorMessage}`),
    dPhone: YUP.string().required(` Phone ${commonErrorMessage}`),
    dFax: YUP.string().required(` Fax ${commonErrorMessage}`),
    dEmail: YUP.string().required(
        ` Email should be formatted i.e. mail@onebyone.io`,
    ),
} as Record<keyof IUniversalShipment, any>)
