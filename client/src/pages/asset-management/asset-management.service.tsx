import { useSelector } from 'react-redux'
import {
    filterSelector,
    payloadSelector,
    setData,
    setFilter,
    setPayload,
} from './asset-management.slice'
import { useFormik } from 'formik'
import { useAppDispatch } from 'store'
import { IDropdownItem } from 'components/dropdown/dropdown.interface'
import { useState } from 'react'
import { getAssetsData } from 'repository/asset-management.repository'

const useAssetManagement = () => {
    const dispatch = useAppDispatch()

    // selector
    const filter = useSelector(filterSelector)
    const payload = useSelector(payloadSelector)

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

    // const loadData = async () => {
    //     try {
    //         setLoading(true)
    //         const actionResult = await getAssetsData(payload)
    //         dispatch(setData(actionResult))
    //         setLoading(false)
    //     } catch (e) {
    //         setLoading(false)
    //         const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
    //         console.log(errorMessage)
    //     }
    // }

    return { filter, formik, loading, setValuFilter }
}

export default useAssetManagement
