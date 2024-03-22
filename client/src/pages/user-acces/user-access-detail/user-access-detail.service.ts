import { IDropdownItem } from 'components/dropdown/dropdown.interface'
import { Toast } from 'components/toast/toast.component'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IRole } from 'repository/data/role.interface'
import {
    getUserDetail,
    suspendUser,
    unSuspendUser,
    updateModuleUser,
} from 'repository/user.repository'
import { useAppDispatch, useAppSelector } from 'store'
import {
    roleModuleSelector,
    roleSelector,
    setDetailUser,
    userDetailSelector,
} from '../user-access.slice'
import { getRoleModule } from 'repository/role.repository'
import { useModal } from 'components/modal/modal.service'
import { getModuleParentId } from 'common/common.service'
import { IRoleModule } from 'repository/data/role-module.interface'
import { IOrganization } from '../user-access-form/user-access-form.interface'
import { useFormik } from 'formik'
import { IFRoleModule } from 'form-validation/role-module.validation'
import { useSelector } from 'react-redux'
import { IUserAuth } from 'repository/data/user-auth.interface'
import { userDataSelector as sessionSelector } from 'pages/login/login.slice'

const useUserAccessDetail = () => {
    // initial
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const formikModule = useFormik<IFRoleModule>({
        initialValues: {
            roleType: '',
            moduleAccessList: [],
        },
        onSubmit: (values) => {
            const payload: IFRoleModule = {
                ...values,
                moduleAccessList: moduleAdjustmentList,
            }
            updateRoleModule(payload)
        },
    })
    const [loadingDetailData, setLoadingDetailData] = useState(true)
    const [roleDataDropdown, setRoleDataDropdown] = useState<
        IDropdownItem<IRole>[]
    >([])
    const [roleDataSelected, setRoleDataSelected] = useState<IRole | null>(null)
    const [isLoadRoleModule, setIsLoadRoleModule] = useState(true)
    const [moduleAdjustmentList, setModuleAdjustmentList] = useState<
        IRoleModule[]
    >([])
    const [isLoadRole, setIsLoadRole] = useState(true)
    const [selectedRole, setSelectedRole] = useState<string | null>(null)
    const [modalSelectedPhase1, setModalSelectedPhase1] = useState<
        number | null
    >(null)
    const [modalSelectedPhase2, setModalSelectedPhase2] = useState<
        number | null
    >(null)
    const [organization, setOrganization] = useState<
        IDropdownItem<IOrganization>[]
    >([
        { label: 'PT. Januardi Putera Logistik ', value: 'jpl' },
        { label: 'PT. Pan Brothers Tbk', value: 'pan' },
    ])
    const session: IUserAuth = useSelector(sessionSelector)
    const userDetailData = useAppSelector(userDetailSelector)
    const roleData = useAppSelector(roleSelector)
    const roleModuleData = useAppSelector(roleModuleSelector)
    const modalService = useModal()
    const moduleParentId = getModuleParentId()
    const modalConfirmationService = useModal()

    // reject if session is regular user --temporary
    useEffect(() => {
        if (
            !['Admin', 'Super'].includes(session.role) ||
            session.organizationCode === 'pan'
        ) {
            navigate('/restricted')
        }
    }, [session])

    // Related Function ------------------------------------------
    const loadDetailData = async () => {
        if (!id || id === '') {
            Toast({
                header: 'Failed Get Detail User',
                message: 'UUID is required',
                type: 'error',
            })
            setTimeout(() => {
                navigate('/user')
            }, 100)
            return
        }

        try {
            setLoadingDetailData(true)
            const actionResult = await getUserDetail(id)
            dispatch(setDetailUser(actionResult))
            setLoadingDetailData(false)
        } catch (e) {
            setLoadingDetailData(false)
            const errorMessage = typeof e !== 'string' ? 'Data Not Found' : e
            Toast({
                header: 'Failed Get Detail User',
                message: errorMessage,
                type: 'error',
            })
            setTimeout(() => {
                navigate('/user')
            }, 100)
        }
    }
    const loadRoleData = async () => {
        try {
            setIsLoadRole(true)
            // const actionResult = await getRole(
            //     userDetailData?.organization ?? '',
            // )
            // if (actionResult.isSuccess) {
            //     dispatch(setRole(actionResult))
            // } else {
            //     Toast({
            //         header: 'Error',
            //         message: 'Failed get Role options',
            //         type: 'error',
            //     })
            // }
            setIsLoadRole(false)
        } catch (e) {
            setIsLoadRole(false)
            console.log(e)
        }
    }

    const loadRoleModule = async ({
        isRoleChange,
        uuid,
    }: {
        isRoleChange: boolean
        uuid?: string
    }) => {
        // first time load the module
        try {
            setIsLoadRoleModule(true)
            let allModuleList: IRoleModule[]
            if (isRoleChange && uuid) {
                const actionResult = await getRoleModule(uuid)
                allModuleList = actionResult.data
            } else {
                allModuleList = userDetailData?.moduleAccessList || []
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

            setModuleAdjustmentList(moduleList)
            setIsLoadRoleModule(false)
        } catch (e) {
            setIsLoadRoleModule(false)
            console.error(e)
        }
    }
    const allAccessAndIsEnabled = (crrntModule: IRoleModule) => {
        // check all access, related with all access
        let currentModule = { ...crrntModule }
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

        return currentModule
    }
    const setAccess = (indexAction: number): void => {
        if (modalSelectedPhase1 === null) return
        let allModule = [...moduleAdjustmentList]
        let currentModule = allModule[modalSelectedPhase1]
        if (modalSelectedPhase2 !== null && currentModule.sub) {
            currentModule = currentModule.sub[modalSelectedPhase2]
        }

        let currentStatus = currentModule.actionList[indexAction].status
        currentModule.actionList = currentModule.actionList.map(
            (data, index) => {
                if (index === indexAction) {
                    return { ...data, status: !currentStatus }
                }
                return data
            },
        )

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

    function openEmailClient() {
        var emailAddress = userDetailData?.email ?? '' // Replace with the desired email address
        var subject = 'Subject'
        var body = '--- Body ---'

        var mailtoUrl =
            'mailto:' +
            encodeURIComponent(emailAddress) +
            '?subject=' +
            encodeURIComponent(subject) +
            '&body=' +
            encodeURIComponent(body)

        window.open(mailtoUrl)
    }

    async function deleteUser() {
        try {
            await suspendUser(userDetailData?.id ?? '')
            loadDetailData()
            Toast({
                header: 'Success!',
                message: 'Success suspend user',
                type: 'success',
            })
        } catch (error: any) {
            const errorMessage =
                error.title ?? error.message ?? 'Failed to suspend user'
            Toast({
                header: 'Failed!',
                message: errorMessage,
                type: 'error',
            })
        }
    }
    async function unDeleteUser() {
        try {
            await unSuspendUser(userDetailData?.id ?? '')
            Toast({
                header: 'Success!',
                message: 'Success unsuspend user',
                type: 'success',
            })
            loadDetailData()
        } catch (error: any) {
            const errorMessage =
                error.title ?? error.message ?? 'Failed to unsuspend user'
            Toast({
                header: 'Failed!',
                message: errorMessage,
                type: 'error',
            })
        }
    }

    async function updateRoleModule(values: IFRoleModule) {
        try {
            await updateModuleUser(userDetailData?.id ?? '', values)
            Toast({
                header: 'Success!',
                message: 'Success update user modules',
                type: 'success',
            })
        } catch (error: any) {
            const errorMessage =
                error.title ?? error.message ?? 'Failed to update module user'
            Toast({
                header: 'Failed!',
                message: errorMessage,
                type: 'error',
            })
        }
    }

    //  Use Effect ----------------------------------------------------
    useEffect(() => {
        loadDetailData()
        loadRoleData()
        loadRoleModule({ isRoleChange: false })
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
        loadRoleModule({ isRoleChange: true, uuid: selectedRole })
    }, [selectedRole])

    useEffect(() => {
        if (!userDetailData) return

        if (userDetailData.role && !userDetailData.moduleAccessList) {
            formikModule.setFieldValue('roleType', '')
            return
        }
        formikModule.setFieldValue('roleType', userDetailData.role)
        loadRoleModule({ isRoleChange: false })
    }, [userDetailData])

    return {
        id,
        loadingDetailData,
        roleDataDropdown,
        roleDataSelected,
        roleData,
        roleModuleData,
        modalService,
        moduleParentId,
        isLoadRoleModule,
        moduleAdjustmentList,
        modalSelectedPhase2,
        modalSelectedPhase1,
        isLoadRole,
        selectedRole,
        userDetailData,
        organization,
        modalConfirmationService,
        formikModule,
        session,
        setSelectedRole,
        setModalSelectedPhase2,
        setModalSelectedPhase1,
        setAllAccess,
        setRoleDataDropdown,
        setRoleDataSelected,
        setAccess,
        setOrganization,
        openEmailClient,
        navigate,
        deleteUser,
        updateRoleModule,
        unDeleteUser,
    }
}

export default useUserAccessDetail
