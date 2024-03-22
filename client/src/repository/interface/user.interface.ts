import { IUserStaffPortalData } from './user-staff-portal-data.interface'
import { IUserRole } from './user-role.interface'
import { IRoleModule } from './role-module.interface'

export interface IUser {
    selected: boolean
    id: string
    nativeStaffData: any
    staffPortalData: IUserStaffPortalData
    portalLogin: string
    roleId: string | null
    email: string
    role: IUserRole
    organization: string
    userPreference: string
    lastLogin: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    suspendedAt: string | null
    createdBy: any
    updatedBy: any
    deletedBy: any
    isDeleted: boolean
    isActive: boolean
    customerId: any
    priceId: any
    subsType: any
    expDate: string
    status: string
    staffPortalRole: any
    paymentInfo: any
    resetPassword: any
    fullName?: string
    address: string
    workPhone: string
    city?: string
    country?: string
    accountNo?: string
    bankName?: string
    dateOfBirth?: string
    emergencyContactName?: string
    emergencyHomePhone?: string
    employeStatus?: string
    gender?: string
    homePhone?: string
    mobilePhone?: string
}

// in user detail role is string, and additional data
export type IUserDetail = Omit<IUser, 'role'> & {
    role: string
    moduleAccessList: IRoleModule[]
    jobTittle: string
}
