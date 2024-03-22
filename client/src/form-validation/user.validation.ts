import { IRoleModule } from 'repository/data/role-module.interface'
import * as YUP from 'yup'
import { requiredMessage } from './validation-message.static'
import { IRoleAccess } from 'repository/data/role.interface'

export interface IFRole {
    id?: string
    roleType: string
    roleDescription: string
    updatedAt?: string
    createdAt?: string
    deletedAt?: string
    userAccess: {
        role: string
        roleDescription: string
        access: IRoleAccess
    }[]
    moduleAccessList: IRoleModule[]
}

export interface IFUser {
    // personal
    fullName: string
    address: string
    country: string
    city: string
    dateOfBirth?: string
    gender?: 'male' | 'female'
    accountNo?: string
    bankName?: string
    emergencyContactName?: string
    emergencyHomePhone?: string
    workPhone?: string
    mobilePhone?: string
    homePhone?: string

    // login information
    organization: string
    organizationLabel?: string
    portalLogin: string
    password: string
    portalEmail: string
    roleDropdown: string //helper
    role?: IFRole
    roleLabel?: string

    // company information
    jobTitle: string
    employeStatus?: boolean
    jobCategory: string
}

export const createUserValidation = YUP.object().shape({
    fullName: YUP.string().required(requiredMessage('full name')),
    address: YUP.string().required(requiredMessage('address')),
    country: YUP.string().required(requiredMessage('country')),
    city: YUP.string().required(requiredMessage('city')),
    organization: YUP.string().required(requiredMessage('organization')),
    password: YUP.string().required(requiredMessage('password')),
    portalEmail: YUP.string().required(requiredMessage('email')),
    portalLogin: YUP.string().required(requiredMessage('username')),
    jobTitle: YUP.string().required(requiredMessage('job title')),
    jobCategory: YUP.string().required(requiredMessage('job category')),
    roleDropdown: YUP.string().required(requiredMessage('role')),
} as Record<keyof IFUser, any>)

// form user initial data
export const createUserInitial: IFUser = {
    // personal
    fullName: '',
    address: '',
    country: '',
    city: '',
    organization: '',
    password: '',
    portalEmail: '',
    portalLogin: '',
    jobTitle: '',
    jobCategory: 'STAFF',
    roleDropdown: '',
}
