import { useSelector } from 'react-redux'
import {
    AMMetaSelector,
    assetManagementDataSelector,
    filterSelector,
    payloadSelector,
    setData,
    setFilter,
    setPageNumber,
    setPayload,
} from './asset-management.slice'
import { useFormik } from 'formik'
import { useAppDispatch } from 'store'
import { useEffect, useState } from 'react'
import {
    getAssetsData,
    getDAMfilter,
} from 'repository/asset-management.repository'
import {
    IAssetManagement,
    IAssetManagementPayload,
    IDAMFilter,
} from 'repository/interface/asset-management-data.interface'
import { useNavigate } from 'react-router-dom'
import { IResponseData } from 'common/common.interface'
import {
    IAMFileterOptions,
    IAssetManagementFilter,
} from './asset-management.interface'

const useAssetManagement = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // selector
    const filter = useSelector(filterSelector)
    const payload = useSelector(payloadSelector)
    const AMData = useSelector(assetManagementDataSelector)
    const AMMeta = useSelector(AMMetaSelector)

    // state
    const [loading, setLoading] = useState<boolean>(false)
    const [filterOptions, setFilterOptions] = useState<IAMFileterOptions>()

    const formik = useFormik<{ searchTerm: string }>({
        initialValues: { searchTerm: '' },
        onSubmit: (value) => {
            if (value?.searchTerm.length >= 3) {
                dispatch(
                    setPayload({ ...payload, description: value.searchTerm }),
                )
            } else if (value.searchTerm.length <= 0)
                dispatch(setPayload({ ...payload, description: '' }))
        },
        validate: (values) => {
            const errors: any = {}
            if (
                values.searchTerm.length < 3 &&
                values.searchTerm.length !== 0
            ) {
                errors.searchTerm = 'Search term must be at least 3 characters'
            }
            return errors
        },
    })

    useEffect(() => {
        loadData()
    }, [payload])

    useEffect(() => {
        loadFilterOptions()
    }, [])

    const setValueFilter = (data: IAssetManagementFilter) => {
        dispatch(setFilter(data))
        const setData = {
            userId: data?.user?.value,
            brand: data?.brand?.value,
            name: data?.name?.value,
        }
        dispatch(
            setPayload({ ...payload, ...(setData as IAssetManagementPayload) }),
        )
    }

    const loadData = async () => {
        try {
            setLoading(true)
            const actionResult = (await getAssetsData(
                payload,
            )) as IResponseData<IAssetManagement[]>
            dispatch(setData(actionResult))
            setLoading(false)
        } catch (e) {
            setLoading(false)
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            console.log(errorMessage)
        }
    }

    const loadFilterOptions = async () => {
        try {
            const getDropdownOptions =
                (await getDAMfilter()) as IResponseData<IDAMFilter>

            const { brand, name, user } = getDropdownOptions.data

            const setData = {
                brands: brand?.map((x) => ({ label: x.brand, value: x.brand })),
                names: name?.map((x) => ({ label: x.name, value: x.name })),
                users: user?.map((x) => ({ label: x.userName, value: x.id })),
            }

            setFilterOptions(setData)
        } catch (e) {
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            console.log(errorMessage)
        }
    }

    const setPageData = (pageNumber: number) => {
        dispatch(setPageNumber(pageNumber))
    }

    return {
        filter,
        formik,
        loading,
        AMData,
        AMMeta,
        filterOptions,
        setValueFilter,
        setPageData,
        navigate,
    }
}

export default useAssetManagement
