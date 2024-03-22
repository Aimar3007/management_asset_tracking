/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    filterParamsSelector,
    filterBodySelector,
    poDataSelector,
    poMeta,
    poTotalStatus,
    setPageNumber,
    setFilterBody,
    setPoData,
    setSelectedStatus,
    tabStatusFilterSelector,
    setFilterDropdownOptions,
    filterDropdownOptionSelector,
    filterDropdownSelector,
    setFilterDropdown,
} from './purchase-order.slice'
import { useAppDispatch } from 'store'
import { useNavigate } from 'react-router-dom'
import { ITabItem } from 'components/tab/tab.interface'
import {
    bulkUpdatePoStatus,
    getPoData,
    getPoFilterDropdownData,
} from 'repository/purchase-order.repository'
import {
    IPoFilterDropdown,
    IPurchaseOrder,
    IPurchaseOrderFilterBody,
    IPurchaseOrderStatusTotal,
    ISetFilter,
} from './purchase-order.interface'
import { userDataSelector } from 'pages/login/login.slice'
import { IUserAuth } from 'repository/data/user-auth.interface'
import { useModal } from 'components/modal/modal.service'
import useOverlay from 'components/overlay/overlay.service'
import PoFilter from './components/po-filter.component'
import PoFilterOverlay from './components/po-filter-overlay.component'

const usePurchaseOrder = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // selector
    const poData = useSelector(poDataSelector)
    const totalStatus = useSelector(poTotalStatus)
    const poDataMeta = useSelector(poMeta)
    const filter = useSelector(filterParamsSelector)
    const filterDropdown = useSelector(filterDropdownSelector)
    const filterBody = useSelector(filterBodySelector)
    const tabFilter = useSelector(tabStatusFilterSelector)
    const filterDropdownData = useSelector(filterDropdownOptionSelector)
    const user: IUserAuth = useSelector(userDataSelector)

    // variable
    const organization = user.organizationCode
    const { pageNumber, pageSize, search, status } = filter

    // state
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const [tabItems, setTabItems] = useState<ITabItem[]>()
    const [selectedPo, setSelectedPo] = useState<IPurchaseOrder[]>([])
    const [handlingLoadData, setHandlingLoadData] = useState<Boolean>(false)
    const [generateReportData, setGenerateReportData] = useState<
        IPurchaseOrder[]
    >([])
    const [filterTemporary, setFilterTemporary] =
        useState<IPoFilterDropdown>(filterDropdown)
    // state filter for generate report
    const [filterTemporary2, setFilterTemporary2] =
        useState<IPoFilterDropdown>(filterDropdown)

    // modal
    const poBulkStatusModalService = useModal()
    const poGenerateReportModalService = useModal()

    // overlay
    const filterOverlayService = useOverlay()

    // get option dropdown data
    useEffect(() => {
        getFilterDropdownData()
    }, [])

    // set filter when apply filter
    useEffect(() => {
        setFilterTemporary(filterDropdown)
        setFilterTemporary2(filterDropdown)
    }, [filterDropdown])

    useEffect(() => {
        loadData()
    }, [
        pageNumber,
        pageSize,
        search,
        status,
        tabFilter,
        handlingLoadData,
        filterBody,
    ])

    // useEffect - Put total status to tabItem
    useEffect(() => {
        generateTabItems(totalStatus)
    }, [totalStatus])

    // set data filter from tab
    const setTabFilter = async (data: ITabItem) => {
        const setStatus =
            data?.value === 'all'
                ? ['Open', 'In Progress', 'Canceled']
                : [data.value]
        dispatch(setSelectedStatus(data))
        dispatch(setPageNumber(1))
        dispatch(setFilterBody({ ...filterBody, statuses: setStatus }))
    }

    // set page
    const setPageData = (pageNumber: number) => {
        dispatch(setPageNumber(pageNumber))
    }

    // Get Data Function
    const loadData = async () => {
        try {
            setLoading(true)
            const actionResult = await getPoData(filter, filterBody)
            dispatch(setPoData(actionResult))
            setLoading(false)
        } catch (e) {
            setLoading(false)
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            setErrorMessage(errorMessage)
        }
    }

    //  bulk update data
    const bulkUpdateToOpen = async () => {
        const ids = selectedPo.map((x) => x.id)
        try {
            setLoading(true)
            await bulkUpdatePoStatus(ids)
            setSelectedPo([])
            setHandlingLoadData(!handlingLoadData)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            setErrorMessage(errorMessage)
        }
    }

    // generate tab Items
    const generateTabItems = (status: IPurchaseOrderStatusTotal) => {
        const tabItems: ITabItem[] = [
            {
                label: 'All Purchase Orders',
                key: 'status',
                totalData: status.all,
                value: 'all',
                colorClassname: 'bg-logistical-blue-ver1',
                textColorClassname: 'text-logistical-blue-ver5',
                lineColorClassname: 'bg-logistical-blue-ver5',
            },
            {
                label: 'Open',
                key: 'status',
                totalData: status.open,
                value: 'Open',
                colorClassname: 'bg-logistical-green-ver2',
                textColorClassname: 'text-logistical-green-dark-ver1',
                lineColorClassname: 'bg-logistical-green-dark-ver1',
            },
            {
                label: 'In Progress',
                key: 'status',
                totalData: status.inProgress,
                value: 'In Progress',
                colorClassname: 'bg-logistical-yellow-ver1',
                textColorClassname: 'text-logistical-yellow-dark-ver1',
                lineColorClassname: 'bg-logistical-yellow-dark-ver1',
            },
            {
                label: 'Canceled',
                key: 'status',
                totalData: status.canceled,
                value: 'Canceled',
                colorClassname: 'bg-logistical-red-light',
                textColorClassname: 'text-logistical-red-dark-ver1',
                lineColorClassname: 'bg-logistical-red-dark-ver1',
            },
            {
                label: 'Closed',
                key: 'status',
                totalData: status.closed,
                value: 'Closed',
                colorClassname: 'bg-logistical-gray-ver5',
                textColorClassname: 'text-logistical-gray-ver4',
                lineColorClassname: 'bg-logistical-gray-ver4',
            },
        ]

        setTabItems(tabItems)
    }

    // search po by po number
    const handleSearch = (values: string) => {
        if (values.length >= 3) {
            dispatch(setFilterBody({ ...filterBody, poNo: values }))
        } else if (values.length <= 0)
            dispatch(setFilterBody({ ...filterBody, poNo: '' }))
    }

    // get filter dropdown data
    const getFilterDropdownData = async () => {
        try {
            setLoading(true)
            const actionResult = await getPoFilterDropdownData()
            const { vendors, updatedsBy, fillStatuses } = actionResult.data

            // set action result
            const setVendor = vendors?.map((vendor) => ({
                value: vendor,
                label: vendor,
            }))
            const setUpdatedByUsers = updatedsBy?.map((updatedBy) => ({
                value: updatedBy,
                label: updatedBy,
            }))
            const setFillStatuses = fillStatuses?.map((fillStatus) => ({
                value: fillStatus,
                label: fillStatus,
            }))
            const setActionResult = {
                vendors: setVendor,
                updatedsBy: setUpdatedByUsers,
                fillStatuses: setFillStatuses,
            }
            dispatch(setFilterDropdownOptions(setActionResult))

            setLoading(false)
        } catch (e) {
            setLoading(false)
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            setErrorMessage(errorMessage)
        }
    }

    // appyFilter
    const applyFilter = () => {
        const setVendors = filterTemporary?.vendors?.map((x) => x.value) || []
        const setFillStatuses =
            filterTemporary?.fillStatuses?.map((x) => x.value) || []
        const setUpdatedByUsers =
            filterTemporary?.updatedByUsers?.map((x) => x.value) || []
        // set filter body for get data
        dispatch(
            setFilterBody({
                ...filterBody,
                vendors: setVendors as string[],
                fillStatuses: setFillStatuses as string[],
                updaters: setUpdatedByUsers as string[],
                poDateFrom: (filterDropdown?.range?.from as Date) || null,
                poDateTo: (filterDropdown?.range?.to as Date) || null,
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
                vendors: [],
                fillStatuses: [],
                updatedByUsers: [],
                range: {
                    from: '',
                    to: '',
                },
                poStatus: [],
            }),
        )
        const {
            vendors: bodyVendors,
            fillStatuses: bodyFillStatuses,
            updaters,
            poDateFrom,
            poDateTo,
        } = filterBody
        if (
            bodyVendors?.length ||
            bodyFillStatuses?.length ||
            updaters?.length ||
            poDateFrom ||
            poDateTo
        ) {
            // remove filter in payload for load data
            dispatch(
                setFilterBody({
                    ...filterBody,
                    vendors: [],
                    fillStatuses: [],
                    updaters: [],
                    poDateFrom: null,
                    poDateTo: null,
                }),
            )
        }
    }

    // reset filter in generate report
    const resetFilterGenerateReport = () => {
        setFilterTemporary2({
            vendors: [],
            fillStatuses: [],
            updatedByUsers: [],
            range: {
                from: '',
                to: '',
            },
            poStatus: [],
        })
    }

    // set remove range data
    const removeRangeDate = (
        setState: React.Dispatch<React.SetStateAction<IPoFilterDropdown>>,
    ) => {
        setState((e) => ({
            ...e,
            range: {
                from: '',
                to: '',
            },
        }))
    }

    // get data po for generate report
    const getDataGenerate = async () => {
        const setVendors = filterTemporary2?.vendors?.map((x) => x.value)
        const setFillStatuses = filterTemporary2?.fillStatuses?.map(
            (x) => x.value,
        )
        const setUpdatedByUsers = filterTemporary2?.updatedByUsers?.map(
            (x) => x.value,
        )
        const setPoStatus = filterTemporary2?.poStatus?.map((x) => x.value)

        const filterBodyPaylaod = {
            vendors: setVendors,
            fillStatuses: setFillStatuses,
            updaters: setUpdatedByUsers,
            statuses: setPoStatus.length
                ? setPoStatus
                : ['Open', 'In Progress', 'Canceled', 'Closed'],
            poDateFrom: (filterDropdown?.range?.from as Date) || null,
            poDateTo: (filterDropdown?.range?.to as Date) || null,
        } as IPurchaseOrderFilterBody

        try {
            const actionResult = await getPoData(filter, filterBodyPaylaod)
            setGenerateReportData(actionResult.data)
            return actionResult.data
        } catch (e) {
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            setErrorMessage(errorMessage)
        }
    }

    // handle change filter
    const handleChangeFilter = ({
        vendors,
        fillStatuses,
        updatedByUsers,
        range,
        poStatus,
        setState,
    }: ISetFilter) => {
        if (!setState) return
        if (vendors) setState((e: any) => ({ ...e, vendors }))
        if (fillStatuses) setState((e: any) => ({ ...e, fillStatuses }))
        if (updatedByUsers) setState((e: any) => ({ ...e, updatedByUsers }))
        if (range) setState((e: any) => ({ ...e, range }))
        if (poStatus) setState((e: any) => ({ ...e, poStatus }))
    }

    // remove filter generate report
    const removeTemporyFilter2 = () => {
        setFilterTemporary2(filterDropdown)
    }

    // all variable for components
    const componentFilter = (
        <PoFilter
            isGenerateReport={true}
            filterDropdownData={filterDropdownData}
            filterDropdown={filterDropdown}
            removeRangeDate={removeRangeDate}
            handleChangeFilter={handleChangeFilter}
            filterTemporary={filterTemporary2}
            setState={setFilterTemporary2}
        />
    )
    const componentPoFilterOverlay = (
        <PoFilterOverlay
            filterOverlayService={filterOverlayService}
            componentFilter={
                <PoFilter
                    filterDropdownData={filterDropdownData}
                    filterDropdown={filterDropdown}
                    removeRangeDate={removeRangeDate}
                    handleChangeFilter={handleChangeFilter}
                    filterTemporary={filterTemporary}
                    setState={setFilterTemporary}
                />
            }
            removeTemporyFilter={() => setFilterTemporary(filterDropdown)}
            resetFilter={resetFilter}
            applyFilter={applyFilter}
        />
    )

    return {
        setSelectedPo,
        bulkUpdateToOpen,
        setTabFilter,
        setPageData,
        navigate,
        getDataGenerate,
        handleSearch,
        resetFilterGenerateReport,
        removeTemporyFilter2,
        componentPoFilterOverlay,
        componentFilter,
        generateReportData,
        filterOverlayService,
        poData,
        tabItems,
        poDataMeta,
        organization,
        tabFilter,
        loading,
        selectedPo,
        poBulkStatusModalService,
        poGenerateReportModalService,
    }
}

export default usePurchaseOrder
