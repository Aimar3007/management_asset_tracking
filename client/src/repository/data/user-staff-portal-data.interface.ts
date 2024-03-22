export interface IUserStaffPortalData {
    code?: string
    fullName?: string
    preferedName?: string
    address?: string
    country?: string
    city?: string
    postCode?: string
    state?: string
    dateOfBirth?: string
    gender?: string
    nationality?: string
    employed?: string
    language?: string
    jobTitle?: string
    employeStatus?: string
    outOnTask?: string
    dueBack?: string
    accountNo?: string
    bankName?: string
    bankBSB?: string
    bankSwift?: string
    emergencyContactName?: string
    emergencyHomePhone?: string
    workPhone?: string
    mobilePhone?: string
    workExtension?: string
    faxNumber?: string
    homePhone?: string
    isWorkPhone?: boolean
    isWorkExtension?: boolean
    isFaxNumber?: boolean
    isHomePhone?: boolean
    isMobilePhone?: boolean
    otherPreference?: string
    branch?: string
    email?: string[]
    canLogin?: boolean
    isDriver?: boolean
    isSystemAccount?: boolean
    isDBReader?: boolean
    isDBDev?: boolean
    isBackupOp?: boolean
    isEFT?: boolean
}
