import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    roleModuleSelector,
    roleSelector,
    setDetailUser,
    setRole,
    userDetailSelector,
} from '../user-access.slice'
import { getRole, getRoleModule } from 'repository/role.repository'
import { useAppSelector } from 'store'
import { IDropdownItem } from 'components/dropdown/dropdown.interface'
import { IRole } from 'repository/data/role.interface'
import { IRoleModule } from 'repository/data/role-module.interface'
import { useModal } from 'components/modal/modal.service'
import { getModuleParentId } from 'common/common.service'
import { IOrganization } from './user-access-form.interface'
import {
    IFRole,
    IFUser,
    createUserInitial,
    createUserValidation,
} from 'form-validation/user.validation'
import { getCountry, getOrganization } from 'repository/common.repository'
import {
    changePassword,
    createUser,
    getUserDetail,
    updateUser,
} from 'repository/user.repository'
import { ToastService } from 'components/toast/toast.interface'
import { useNavigate, useParams } from 'react-router-dom'
import { IResponseData } from 'common/common.interface'
import { Toast } from 'components/toast/toast.component'
import { IUserAuth } from 'repository/data/user-auth.interface'
import { userDataSelector as sessionSelector } from 'pages/login/login.slice'
import { useSelector } from 'react-redux'
import { IUserDetail } from 'repository/data/user.interface'
import { useFormik } from 'formik'
import {
    IChangePasswordValidation,
    changePasswordValidation,
} from 'form-validation/change-password.validation'

export interface IUseUserAccessForm {
    isNew: boolean
    isProfilePage: boolean
}
export const useUserAccessForm = ({
    isNew,
    isProfilePage = false,
}: IUseUserAccessForm) => {
    //  Initial, State, and Selector -----------------------------------------------------
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const session: IUserAuth = useSelector(sessionSelector)
    const id = isProfilePage ? session.id : params?.id
    const [isLoadDetailUser, setIsLoadDetail] = useState(isNew ? false : true) // when new then load detail user
    const [firstTimeRoleChanged, setFirstTimeRoleChanged] = useState(true)
    const [isLoadRole, setIsLoadRole] = useState(true)
    const [toastService, setIsToastService] = useState<ToastService>({
        show: false,
        toast: {
            header: '',
            message: '',
            type: 'error',
        },
    })
    const [selectedRole, setSelectedRole] = useState<string | null>(null)
    const [selectedOrganization, setSelectedOrganization] = useState<
        string | null
    >(null)
    const [isLoadRoleModule, setIsLoadRoleModule] = useState(true)
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const [roleDataDropdown, setRoleDataDropdown] = useState<
        IDropdownItem<IRole>[]
    >([])
    const [roleDataSelected, setRoleDataSelected] = useState<IRole | null>(null)
    const [organizationSelected, setOrganizationSelected] =
        useState<IDropdownItem<IOrganization> | null>(null)
    const [modalSelectedPhase1, setModalSelectedPhase1] = useState<
        number | null
    >(null)
    const [modalSelectedPhase2, setModalSelectedPhase2] = useState<
        number | null
    >(null)
    const [moduleAdjustmentList, setModuleAdjustmentList] = useState<
        IRoleModule[]
    >([])
    const [organization, setOrganization] = useState<
        IDropdownItem<IOrganization>[]
    >([
        { label: 'jpl - PT. Januardi Putera Logistik ', value: 'jpl' },
        { label: 'pan - PT. Pan Brothers Tbk', value: 'pan' },
    ])
    const [gender, setGender] = useState<IDropdownItem[]>([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
    ])
    const userDetailData = useAppSelector(userDetailSelector)
    const roleData = useAppSelector(roleSelector)
    const roleModuleData = useAppSelector(roleModuleSelector)
    const modalService = useModal()
    const moduleParentId = getModuleParentId()
    const formikModule = useFormik<IFUser>({
        validationSchema: createUserValidation,
        initialValues: createUserInitial,
        onSubmit: (values) => {
            if (isProfilePage) return
            submit({ data: values })
        },
    })
    const changePwdValidation = changePasswordValidation()
    const formikChangePassword = useFormik<IChangePasswordValidation>({
        validationSchema: changePwdValidation.changePasswordSchema,
        initialValues: changePwdValidation.changePasswordInitial,
        onSubmit: (values, helper) => {
            if (values.newPassword !== values.newPasswordConfirmation) {
                helper.setFieldError(
                    'newPasswordConfirmation',
                    'password confirmation not match',
                )
                return
            }
            submitChangePassword(values)
        },
    })

    // Use Effect ----------------------------------------------------------------------
    // reject if session is regular user --temporary
    useEffect(() => {
        if (
            !['Admin', 'Super'].includes(session.role) ||
            session.organizationCode === 'pan'
        ) {
            if (!isProfilePage) {
                navigate('/restricted')
            }
        }
    }, [session])

    useEffect(() => {
        // temporary because it's empty
        getOrganization()
        getCountry()
        loadRoleData()
    }, [])

    useEffect(() => {
        if (roleData.length === 0) {
            return
        }

        const dropdownItem = roleData.map((data) => {
            return {
                label: data.roleDescription,
                value: data.role,
                additionalData: data,
            } as IDropdownItem<IRole>
        })
        setRoleDataDropdown(dropdownItem)
    }, [roleData])

    useEffect(() => {
        if (selectedRole === null) {
            return
        }
        if (!isNew && firstTimeRoleChanged) {
            setFirstTimeRoleChanged(false)
            return
        }
        loadRoleModule({ uuid: selectedRole, isFirstLoad: false })
    }, [selectedRole])

    const toggleModuleAdjustment = (id: string) => {
        const newModuleAdjustment = moduleAdjustmentList.map((data) => {
            if (id === data.id) {
                return { ...data, selected: !data?.selected }
            }
            return data
        })
        setModuleAdjustmentList(newModuleAdjustment)
    }

    useEffect(() => {
        if (!isNew && isLoadDetailUser) {
            loadUserDetail()
        } else {
            // clear data if its new
            if (isNew) {
                console.log('clear')
                formikModule.setValues(createUserInitial)
            }
        }
    }, [])

    useEffect(() => {
        if (userDetailData) {
            if (
                session.role !== 'Admin' &&
                ['Admin', 'Super'].includes(userDetailData.role)
            ) {
                if (!isProfilePage) {
                    navigate('/restricted')
                }
                return
            }

            setSelectedRole(userDetailData.role)
            loadRoleData()
            loadRoleModule({ isFirstLoad: true })
            setFormikDataValue()
        }
    }, [userDetailData])

    // Function & stuff ----------------------------------------------------------------------
    const setFormikDataValue = () => {
        // set data value if update user
        if (!userDetailData) return
        const data: IUserDetail = userDetailData
        const userValues: IFUser = {
            address: data.address,
            city: data.city ?? '',
            country: data.country ?? '',
            fullName: data.fullName ?? '',
            organization: data.organization,
            organizationLabel: organization.find(
                (dt) => dt.value === data.organization,
            )?.label as string,
            portalLogin: data.portalLogin,
            password: 'noPassword',
            portalEmail: data.email,
            roleDropdown: data.role,
            jobTitle: data.jobTittle,
            jobCategory: 'STAFF',
            accountNo: data.accountNo,
            bankName: data.bankName,
            dateOfBirth: data.dateOfBirth ?? '',
            emergencyContactName: data.emergencyContactName ?? '',
            emergencyHomePhone: data.emergencyHomePhone ?? '',
            homePhone: data.homePhone ?? '',
            mobilePhone: data.mobilePhone ?? '',
            workPhone: data.workPhone ?? '',
            gender: (data.gender ?? undefined) as IFUser['gender'],
        }
        formikModule.setValues(userValues)
    }
    const loadUserDetail = async () => {
        if (!id) {
            Toast({
                header: 'Oops',
                message: 'User not found',
                type: 'warning',
            })
            navigate('/user')
            return
        }

        try {
            const actionResult: IResponseData<IUserDetail> =
                await getUserDetail(id)
            dispatch(setDetailUser(actionResult))
            setIsLoadDetail(false)
        } catch (e) {
            setIsLoadDetail(false)
            const errorMessage = typeof e !== 'string' ? 'Data Not Found' : e
            Toast({
                header: 'Failed Get Detail User',
                message: errorMessage,
                type: 'error',
            })
            setTimeout(() => {
                navigate('/user')
            }, 400)
        }
    }

    const loadRoleData = async () => {
        if (isProfilePage) {
            return
        }
        try {
            setIsLoadRole(true)
            const actionResult = await getRole()
            if (actionResult.isSuccess) {
                dispatch(setRole(actionResult))
            } else {
                Toast({
                    header: 'Error',
                    message: 'Failed get Role options',
                    type: 'error',
                })
            }
            setIsLoadRole(false)
        } catch (e) {
            setIsLoadRole(false)
            console.log(e)
        }
    }

    const loadRoleModule = async ({
        isFirstLoad = false,
        uuid,
    }: {
        isFirstLoad: boolean
        uuid?: string
    }) => {
        // first time load the module
        try {
            setIsLoadRoleModule(true)
            let allModuleList: IRoleModule[]

            if (!isFirstLoad && uuid) {
                const actionResult = await getRoleModule(uuid)
                allModuleList = actionResult.data
            } else {
                allModuleList = userDetailData?.moduleAccessList
                    ? [...userDetailData.moduleAccessList]
                    : []
            }

            // after get all module from API, now compare with the routes in FE
            // some FE module have accessed by other client
            let newModuleList: IRoleModule[] = []
            allModuleList.forEach((dt) => {
                if (moduleParentId.includes(dt.parentId)) {
                    newModuleList.push(dt)
                }
            })

            // reshapping Module list -> make category for module & sub module
            let moduleList: IRoleModule[] = []
            newModuleList.forEach((data) => {
                // get all parent
                if (!data.parentId.includes('.') || !data.parentId) {
                    const dtt = allAccessAndIsEnabled(data)
                    moduleList.push(dtt)
                }
            })

            newModuleList.forEach((data) => {
                // get all sub
                let currentParent = ''
                if (data.parentId.includes('.')) {
                    const dtt = allAccessAndIsEnabled(data)
                    if (currentParent !== dtt.parentId) {
                        currentParent = dtt.parentId.split('.')[0]
                    }

                    //is parent exists, if not then dont put on sub

                    const index = newModuleList
                        .map((i) => i.parentId)
                        .indexOf(currentParent)
                    if (index === -1) {
                        moduleList.push(dtt)
                    } else {
                        const subs = moduleList[index].sub ?? []
                        moduleList[index].sub = [...subs, dtt]
                    }
                }
            })
            moduleList.sort(
                (a, b) => parseInt(a.parentId) - parseInt(b.parentId),
            )
            setModuleAdjustmentList(moduleList)
            setIsLoadRoleModule(false)
        } catch (e) {
            setIsLoadRoleModule(false)
            console.log(e)
        }
    }

    const allAccessAndIsEnabled = (currentModule: IRoleModule) => {
        // check all access, related with all access
        let isAllAccessGranted = true
        let countGrantedAccess = 0
        let tempCurrentModule: IRoleModule = { ...currentModule }
        tempCurrentModule.actionList.map((data) => {
            if (data.status !== true) {
                isAllAccessGranted = false
            } else {
                countGrantedAccess++
            }
            return data
        })
        tempCurrentModule.selectAllAction = isAllAccessGranted
        // end check all access

        // set ENABLE/DISABLE MODULE if more than 0 selected -> enabled, otherwise -> disable
        if (countGrantedAccess > 0) {
            tempCurrentModule.status = true
        } else {
            tempCurrentModule.status = false
        }
        // end set ENABLE/Disable

        return tempCurrentModule
    }

    const setAccess = (indexAction: number): void => {
        if (modalSelectedPhase1 === null) return
        const allModule = [...moduleAdjustmentList]
        let currentModule = allModule[modalSelectedPhase1]
        if (modalSelectedPhase2 !== null && currentModule.sub) {
            currentModule = currentModule.sub[modalSelectedPhase2]
        }

        let currentStatus = currentModule.actionList[indexAction].status
        currentModule.actionList[indexAction].status = !currentStatus

        // check all access, related with all access
        let isAllAccessGranted = true
        let countGrantedAccess = 0
        currentModule.actionList.map((data) => {
            if (data.status !== true) {
                isAllAccessGranted = false
            } else {
                countGrantedAccess++
            }
            return data
        })
        currentModule.selectAllAction = isAllAccessGranted
        // end check all access

        // set ENABLE/DISABLE MODULE if more than 0 selected -> enabled, otherwise -> disable
        if (countGrantedAccess > 0) {
            currentModule.status = true
        } else {
            currentModule.status = false
        }
        // end set ENABLE/Disable

        setModuleAdjustmentList(allModule)
    }

    const setAllAccess = ({ index }: { index?: number }) => {
        if (modalSelectedPhase1 === null) return

        let usedIndex = modalSelectedPhase1
        if (index) usedIndex = index
        let allModule = [...moduleAdjustmentList]
        let currentModule = allModule[usedIndex]
        if (modalSelectedPhase2 !== null && currentModule.sub) {
            currentModule = currentModule.sub[modalSelectedPhase2]
        }

        let currentStatus = currentModule.selectAllAction
        currentModule.selectAllAction = !currentStatus
        currentModule.actionList = currentModule.actionList.map((data) => {
            return { ...data, status: !currentStatus }
        })

        // check all access, related with all access
        let isAllAccessGranted = true
        let countGrantedAccess = 0
        currentModule.actionList.map((data) => {
            if (data.status !== true) {
                isAllAccessGranted = false
            } else {
                countGrantedAccess++
            }
            return data
        })
        currentModule.selectAllAction = isAllAccessGranted
        // end check all access

        // set ENABLE/DISABLE MODULE if more than 0 selected -> enabled, otherwise -> disable
        if (countGrantedAccess > 0) {
            currentModule.status = true
        } else {
            currentModule.status = false
        }
        // end set ENABLE/Disable

        setModuleAdjustmentList(allModule)
    }

    const submit = async ({ data }: { data: IFUser }) => {
        // reshaping module access
        let extractedModule: IRoleModule[] = []
        setIsSubmit(true)
        moduleAdjustmentList.forEach((dt) => {
            let tempSub: IRoleModule[] = []
            if (dt.sub) {
                extractedModule.push({ ...dt, sub: [] })
                tempSub = [...dt.sub]
                tempSub.forEach((x) => {
                    extractedModule.push(x)
                })
            } else {
                extractedModule.push(dt)
            }
        })

        // rehaping role
        let rolePayload: IFRole = {
            moduleAccessList: extractedModule,
            userAccess: roleDataSelected ? [roleDataSelected] : [],
            roleType: roleDataSelected?.role ?? '',
            roleDescription: roleDataSelected?.roleDescription ?? '',
        }

        // end of payload
        let payload: IFUser = { role: rolePayload, ...data }

        let submitApi: IResponseData<any>
        let action = ''
        if (isNew) {
            action = 'create'
            submitApi = await createUser(payload)
        } else {
            action = 'update'
            // eslint-disable-next-line no-unused-vars
            const { password, ...newPayload } = payload
            submitApi = await updateUser(userDetailData?.id ?? '', newPayload)
        }
        if (submitApi.isSuccess) {
            Toast({
                header: 'Success!',
                message: 'success ' + action + ' user',
                type: 'success',
            })

            setTimeout(() => {
                navigate('/user')
            }, 100)
            setIsSubmit(false)
        } else {
            Toast({
                header: 'Failed!',
                message: 'failed ' + action + ' user',
                type: 'error',
            })
            setIsSubmit(false)
        }
    }

    const submitChangePassword = async (data: IChangePasswordValidation) => {
        setIsSubmit(true)
        const execute = await changePassword(data)
        if (execute === 'success') {
            formikChangePassword.setValues(
                changePwdValidation.changePasswordInitial,
            )
            formikChangePassword.resetForm()
        }
        setIsSubmit(false)
    }

    // Return ----------------------------------------------------------------------

    return {
        moduleAdjustmentList,
        selectedRole,
        isLoadRole,
        isLoadRoleModule,
        roleData,
        roleDataDropdown,
        roleModuleData,
        modalService,
        modalSelectedPhase1,
        modalSelectedPhase2,
        organization,
        organizationSelected,
        gender,
        toastService,
        isLoadDetailUser,
        isSubmit,
        formikModule,
        userDetailData,
        formikChangePassword,
        selectedOrganization,
        navigate,
        setSelectedRole,
        setIsToastService,
        toggleModuleAdjustment,
        setRoleDataSelected,
        setModalSelectedPhase1,
        setModalSelectedPhase2,
        setAccess,
        setAllAccess,
        submit,
        setOrganization,
        setOrganizationSelected,
        setGender,
        setSelectedOrganization,
    }
}
