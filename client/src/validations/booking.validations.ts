import { commonErrorMessage } from 'common/common.static'
import * as YUP from 'yup'

interface PickupInformation {
    pickupFrom: {
        companyName: {
            code: string
            description: string
        }
        companyAddress: string
        companyPostalCode: string
        companyCity: string
        companyState: string
        companyCountry: string
        contactName: {
            code: string
            description: string
        }
        contactPhone: string
        consignorFax: string
        consignorEmail: string
        consignorOrigin: string
        consignorPort: string
        savePickupAddress: string
    }
    deliveryTo: {
        companyName: {
            code: string
            description: string
        }
        companyAddress: string
        companyPostalCode: string
        companyCity: string
        companyState: string
        companyCountry: string
        consigneeName: {
            code: string
            description: string
        }
        consigneePhone: string
        consigneeFax: string
        consigneeEmail: string
        consigneePort: string
        savePickupAddress: string
    }
    detailInformation: {
        mode: {
            code: string
            description: string
        }
        shipperRef: string
        orderNumber: string
        detailGoodsDescription: string
        goodDescription: string
        message: string
    }
    goodsValue: {
        goodsValues: number
        goodsValuesCurrency: {
            code: string
            description: string
        }
        insuranceValue: number
        insuranceValueCurrency: {
            code: string
            description: string
        }
        shipperCODAmount: number
        shipperCODAmountCurrency: {
            code: string
            description: string
        }
    }
    additionalInformation: {
        estimatedPickupDate: string
        estimatedPickupTime: string
        pickupRequiredByDate: string
        pickupRequiredByTime: string
        pickupRequiredBy: string
        estimatedDeliveryDate: string
        estimatedDeliveryTime: string
        deliveryRequiredByDate: string
        deliveryRequiredByTime: string
        deliveryRequiredBy: string
        marksAndNumbers: string
        specialInstruction: string
        serviceLevel: {
            code: string
            description: string
        }
        incoterm: {
            code: string
            description: string
        }
        chargesApply: {
            code: string
            description: string
        }
        releasetType: {
            code: string
            description: string
        }
        onBoard: {
            code: string
            description: string
        }
    }
    containerList: {
        containerNo: string
        type: {
            code: string
            description: string
        }
        count: string
    }[]
    goodPacksList: {
        pieces: string
        packType: {
            code: string
            description: string
        }
        length: string
        width: string
        height: string
        ud: {
            code: string
            description: string
        }
        weight: string
        uq: {
            code: string
            description: string
        }
        volume: string
        description: string
        marksAndNumbers: string
        product: string
    }[]
    attachedOrderList: {
        orderNumber: string
        date: string
        goodDesc: string
    }[]
    refereceList: {
        country: string
        numberType: {
            code: string
            description: string
        }
        number: string
        typeDescription: string
        issueDate: string
        information: string
    }[]
}

export const bookingValidation = YUP.object().shape({
    pickupFrom: YUP.object().shape({
        companyName: YUP.object().shape({
            code: YUP.string().required(`Company Code ${commonErrorMessage}`),
            description: YUP.string().required(
                `Company Description ${commonErrorMessage}`,
            ),
        }),
        companyAddress: YUP.string().required(
            `Company Address ${commonErrorMessage}`,
        ),
        companyPostalCode: YUP.string().required(
            `Company Postal Code ${commonErrorMessage}`,
        ),
        companyCity: YUP.string().required(
            `Company City ${commonErrorMessage}`,
        ),
        companyState: YUP.string().required(
            `Company State ${commonErrorMessage}`,
        ),
        companyCountry: YUP.string().required(
            `Company Country ${commonErrorMessage}`,
        ),
        contactName: YUP.object().shape({
            code: YUP.string().required(
                `Contact Name Code ${commonErrorMessage}`,
            ),
            description: YUP.string().required(
                `Contact Name Description ${commonErrorMessage}`,
            ),
        }),
        contactPhone: YUP.string().required(
            `Contact Phone ${commonErrorMessage}`,
        ),
        consignorFax: YUP.string().required(
            `Consignor Fax ${commonErrorMessage}`,
        ),
        consignorEmail: YUP.string().required(
            `Consignor Email ${commonErrorMessage}`,
        ),
        consignorOrigin: YUP.string().required(
            `Consignor Origin ${commonErrorMessage}`,
        ),
        consignorPort: YUP.string().required(
            `Consignor Port ${commonErrorMessage}`,
        ),
        savePickupAddress: YUP.string().required(
            `Save Pickup Address ${commonErrorMessage}`,
        ),
    }),
    deliveryTo: YUP.object().shape({
        companyName: YUP.object().shape({
            code: YUP.string().required(`Company Code ${commonErrorMessage}`),
            description: YUP.string().required(
                `Company Description ${commonErrorMessage}`,
            ),
        }),
        companyAddress: YUP.string().required(
            `Company Address ${commonErrorMessage}`,
        ),
        companyPostalCode: YUP.string().required(
            `Company Postal Code ${commonErrorMessage}`,
        ),
        companyCity: YUP.string().required(
            `Company City ${commonErrorMessage}`,
        ),
        companyState: YUP.string().required(
            `Company State ${commonErrorMessage}`,
        ),
        companyCountry: YUP.string().required(
            `Company Country ${commonErrorMessage}`,
        ),
        consigneeName: YUP.object().shape({
            code: YUP.string().required(
                `Consignee Name Code ${commonErrorMessage}`,
            ),
            description: YUP.string().required(
                `Consignee Name Description ${commonErrorMessage}`,
            ),
        }),
        consigneePhone: YUP.string().required(
            `Consignee Phone ${commonErrorMessage}`,
        ),
        consigneeFax: YUP.string().required(
            `Consignee Fax ${commonErrorMessage}`,
        ),
        consigneeEmail: YUP.string().required(
            `Consignee Email ${commonErrorMessage}`,
        ),
        consigneePort: YUP.string().required(
            `Consignee Port ${commonErrorMessage}`,
        ),
        savePickupAddress: YUP.string().required(
            `Save Pickup Address ${commonErrorMessage}`,
        ),
    }),
    detailInformation: YUP.object().shape({
        mode: YUP.object().shape({
            code: YUP.string().required(`Mode Code ${commonErrorMessage}`),
            description: YUP.string().required(
                `Mode Description ${commonErrorMessage}`,
            ),
        }),
        shipperRef: YUP.string().required(
            `Shipper Reference ${commonErrorMessage}`,
        ),
        orderNumber: YUP.string().required(
            `Order Number ${commonErrorMessage}`,
        ),
        detailGoodsDescription: YUP.string().required(
            `Detail Goods Description ${commonErrorMessage}`,
        ),
        goodDescription: YUP.string().required(
            `Good Description ${commonErrorMessage}`,
        ),
        message: YUP.string().required(`Message ${commonErrorMessage}`),
    }),
    goodsValue: YUP.object().shape({
        goodsValues: YUP.number().required(
            `Goods Values ${commonErrorMessage}`,
        ),
        goodsValuesCurrency: YUP.object().shape({
            code: YUP.string().required(`Currency Code ${commonErrorMessage}`),
            description: YUP.string().required(
                `Currency Description ${commonErrorMessage}`,
            ),
        }),
        insuranceValue: YUP.number().required(
            `Insurance Value ${commonErrorMessage}`,
        ),
        insuranceValueCurrency: YUP.object().shape({
            code: YUP.string().required(`Currency Code ${commonErrorMessage}`),
            description: YUP.string().required(
                `Currency Description ${commonErrorMessage}`,
            ),
        }),
        shipperCODAmount: YUP.number().required(
            `Shipper COD Amount ${commonErrorMessage}`,
        ),
        shipperCODAmountCurrency: YUP.object().shape({
            code: YUP.string().required(`Currency Code ${commonErrorMessage}`),
            description: YUP.string().required(
                `Currency Description ${commonErrorMessage}`,
            ),
        }),
    }),
    additionalInformation: YUP.object().shape({
        estimatedPickupDate: YUP.string().required(
            `Estimated Pickup Date ${commonErrorMessage}`,
        ),
        estimatedPickupTime: YUP.string().required(
            `Estimated Pickup Time ${commonErrorMessage}`,
        ),
        pickupRequiredByDate: YUP.string().required(
            `Pickup Required By Date ${commonErrorMessage}`,
        ),
        pickupRequiredByTime: YUP.string().required(
            `Pickup Required By Time ${commonErrorMessage}`,
        ),
        pickupRequiredBy: YUP.string().required(
            `Pickup Required By ${commonErrorMessage}`,
        ),
        estimatedDeliveryDate: YUP.string().required(
            `Estimated Delivery Date ${commonErrorMessage}`,
        ),
        estimatedDeliveryTime: YUP.string().required(
            `Estimated Delivery Time ${commonErrorMessage}`,
        ),
        deliveryRequiredByDate: YUP.string().required(
            `Delivery Required By Date ${commonErrorMessage}`,
        ),
        deliveryRequiredByTime: YUP.string().required(
            `Delivery Required By Time ${commonErrorMessage}`,
        ),
        deliveryRequiredBy: YUP.string().required(
            `Delivery Required By ${commonErrorMessage}`,
        ),
        marksAndNumbers: YUP.string().required(
            `Marks and Numbers ${commonErrorMessage}`,
        ),
        specialInstruction: YUP.string().required(
            `Special Instruction ${commonErrorMessage}`,
        ),
        serviceLevel: YUP.object().shape({
            code: YUP.string().required(
                `Service Level Code ${commonErrorMessage}`,
            ),
            description: YUP.string().required(
                `Service Level Description ${commonErrorMessage}`,
            ),
        }),
        incoterm: YUP.object().shape({
            code: YUP.string().required(`Incoterm Code ${commonErrorMessage}`),
            description: YUP.string().required(
                `Incoterm Description ${commonErrorMessage}`,
            ),
        }),
        chargesApply: YUP.object().shape({
            code: YUP.string().required(
                `Charges Apply Code ${commonErrorMessage}`,
            ),
            description: YUP.string().required(
                `Charges Apply Description ${commonErrorMessage}`,
            ),
        }),
        releasetType: YUP.object().shape({
            code: YUP.string().required(
                `Release Type Code ${commonErrorMessage}`,
            ),
            description: YUP.string().required(
                `Release Type Description ${commonErrorMessage}`,
            ),
        }),
        onBoard: YUP.object().shape({
            code: YUP.string().required(`On Board Code ${commonErrorMessage}`),
            description: YUP.string().required(
                `On Board Description ${commonErrorMessage}`,
            ),
        }),
    }),
    containerList: YUP.array().of(
        YUP.object().shape({
            containerNo: YUP.string().required(
                `Container Number ${commonErrorMessage}`,
            ),
            type: YUP.object().shape({
                code: YUP.string().required(
                    `Container Type Code ${commonErrorMessage}`,
                ),
                description: YUP.string().required(
                    `Container Type Description ${commonErrorMessage}`,
                ),
            }),
            count: YUP.string().required(`Count ${commonErrorMessage}`),
        }),
    ),
    goodPacksList: YUP.array().of(
        YUP.object().shape({
            pieces: YUP.string().required(`Pieces ${commonErrorMessage}`),
            packType: YUP.object().shape({
                code: YUP.string().required(
                    `Pack Type Code ${commonErrorMessage}`,
                ),
                description: YUP.string().required(
                    `Pack Type Description ${commonErrorMessage}`,
                ),
            }),
            length: YUP.string().required(`Length ${commonErrorMessage}`),
            width: YUP.string().required(`Width ${commonErrorMessage}`),
            height: YUP.string().required(`Height ${commonErrorMessage}`),
            ud: YUP.object().shape({
                code: YUP.string().required(`UD Code ${commonErrorMessage}`),
                description: YUP.string().required(
                    `UD Description ${commonErrorMessage}`,
                ),
            }),
            weight: YUP.string().required(`Weight ${commonErrorMessage}`),
            uq: YUP.object().shape({
                code: YUP.string().required(`UQ Code ${commonErrorMessage}`),
                description: YUP.string().required(
                    `UQ Description ${commonErrorMessage}`,
                ),
            }),
            volume: YUP.string().required(`Volume ${commonErrorMessage}`),
            description: YUP.string().required(
                `Description ${commonErrorMessage}`,
            ),
            marksAndNumbers: YUP.string().required(
                `Marks and Numbers ${commonErrorMessage}`,
            ),
            product: YUP.string().required(`Product ${commonErrorMessage}`),
        }),
    ),
    attachedOrderList: YUP.array().of(
        YUP.object().shape({
            orderNumber: YUP.string().required(
                `Order Number ${commonErrorMessage}`,
            ),
            date: YUP.string().required(`Date ${commonErrorMessage}`),
            goodDesc: YUP.string().required(
                `Good Description ${commonErrorMessage}`,
            ),
        }),
    ),
    refereceList: YUP.array().of(
        YUP.object().shape({
            country: YUP.string().required(`Country ${commonErrorMessage}`),
            numberType: YUP.object().shape({
                code: YUP.string().required(
                    `Number Type Code ${commonErrorMessage}`,
                ),
                description: YUP.string().required(
                    `Number Type Description ${commonErrorMessage}`,
                ),
            }),
            number: YUP.string().required(`Number ${commonErrorMessage}`),
            typeDescription: YUP.string().required(
                `Type Description ${commonErrorMessage}`,
            ),
            issueDate: YUP.string().required(
                `Issue Date ${commonErrorMessage}`,
            ),
            information: YUP.string().required(
                `Information ${commonErrorMessage}`,
            ),
        }),
    ),
} as Record<keyof PickupInformation, any>)
