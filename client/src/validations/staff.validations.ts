import { commonErrorMessage } from 'common/common.static'
import * as YUP from 'yup'
export interface IStaff {
    code: string
    fullName: string
    preferedName: string
    address: string
    country: string
    city: string
    postCode: string
    state: string
    dateOfBirth: string
    gender: string
    nationality: string
    employed: string
    language: string
    jobTitle: string
    userPreference: string
    portalLogin: string
    roleId: string
    organization: string
    password: string
    portalEmail: string
    employeStatus: string
    outOnTask: string
    dueBack: string
    accountNo: string
    bankName: string
    bankBSB: string
    bankSwift: string
    emergencyContactName: string
    emergencyHomePhone: string
    workPhone: string
    mobilePhone: string
    workExtension: string
    faxNumber: string
    homePhone: string
    isWorkPhone: boolean
    isWorkExtension: boolean
    isFaxNumber: boolean
    isHomePhone: boolean
    isMobilePhone: boolean
    otherPreference: string
    branch: string
}

export const staffValidations = YUP.object().shape({
    code: YUP.string().required(`Code ${commonErrorMessage}`),
    fullName: YUP.string().required(`Name ${commonErrorMessage}`),
    preferedName: YUP.string().required(`Preffered Name ${commonErrorMessage}`),
    address: YUP.string().required(`Address ${commonErrorMessage}`),
    country: YUP.string().required(`Country ${commonErrorMessage}`),
    city: YUP.string().required(`City ${commonErrorMessage}`),
    postCode: YUP.string().required(`Postcode ${commonErrorMessage}`),
    state: YUP.string().required(`State ${commonErrorMessage}`),
    dateOfBirth: YUP.string().required(`Date of Birth ${commonErrorMessage}`),
    gender: YUP.string().required(`Gender ${commonErrorMessage}`),
    nationality: YUP.string().required(`Nationality ${commonErrorMessage}`),
    employed: YUP.string().required(`Employed ${commonErrorMessage}`),
    language: YUP.string().required(`Language ${commonErrorMessage}`),
    jobTitle: YUP.string().required(`Job Title ${commonErrorMessage}`),
    userPreference: YUP.string().required(
        `User Preference ${commonErrorMessage}`,
    ),
    portalLogin: YUP.string().required(`Portal Login ${commonErrorMessage}`),
    roleId: YUP.string().required(`Role ${commonErrorMessage}`),
    organization: YUP.string().required(`Organization ${commonErrorMessage}`),
    password: YUP.string().required(`Password ${commonErrorMessage}`),
    portalEmail: YUP.string()
        .email(`Portal Email should be formatted i.e. mail@onebyone.io`)
        .required(`Email portal ${commonErrorMessage}`),
    employeStatus: YUP.string().required(
        `Employee Status ${commonErrorMessage}`,
    ),
    outOnTask: YUP.string().required(`Out On Task ${commonErrorMessage}`),
    dueBack: YUP.string().required(`Due Back ${commonErrorMessage}`),
    accountNo: YUP.string().required(`Account No. ${commonErrorMessage}`),
    bankName: YUP.string().required(`Bank Name ${commonErrorMessage}`),
    bankBSB: YUP.string().required(`Bank BSB ${commonErrorMessage}`),
    bankSwift: YUP.string().required(`Bank Swift ${commonErrorMessage}`),
    emergencyContactName: YUP.string().required(
        `Emergency Contact Name ${commonErrorMessage}`,
    ),
    emergencyHomePhone: YUP.string().required(
        `Emergency Home Phone ${commonErrorMessage}`,
    ),
    workPhone: YUP.string().when('isWorkPhone', ([isWorkPhone], field: any) =>
        isWorkPhone
            ? field.string().required(`Work Phone ${commonErrorMessage}`)
            : field.string(),
    ),
    mobilePhone: YUP.string().when(
        'isMobilePhone',
        ([isMobilePhone], field: any) =>
            isMobilePhone
                ? field.string().required(`Mobile Phone ${commonErrorMessage}`)
                : field.string(),
    ),
    workExtension: YUP.string().when(
        'isWorkExtension',
        ([isWorkExtension], field: any) =>
            isWorkExtension
                ? field
                      .string()
                      .required(`Work Extension ${commonErrorMessage}`)
                : field.string(),
    ),
    faxNumber: YUP.string().when('isFaxNumber', ([isFaxNumber], field: any) =>
        isFaxNumber
            ? field.string().required(`Fax Number ${commonErrorMessage}`)
            : field.string(),
    ),
    homePhone: YUP.string().when('isHomePhone', ([isHomePhone], field: any) =>
        isHomePhone
            ? field.string().required(`Home Phone ${commonErrorMessage}`)
            : field.string(),
    ),
    isWorkPhone: YUP.boolean(),
    isWorkExtension: YUP.boolean(),
    isFaxNumber: YUP.boolean(),
    isHomePhone: YUP.boolean(),
    isMobilePhone: YUP.boolean(),
    otherPreference: YUP.string().required(
        `Other Preference ${commonErrorMessage}`,
    ),
    branch: YUP.string().required(`Branch ${commonErrorMessage}`),
} as Record<keyof IStaff, any>)

export interface IStaffChangePassword {
    currentPassword: string
    newPassword: string
    newPasswordConfirmation: string
}

export const staffChangePasswordValidations = YUP.object().shape({
    currentPassword: YUP.string().required(
        `Current Password ${commonErrorMessage}`,
    ),
    newPassword: YUP.string().required(
        `Current Password ${commonErrorMessage}`,
    ),
    newPasswordConfirmation: YUP.string()
        .required(`Current Password ${commonErrorMessage}`)
        .oneOf([YUP.ref('newPassword')], 'Passwords must match'),
} as Record<keyof IStaffChangePassword, any>)
