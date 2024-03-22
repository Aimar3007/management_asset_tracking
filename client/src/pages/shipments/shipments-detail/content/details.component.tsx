/* eslint-disable no-unused-vars */
import { ISTColumn } from 'components/simple-table/simple-table.interface'
import {
    pillsShippingDetailsHeader,
    pillSAddressesDetailsHeader,
} from '../shipments-details.static'
import Pills from 'components/pills/pills.component'
import {
    IPillSAddressesDetailsHeader,
    IPillsShippingDetailsHeader,
} from '../shipments-detail.interface'

interface IDetails {
    setPillShippingDetails: React.Dispatch<
        React.SetStateAction<ISTColumn<IPillsShippingDetailsHeader>>
    >
    setPillAddressesDetails: React.Dispatch<
        React.SetStateAction<ISTColumn<IPillSAddressesDetailsHeader>>
    >
    getContentPillShippingDetails: JSX.Element
    getContentPillAddressesDetails: JSX.Element
    modalComponent: JSX.Element
}

const Details = ({
    setPillShippingDetails,
    setPillAddressesDetails,
    getContentPillShippingDetails,
    getContentPillAddressesDetails,
    modalComponent,
}: IDetails) => {
    return (
        <>
            <div className="flex gap-2 sm:flex-col sm:overflow-auto">
                <div className="border border-solid border-logistical-gray-ver3 rounded flex-1 overflow-auto z-[1]">
                    <div className="p-3 font-bold text-size-L">
                        Shipping Details
                    </div>
                    <div className="border-b border-solid border-logistical-gray-ver3"></div>
                    <Pills
                        items={pillsShippingDetailsHeader}
                        onChange={(
                            e: ISTColumn<IPillsShippingDetailsHeader>,
                        ) => {
                            setPillShippingDetails(e)
                        }}
                    />
                    <div className="overflow-auto h-[calc(100vh-26.6rem)] sm:h-full sm pl-3">
                        {getContentPillShippingDetails}
                    </div>
                </div>
                <div className="border border-solid border-logistical-gray-ver3 rounded flex-1">
                    <div className="p-3 font-bold text-size-L">
                        Addresses Details
                    </div>
                    <div className="border-b border-solid border-logistical-gray-ver3"></div>
                    <Pills
                        items={pillSAddressesDetailsHeader}
                        onChange={(
                            e: ISTColumn<IPillSAddressesDetailsHeader>,
                        ) => {
                            setPillAddressesDetails(e)
                        }}
                    />
                    <div
                        className="overflow-auto h-[calc(100vh-26.6rem)] sm:h-full pl-3 flex flex-col gap-y-2"
                        style={{ lineHeight: 'normal' }}
                    >
                        {getContentPillAddressesDetails}
                    </div>
                </div>
            </div>
            {modalComponent}
        </>
    )
}

export default Details
