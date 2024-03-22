/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import {
    getShipmentFilterDropdownData,
    getShipmentsData,
} from 'repository/shipment.repository'
import { useAppDispatch } from 'store'
import {
    filterDropdownOptionsSelector,
    filterDropdownSelector,
    filterSelector,
    setFilter,
    setFilterDropdown,
    setFilterDropdownOptions,
    setPageNumber,
    setSelectedStatus,
    setShipmentData,
    shipmentMetaSelector,
    shipmentsDataSelector,
    shipmentsStatusTotalSelector,
    tabStatusFilterSelector,
} from './shipments.slice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ITabItem } from 'components/tab/tab.interface'
import {
    IGetShipmentFilterDropdownDataParams,
    IShipment2,
    IShipmentFilterDropdown,
    IShipmentStatusTotal,
    IShipmentsFilter,
} from './shipments.interface'
import ShipmentsFilterOverlay from './components/shipment-filter-overlay.component'
import useOverlay from 'components/overlay/overlay.service'
import ShipmentFilter from './components/shipment-filter.component'
import { useModal } from 'components/modal/modal.service'
import {
    shipmentSortByOption,
    transportScheduleOption,
} from './shipments.static'

const useShipments = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // selector
    const shipmentsData = useSelector(shipmentsDataSelector)
    const totalStatus = useSelector(shipmentsStatusTotalSelector)
    const tabFilter = useSelector(tabStatusFilterSelector)
    const filter = useSelector(filterSelector)
    const shipemntsDataMeta = useSelector(shipmentMetaSelector)
    const filterDropdown = useSelector(filterDropdownSelector)
    const filterDropdownOptions = useSelector(filterDropdownOptionsSelector)

    // state
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const [tabItems, setTabItems] = useState<ITabItem[]>()
    const [filterTemporary, setFilterTemporary] =
        useState<IShipmentFilterDropdown>(filterDropdown)
    const [filterTemporary2, setFilterTemporary2] =
        useState<IShipmentFilterDropdown>(filterDropdown)
    const [generateReportData, setGenerateReportData] = useState<IShipment2[]>(
        [],
    )

    // variable
    const { pageNumber, pageSize, status } = filter

    // modal
    const ShipmentGenerateReportModalService = useModal()

    // overlay
    const filterOverlayService = useOverlay()

    useEffect(() => {
        generateHeaderShipment()
    }, [tabFilter.value])

    // set filter when apply filter
    useEffect(() => {
        setFilterTemporary(filterDropdown)
        setFilterTemporary2(filterDropdown)
    }, [filterDropdown])

    useEffect(() => {
        generateTabItems(totalStatus)
    }, [totalStatus])

    // get data shipments
    useEffect(() => {
        loadData()
    }, [pageNumber, pageSize, status, tabFilter, filter])

    // get option dropdown data
    useEffect(() => {
        getFilterDropdownData({})
    }, [])

    // Get Data Function
    const loadData = async () => {
        const status = tabFilter.value

        let tmpFilter: IShipmentsFilter = filter
        if (tabFilter?.childStatus) {
            const inProgressStat = tabFilter?.childStatus[0].value
            tmpFilter = { ...filter, status, inProgressStat }
        } else {
            tmpFilter = { ...filter, status }
        }
        try {
            setLoading(true)
            const actionResult = await getShipmentsData(tmpFilter)
            dispatch(setShipmentData(actionResult))
            setLoading(false)
        } catch (e) {
            setLoading(false)
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            setErrorMessage(errorMessage)
        }
    }

    // set data filter from tab
    const setTabFilter = async (data: ITabItem) => {
        dispatch(setSelectedStatus(data))
        dispatch(setPageNumber(1))
    }

    // generate tab Items
    const generateTabItems = (status: IShipmentStatusTotal) => {
        const tabItems: ITabItem[] = [
            {
                label: 'In Progress',
                key: 'status',
                totalData: status.inprogress.count,
                value: 'inProgress',
                colorClassname: 'bg-logistical-yellow-ver1',
                textColorClassname: 'text-logistical-yellow-dark-ver1',
                lineColorClassname: 'bg-logistical-yellow-dark-ver1',
                childStatus: [
                    {
                        key: 'booked',
                        value: 'booked',
                        label: 'Booked',
                        totalData: status.inprogress.child.booked,
                    },
                    {
                        key: 'shipped',
                        value: 'shipped',
                        label: 'Shipped',
                        totalData: status.inprogress.child.shipped,
                    },
                    {
                        key: 'delivered',
                        value: 'delivered',
                        label: 'Delivered',
                        totalData: status.inprogress.child.delivered,
                    },
                    {
                        key: 'inFactory',
                        value: 'infactory',
                        label: 'In Factory',
                        totalData: status?.inprogress?.child?.infactory,
                    },
                ],
            },
            {
                label: 'Confirmed',
                key: 'status',
                totalData: status.confirmed,
                value: 'confirmed',
                colorClassname: 'bg-logistical-green-ver2',
                textColorClassname: 'text-logistical-green-dark-ver1',
                lineColorClassname: 'bg-logistical-green-dark-ver1',
            },
        ]

        setTabItems(tabItems)
    }

    // set page
    const setPageData = (pageNumber: number) => {
        dispatch(setPageNumber(pageNumber))
    }

    // generate header table shipemnt summary
    const generateHeaderShipment = () => {
        let newElements = []
        const header = [
            {
                label: 'Shipment ID',
                accessor: 'shipmentID',
            },
            {
                label: 'Transport',
                accessor: 'transport',
            },
            {
                label: 'Origin',
                accessor: 'origin',
            },
            {
                label: 'Destination',
                accessor: 'destination',
            },
            {
                label: 'Shipper',
                accessor: 'shipper',
            },
            {
                label: 'Consignee',
                accessor: 'consignee',
            },
            {
                label: 'Weight',
                accessor: 'weight',
            },
            {
                label: 'UW',
                accessor: 'uw',
            },
            {
                label: 'Volume',
                accessor: 'volume',
            },
            {
                label: 'UV',
                accessor: 'uv',
            },
            {
                label: 'Last Updated',
                accessor: 'lastUpdated',
            },
        ]

        switch (
            tabFilter?.childStatus?.length &&
            tabFilter.childStatus[0].value
        ) {
            case 'booked':
                newElements = [
                    {
                        label: 'ETD',
                        accessor: 'etd',
                    },
                ]
                break
            case 'shipped':
            case 'delivered':
                newElements = [
                    {
                        label: 'ETD',
                        accessor: 'etd',
                    },
                    {
                        label: 'ATD',
                        accessor: 'atd',
                    },
                    {
                        label: 'ETA',
                        accessor: 'eta',
                    },
                ]
                break
            default:
                newElements = [
                    {
                        label: 'ETD',
                        accessor: 'etd',
                    },
                    {
                        label: 'ATD',
                        accessor: 'atd',
                    },
                    {
                        label: 'ETA',
                        accessor: 'eta',
                    },
                    {
                        label: 'ATA',
                        accessor: 'ata',
                    },
                ]
                break
        }

        // add elemen after index 5
        header.splice(6, 0, ...newElements)
        return header
    }

    // search po by po number
    const handleSearch = (values: string) => {
        if (values.length >= 3) {
            dispatch(setFilter({ ...filter, shipmentId: values }))
        } else if (values.length <= 0)
            dispatch(setFilter({ ...filter, shipmentId: '' }))
    }

    // appyFilter
    const applyFilter = () => {
        const setTransport =
            filterTemporary?.transport?.map((x) => x.value) || []
        const setOrigin = filterTemporary?.origin?.map((x) => x.value) || []
        const setDestination =
            filterTemporary?.destination?.map((x) => x.value) || []
        const setConsignee =
            filterTemporary?.consignee?.map((x) => x.value) || []
        const setShipper = filterTemporary?.shipper?.map((x) => x.value) || []

        // set filter params for get data
        dispatch(
            setFilter({
                ...filter,
                transport: setTransport as string[],
                origin: setOrigin as string[],
                destination: setDestination as string[],
                consignee: setConsignee as string[],
                shipper: setShipper as string[],
                ETAStart: filterTemporary?.transportSchedule?.eta
                    ?.from as string,
                ETAEnd: filterTemporary?.transportSchedule?.eta?.to as string,
                ETDStart: filterTemporary?.transportSchedule?.etd
                    ?.from as string,
                ETDEnd: filterTemporary?.transportSchedule?.etd?.to as string,
                // ATDStart: filterTemporary?.transportSchedule?.atd?.to as string,
                // ATDEnd: filterTemporary?.transportSchedule?.atd?.to as string,
                // ATAStart: filterTemporary?.transportSchedule?.ata?.to as string,
                // ATAEnd: filterTemporary?.transportSchedule?.ata?.to as string,
            }),
        )

        // save filter in global state
        dispatch(setFilterDropdown(filterTemporary))
    }

    // reset filter
    const resetFilter = () => {
        // remove filter in global state
        dispatch(
            setFilterDropdown({
                transport: [],
                origin: [],
                destination: [],
                consignee: [],
                shipper: [],
                transportScheduleOption: transportScheduleOption[0],
                transportSchedule: {
                    etd: {
                        from: '',
                        to: '',
                    },
                    eta: {
                        from: '',
                        to: '',
                    },
                    atd: {
                        from: '',
                        to: '',
                    },
                    ata: {
                        from: '',
                        to: '',
                    },
                },
            }),
        )

        // still waiting improve api
        // const {
        //     transport,
        //     origin,
        //     destination,
        //     consignee,
        //     shipper,
        // } = filter
        // if (
        //     transport?.length ||
        //     origin?.length ||
        //     destination?.length ||
        //     shipper?.length ||
        //     consignee?.length ||
        // ) {
        //     // remove filter in payload for load data
        //     dispatch(
        //         setFilter({
        //             ...filter,
        //             transport: [],
        //             origin: [],
        //             destination: [],
        //             shipper: [],
        //             consignee: [],
        //         }),
        //     )
        // }
    }

    // remove filter generate report when close modal
    const removeTemporyFilter2 = () => {
        setFilterTemporary2(filterDropdown)
    }

    // reset filter in generate report
    const resetFilterGenerateReport = () => {
        setFilterTemporary2({
            transportSchedule: {
                etd: {
                    from: '',
                    to: '',
                },
                eta: {
                    from: '',
                    to: '',
                },
                atd: {
                    from: '',
                    to: '',
                },
                ata: {
                    from: '',
                    to: '',
                },
            },
            transportScheduleOption: transportScheduleOption[0],
            sortBy: shipmentSortByOption[0],
            transport: [],
            origin: [],
            destination: [],
            consignee: [],
            shipper: [],
        })
    }

    // get filter dropdown data
    const getFilterDropdownData = async (
        params: IGetShipmentFilterDropdownDataParams | null,
    ) => {
        try {
            setLoading(true)
            const actionResult = await getShipmentFilterDropdownData(params)
            const { transport, origin, destination, consignee, shipper } =
                actionResult.data

            // set action result
            const setTransport = transport?.map((transport) => ({
                value: transport,
                label: transport,
            }))
            const setOrigin = origin?.map((origin) => ({
                value: origin,
                label: origin,
            }))
            const setDestination = destination?.map((destination) => ({
                value: destination,
                label: destination,
            }))
            const setConsignee = consignee?.map((consignee) => ({
                value: consignee,
                label: consignee,
            }))
            const setShipper = shipper?.map((shipper) => ({
                value: shipper,
                label: shipper,
            }))
            dispatch(
                setFilterDropdownOptions({
                    transport: setTransport,
                    origin: setOrigin,
                    destination: setDestination,
                    consignee: setConsignee,
                    shipper: setShipper,
                }),
            )

            setLoading(false)
        } catch (e) {
            setLoading(false)
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            setErrorMessage(errorMessage)
        }
    }

    // load data dropdown filter
    const loadOptions = async ({
        transport,
        origin,
        destination,
        consignee,
        shipper,
    }: {
        transport?: string
        origin?: string
        destination?: string
        consignee?: string
        shipper?: string
    }) => {
        try {
            if (transport) {
                const options = await getShipmentFilterDropdownData({
                    transport: transport,
                })
                return options.data.transport.map((option) => ({
                    value: option,
                    label: option,
                }))
            }
            if (origin) {
                const options = await getShipmentFilterDropdownData({
                    origin: origin,
                })
                return options.data.origin.map((option) => ({
                    value: option,
                    label: option,
                }))
            }
            if (destination) {
                const options = await getShipmentFilterDropdownData({
                    destination: destination,
                })
                return options.data.destination.map((option) => ({
                    value: option,
                    label: option,
                }))
            }
            if (consignee) {
                const options = await getShipmentFilterDropdownData({
                    consignee: consignee,
                })
                return options.data.consignee.map((option) => ({
                    value: option,
                    label: option,
                }))
            }
            if (shipper) {
                const options = await getShipmentFilterDropdownData({
                    shipper: shipper,
                })
                return options.data.shipper.map((option) => ({
                    value: option,
                    label: option,
                }))
            }
        } catch (error) {
            console.error('Error fetching options:', error)
            return []
        }
    }

    // get data shipment for generate report
    const getDataGenerate = async () => {
        const setTransport =
            filterTemporary2?.transport?.map((x) => x.value) || []
        const setOrigin = filterTemporary2?.origin?.map((x) => x.value) || []
        const setDestination =
            filterTemporary2?.destination?.map((x) => x.value) || []
        const setConsignee =
            filterTemporary2?.consignee?.map((x) => x.value) || []
        const setShipper = filterTemporary2?.shipper?.map((x) => x.value) || []

        const setFilter = {
            transport: setTransport,
            origin: setOrigin,
            destination: setDestination,
            consignee: setConsignee,
            shipper: setShipper,
            sortBy: filterTemporary2?.sortBy?.value,
            ETAStart: filterTemporary2?.transportSchedule?.eta?.from as string,
            ETAEnd: filterTemporary2?.transportSchedule?.eta?.to as string,
            ETDStart: filterTemporary2?.transportSchedule?.etd?.from as string,
            ETDEnd: filterTemporary2?.transportSchedule?.etd?.to as string,
        } as IShipmentsFilter
        console.log(setFilter)

        try {
            const actionResult = await getShipmentsData(setFilter)
            setGenerateReportData(actionResult.data)
            return actionResult.data
        } catch (e) {
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            setErrorMessage(errorMessage)
        }
    }

    // all variabel component
    const componentFilter = (
        <ShipmentFilter
            isGenerateReport={true}
            filterTemporary={filterTemporary2}
            setState={setFilterTemporary2}
            filterDropdownOptions={filterDropdownOptions}
            loadOptions={loadOptions}
        />
    )
    const componentPoFilterOverlay = (
        <ShipmentsFilterOverlay
            filterOverlayService={filterOverlayService}
            removeTemporyFilter={() => setFilterTemporary(filterDropdown)}
            resetFilter={resetFilter}
            applyFilter={applyFilter}
            componentFilter={
                <ShipmentFilter
                    filterTemporary={filterTemporary}
                    setState={setFilterTemporary}
                    filterDropdownOptions={filterDropdownOptions}
                    loadOptions={loadOptions}
                />
            }
        />
    )

    return {
        setTabFilter,
        navigate,
        generateHeaderShipment,
        setPageData,
        handleSearch,
        removeTemporyFilter2,
        resetFilterGenerateReport,
        getDataGenerate,
        generateReportData,
        ShipmentGenerateReportModalService,
        componentFilter,
        filterOverlayService,
        componentPoFilterOverlay,
        shipemntsDataMeta,
        tabItems,
        tabFilter,
        shipmentsData,
        loading,
        errorMessage,
    }
}

export default useShipments
