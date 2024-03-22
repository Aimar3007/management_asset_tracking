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
import { IDropdownItem } from 'components/dropdown/dropdown.interface'
import { useEffect, useState } from 'react'
import { getAssetsData } from 'repository/asset-management.repository'
import { IAssetManagement } from 'repository/interface/asset-management-data.interface'
import { useNavigate } from 'react-router-dom'
import { IResponseData } from 'common/common.interface'

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
    }, [])

    const setValuFilter = ({
        brand,
        name,
        user,
    }: {
        brand?: IDropdownItem
        name?: IDropdownItem
        user?: IDropdownItem
    }) => {
        if (brand) {
            dispatch(setFilter({ ...filter, brand }))
            dispatch(setPayload({ ...payload, brand: brand?.value as string }))
        }
        if (name) {
            dispatch(setFilter({ ...filter, name }))
            dispatch(setPayload({ ...payload, name: name?.value as string }))
        }
        if (user) {
            dispatch(setFilter({ ...filter, user }))
            dispatch(setPayload({ ...payload, userId: user?.value as number }))
        }
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

    const setPageData = (pageNumber: number) => {
        dispatch(setPageNumber(pageNumber))
    }

    return {
        filter,
        formik,
        loading,
        AMData,
        AMMeta,
        setValuFilter,
        setPageData,
        navigate,
    }
}

export default useAssetManagement
