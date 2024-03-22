import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserData } from 'repository/user.repository'
import { useAppDispatch } from 'store'
import { userDataSelector as sessionSelector } from 'pages/login/login.slice'
import {
    filterSelector,
    setFilterSearchUser,
    setPageNumber,
    setSelectedStatus,
    setTabItems,
    setUserData,
    tabItemsSelector,
    tabStatusFilterSelector,
    userDataSelector,
    userMeta,
} from './user-access.slice'
import { useSelector } from 'react-redux'
import { IUserAccessFilter } from './user-access.interface'
import { ITabItem } from 'components/tab/tab.interface'
import { IAdditionals } from 'common/common.interface'
import { IUserAuth } from 'repository/data/user-auth.interface'
import { Toast } from 'components/toast/toast.component'

const useUserAccess = () => {
    // initial
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const session: IUserAuth = useSelector(sessionSelector)
    const userData = useSelector(userDataSelector)
    const userDataMeta = useSelector(userMeta)
    const filter = useSelector(filterSelector)
    const tabFilter = useSelector(tabStatusFilterSelector)
    const tabItems = useSelector(tabItemsSelector)
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const { pageNumber, pageSize, search, status } = filter

    // reject if session is regular user --temporary
    useEffect(() => {
        if (
            !['Admin', 'Super'].includes(session.role) ||
            session.organizationCode === 'pan'
        ) {
            navigate('/restricted')
        }
    }, [session])

    // useEffect when filter applied
    useEffect(() => {
        loadData()
    }, [pageNumber, pageSize, search, status, tabFilter])

    // set data filter from tab
    const setTabFilter = (data: ITabItem) => {
        dispatch(setSelectedStatus(data))
        dispatch(setPageNumber(1))
    }

    // set page
    const setPageData = (pageNumber: number) => {
        dispatch(setPageNumber(pageNumber))
    }

    // Get Data Function
    const loadData = async () => {
        // add status from selector
        const status = tabFilter.value
        const searchString = search

        let tmpFilter: IUserAccessFilter = filter
        if (searchString) {
            tmpFilter = {
                pageNumber: 1,
                pageSize: 50,
                search: searchString,
                status,
            }
        } else {
            tmpFilter = { ...filter, status }
        }

        // search
        try {
            setLoading(true)
            try {
                const actionResult = await getUserData(tmpFilter)
                dispatch(setUserData(actionResult))

                //set additional data (status count)
                console.log(search)
                if (tabFilter.value === '') {
                    generateTabItems(actionResult.additionals)
                } else {
                    const actionResult2 = await getUserData({
                        search: searchString,
                    })
                    generateTabItems(actionResult2.additionals)
                }
            } catch (e) {
                Toast({
                    header: 'Failed!',
                    message: 'Failed to get user data',
                    type: 'error',
                })
            }
            setLoading(false)
        } catch (e) {
            setLoading(false)
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            setErrorMessage(errorMessage)
        }
    }

    // generate tab Items
    const generateTabItems = (status: IAdditionals) => {
        //temorary because diffrent return from backend
        const dt: any = status
        const dtx = (dt.stats ? dt : status) as {
            status: string
            count: number
        }[]

        const tabs: ITabItem[] = [
            {
                label: 'All Users',
                key: 'status',
                value: '',
                totalData:
                    dtx.find((data) => data.status === 'All')?.count ?? 0,
                colorClassname: 'bg-logistical-blue-ver1',
                textColorClassname: 'text-logistical-blue-ver5',
                lineColorClassname: 'bg-logistical-blue-ver5',
            },
            {
                label: 'Active',
                key: 'status',
                value: 'Active',
                totalData:
                    dtx.find((data) => data.status === 'Active')?.count ?? 0,
                colorClassname: 'bg-logistical-green-ver2',
                textColorClassname: 'text-logistical-green-dark-ver1',
                lineColorClassname: 'bg-logistical-green-dark-ver1',
            },
            {
                label: 'Suspended',
                key: 'status',
                value: 'Suspended',
                totalData:
                    dtx.find((data) => data.status === 'Suspended')?.count ?? 0,
                colorClassname: 'bg-logistical-red-light',
                textColorClassname: 'text-logistical-red-dark-ver1',
                lineColorClassname: 'bg-logistical-red-dark-ver1',
            },
        ]

        dispatch(setTabItems(tabs))
    }

    const setSearch = (values: string) => {
        dispatch(setFilterSearchUser(values))
    }

    return {
        navigate,
        setLoading,
        setErrorMessage,
        setTabFilter,
        setPageData,
        loadData,
        session,
        loading,
        errorMessage,
        userData,
        tabFilter,
        userDataMeta,
        tabItems,
        setSearch,
    }
}

export default useUserAccess
