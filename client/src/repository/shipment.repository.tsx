import { IResponseData } from 'common/common.interface'
import { endpoints } from 'common/common.static'
import { fetch, post, put, fecthBlob } from 'common/common.service'
import {
    IGetShipmentFilterDropdownData,
    IGetShipmentFilterDropdownDataParams,
    IShipment2,
    IShipmentsFilter,
} from 'pages/shipments/shipments.interface'
import {
    IInvoiceNumberValidation,
    IRouteCodeValidation,
} from 'form-validation/shipment-detail.validation'
import { Toast } from 'components/toast/toast.component'
import { IRouteCode } from './data/route-code.interface'

export const getShipmentsData = async (filter: IShipmentsFilter) => {
    try {
        const response = await fetch<
            IResponseData<IShipment2[]>,
            IShipmentsFilter
        >({
            endpoint: endpoints.shipment_getAll,
            params: filter,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IShipment2[]>
        err.isSuccess = false
        return err
    }
}

export const getShipmentDetails = async (shipmentId: string) => {
    try {
        const response = await fetch<IResponseData<IShipment2>, string>({
            endpoint: `${endpoints.shipment_getAll}/${shipmentId}`,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IShipment2>
        err.isSuccess = false
        return err
    }
}

export const getShipmentFilterDropdownData = async (
    params: IGetShipmentFilterDropdownDataParams | null,
) => {
    try {
        const response = await fetch<
            IResponseData<IGetShipmentFilterDropdownData>,
            IGetShipmentFilterDropdownDataParams | null
        >({
            endpoint: endpoints.shipment_getFilterDropdownOptions,
            params,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IGetShipmentFilterDropdownData>
        err.isSuccess = false
        return err
    }
}

export const updateInvoiceNo = async (props: IInvoiceNumberValidation) => {
    const url: string = `${endpoints.shipment_updateInvoice}?invoiceNo=${props.invoiceNo}&shipmentNo=${props.shipmentNo}`
    try {
        await put<IResponseData<any>, IInvoiceNumberValidation>({
            endpoint: url,
            payload: props,
        })
        Toast({
            header: 'Success',
            message: 'Success update invoice',
            type: 'success',
        })
    } catch (error: any) {
        console.error(error)
        Toast({
            header: 'Failed!',
            message: 'Failed Update invoice',
            type: 'error',
        })
    }
}

export const getRouteCode = async () => {
    try {
        const response = await fetch<IResponseData<IRouteCode[]>, any>({
            endpoint: endpoints.po_panRoute,
        })
        return response
    } catch (error: any) {
        console.error(error)
        Toast({
            header: 'Failed!',
            message: 'Failed get list of route code',
            type: 'error',
        })
    }
}

export const updateStatusShipment = async (
    shipmentId: string,
    payload: string,
) => {
    try {
        const response = await put<IResponseData<any>, string>({
            endpoint: endpoints.shipment_updateStatuShipment + shipmentId,
            payload,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IGetShipmentFilterDropdownData>
        err.isSuccess = false
        Toast({
            header: 'Failed!',
            message: 'Failed get list of route code',
            type: 'error',
        })
        return err
    }
}

export const updateRouteCode = async (props: IRouteCodeValidation) => {
    const url: string = `${endpoints.shipment_updateRouteCode}?routeCode=${props.routeCode}&shipmentNo=${props.shipmentNo}`
    try {
        await put<IResponseData<any>, IRouteCodeValidation>({
            endpoint: url,
            payload: props,
        })
        Toast({
            header: 'Success',
            message: 'Success update route code',
            type: 'success',
        })
    } catch (error: any) {
        console.error(error)
        Toast({
            header: 'Failed!',
            message: 'Failed Update Route Code',
            type: 'error',
        })
    }
}

export const uploadEdocs = async (
    params: {
        shipmentNo: string
        documentType: string
    },
    formData: FormData,
) => {
    try {
        await post<IResponseData<any>, any>({
            endpoint: endpoints.shipment_uploadEDocs,
            params: params,
            payload: formData,
            isFormData: true,
        })
        Toast({
            header: 'EDOCUMENT ADDED',
            message: 'Success upload eDoc',
            type: 'success',
        })
    } catch (error: any) {
        console.error(error)
        console.log(error)
        Toast({
            header: 'Failed!',
            message: 'Failed upload eDoc',
            type: 'error',
        })
    }
}

export const downloadEdocs = async (fileName: string, shipmentNo: string) => {
    const params = { objectName: fileName, shipmentNo }
    try {
        const response = await fecthBlob<any, { objectName: string }>({
            endpoint: endpoints.shipment_downloadEDocs,
            params,
        })
        // Create a blob from the response data
        const blob = new Blob([response.data], {
            type: response.headers['content-type'],
        })

        // Create a temporary URL for the blob
        const url = window.URL.createObjectURL(blob)

        // Create a temporary link element
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName) // Set the filename
        document.body.appendChild(link)

        // Trigger the click event to download the file
        link.click()

        // Clean up resources
        window.URL.revokeObjectURL(url)
        document.body.removeChild(link)
        Toast({
            header: 'Success',
            message: 'Success download eDoc',
            type: 'success',
        })
    } catch (error: any) {
        console.error(error)
        Toast({
            header: 'Failed!',
            message: 'Failed download eDoc',
            type: 'error',
        })
    }
}
