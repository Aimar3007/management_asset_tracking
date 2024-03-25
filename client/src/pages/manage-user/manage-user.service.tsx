import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'store'
import {
    MUDataSelector,
    MUMetaSelector,
    filterSelector,
    payloadSelector,
    setData,
    setFilter,
    setPageNumber,
    setPayload,
} from './manage-user.slice'
import { IMUFileterOptions, IUMFilter } from './manage-user.interface'
import { useFormik } from 'formik'
import { IUserPayload } from 'repository/interface/user.interface'
import {
    createUser,
    getAllUser,
    getDMUfilter,
} from 'repository/user.repository'
import AddUserModal from './components/add-user-modal.component'
import { useModal } from 'components/modal/modal.service'
import {
    IFUser,
    createUserInitial,
    createUserValidation,
} from 'validations/user.validation'
import { Toast } from 'components/toast/toast.component'

const useManageUser = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // selector
    const filter = useSelector(filterSelector)
    const payload = useSelector(payloadSelector)
    const MUData = useSelector(MUDataSelector)
    const MUMeta = useSelector(MUMetaSelector)

    // state
    const [loading, setLoading] = useState<boolean>(false)
    const [filterOptions, setFilterOptions] = useState<IMUFileterOptions>()
    const [selectedRole, setSelectedRole] = useState<string | null>(null)
    const [handlingLoadData, setHandlingLoadData] = useState<boolean>(false)

    // modal
    const AMUMService = useModal()

    const formik = useFormik<{ searchTerm: string }>({
        initialValues: { searchTerm: '' },
        onSubmit: (value) => {
            if (value?.searchTerm.length >= 3) {
                dispatch(setPayload({ ...payload, userName: value.searchTerm }))
            } else if (value.searchTerm.length <= 0)
                dispatch(setPayload({ ...payload, userName: '' }))
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

    const createUserFormik = useFormik<IFUser>({
        validationSchema: createUserValidation,
        initialValues: createUserInitial,
        onSubmit: (values) => {
            submit({ data: values })
            AMUMService.closeModalHandling()
        },
    })

    useEffect(() => {
        loadData()
    }, [payload, handlingLoadData])

    useEffect(() => {
        loadFilterOptions()
    }, [])

    const setValueFilter = (data: IUMFilter) => {
        dispatch(setFilter(data))
        const setData = {
            city: data?.city?.value,
            deletedAt: data?.status?.value,
        } as IUserPayload
        dispatch(setPayload({ ...payload, ...setData }))
    }

    const loadData = async () => {
        try {
            setLoading(true)
            const actionResult = await getAllUser(payload)
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
            const getDropdownOptions = await getDMUfilter()

            const { user, city } = getDropdownOptions.data

            const setData = {
                city: city?.map((x) => ({ label: x.city, value: x.city })),
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

    const submit = async ({ data }: { data: IFUser }) => {
        try {
            await createUser(data)
            Toast({
                header: 'Sucess',
                message: `Success create user`,
                type: 'success',
            })
            setHandlingLoadData(!handlingLoadData)
        } catch (e: any) {
            console.log(e)
            const errorMessage = e.message
            Toast({
                header: 'Failed Create Aser',
                message: errorMessage,
                type: 'error',
            })
        }
    }

    const allModal = (
        <>
            <AddUserModal
                modalService={AMUMService}
                formik={createUserFormik}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
            />
        </>
    )

    return {
        filter,
        formik,
        loading,
        filterOptions,
        MUData,
        MUMeta,
        allModal,
        AMUMService,
        setValueFilter,
        setPageData,
        navigate,
    }
}

export default useManageUser
