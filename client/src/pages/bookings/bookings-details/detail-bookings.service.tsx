import { useState } from 'react'
import { DataBookings, AdditionalInformationData } from '../bookings.dummy'
import { IBookings } from '../bookings.interface'
import LabelData from 'components/label-data/label-data.component'
import {
    contentLeftTitle,
    contentRightTitle,
    headerDocuments,
    headerRelatedInvoices,
    headerAdditionalInformation
} from './detail-bookings.static'
import { documentData, relatedInvoiceData } from './detail-bookings.dummy'

export const useBookingDetails = () => {
    const [selectedItem, setSelectedItem] = useState<IBookings | null>(null)
    // temporary
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-unused-vars
    const [selectedBooking] = useState(
        DataBookings[0]
    )
    const [selectedAdditionalInformation] = useState(AdditionalInformationData[0]);

    function getComponentItemDetail() {
        if (selectedItem === null)
            return (
                <div className="text-size-s text-logistical-blue-ver5 italic">
                    {' '}
                    Select an Item
                </div>
            )
        const selectedItem_ = selectedItem as any
        return contentLeftTitle.map((header) => {
            return (
                <LabelData
                    data={selectedItem_[header.value]}
                    label={header.title}
                    textColor="logistical-blue-ver5"
                />
            )
        })
    }

    const getBookingDetail = () => {
        const selectedBooking_ = selectedBooking as any

        return contentLeftTitle.map((header) => {
            return (
                <LabelData
                    data={selectedBooking_[header.value]}
                    label={header.title}
                />
            )
        })
    }

    const getCompanyDetail = () => {
        const selectedBooking_ = selectedBooking as any

        return contentRightTitle.map((header) => {
            return (
                <LabelData
                    data={selectedBooking_[header.value]}
                    label={header.title}
                />
            )
        })
    }

    const getAdditionalInformation = () => {
        const selectedBooking_ = selectedAdditionalInformation as any

        return headerAdditionalInformation.map((header) => {
            return (
                <LabelData
                    data={selectedBooking_[header.value]}
                    label={header.title}
                />
            )
        })
    }

    const [relatedInvData, setRelatedInvData] = useState([
        ...relatedInvoiceData,
        {
            invoiceNo: '',
            issuer: '',
            type: '',
            terms: '',
            invDate: '',
            dueDate: '',
            currency: '',
            amount: '',
            outstandingAmount: '',
            paidDate: '',
        },
    ])

    const [docData, setDocData] = useState([
        ...documentData,
        {
            date: '',
            description: '',
            type: '',
        },
    ])

    function reArrangeRelatedInvoiceTable() {
        return headerRelatedInvoices.map((data, index) => {
            if (index !== 0) return data

            data.customBuild = (d) => {
                if (d !== '') {
                    return (
                        <i
                            className="ri-delete-bin-5-line text-[#FF004E] text-XS py-2 flex justify-center cursor-pointer"
                            onClick={() => {
                                console.log(d)
                            }}
                        ></i>
                    )
                } else {
                    return (
                        <i
                            className="ri-add-box-line text-logistical-blue-ver4 text-size-XL flex justify-center opacity-75 cursor-pointer"
                            onClick={() => {
                                console.log(d)
                            }}
                        ></i>
                    )
                }
            }
            return data
        })
    }

    function reArrangeDocumentTable() {
        return headerDocuments.map((data, index) => {
            if (index !== 0) return data

            data.customBuild = (d) => {
                if (d !== '') {
                    return (
                        <i
                            className="ri-delete-bin-5-line text-[#FF004E] text-XS py-2 flex justify-center cursor-pointer"
                            onClick={() => {
                                console.log(d)
                            }}
                        ></i>
                    )
                } else {
                    return (
                        <i
                            className="ri-add-box-line text-logistical-blue-ver4 text-size-XL flex justify-center opacity-75 cursor-pointer"
                            onClick={() => {
                                console.log(d)
                            }}
                        ></i>
                    )
                }
            }
            return data
        })
    }

    const noData = () => {
        return (
            <div className="!p-10 !text-center !items-center !justify-center">
                {' '}
                No Data
            </div>
        )
    }

    return {
        setSelectedItem,
        getBookingDetail,
        getAdditionalInformation,
        getCompanyDetail,
        getComponentItemDetail,
        relatedInvData,
        setRelatedInvData,
        docData,
        setDocData,
        reArrangeRelatedInvoiceTable,
        reArrangeDocumentTable,
        noData,
    }
}