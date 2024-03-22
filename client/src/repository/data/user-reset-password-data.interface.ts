export interface IUserResetPassword {
    message: string
    data: {
        id: string
        nativeStaffData: {
            pk: string
            isOperational: boolean
            isOperationalSpecified: boolean
            changePasswordAtNextLogin: boolean
            changePasswordAtNextLoginSpecified: boolean
            isActive: boolean
            isActiveSpecified: boolean
            isController: boolean
            isControllerSpecified: boolean
            isSystemAccount: boolean
            isSystemAccountSpecified: boolean
            code: string
            loginName: string
            isResource: boolean
            isResourceSpecified: boolean
            resourceType: string
            isSalesRep: boolean
            isSalesRepSpecified: boolean
            isDatabaseDeveloper: boolean
            isDatabaseDeveloperSpecified: boolean
            isDeveloper: boolean
            isDeveloperSpecified: boolean
            isBackupOperator: boolean
            isBackupOperatorSpecified: boolean
            isReadOnlyDBUser: boolean
            isReadOnlyDBUserSpecified: boolean
            employmentBasis: string
            nameTitle: string
            fullName: string
            nameSuffix: string
            friendlyName: string
            userAddress1: string
            userAddress2: string
            city: string
            state: string
            postcode: string
            gender: boolean
            genderSpecified: boolean
            title: string
            workPhone: string
            publishWorkPhone: boolean
            publishWorkPhoneSpecified: boolean
            workExtension: string
            publishWorkExtension: boolean
            publishWorkExtensionSpecified: boolean
            homePhone: string
            publishHomePhone: boolean
            publishHomePhoneSpecified: boolean
            mobilePhone: string
            publishMobilePhone: boolean
            publishMobilePhoneSpecified: boolean
            faxNum: string
            publishFaxNum: boolean
            publishFaxNumSpecified: boolean
            pager: string
            securityCardNumber: string
            enterpriseCertificationID: string
            emailAddress: string
            publishEmailAddress: boolean
            publishEmailAddressSpecified: boolean
            birthdate: string
            eftWages: boolean
            eftWagesSpecified: boolean
            wagesBankName: string
            wagesBankAccount: string
            wagesBankBsb: string
            wagesBankSwift: string
            nextOfKinRelationship: string
            nextOfKin: string
            nextOfKinHomePhone: string
            nextOfKinWorkPhone: string
            emergencyContactRelationship: string
            emergencyContactName: string
            emergencyHomePhone: string
            emergencyWorkPhone: string
            employmentDate: string
            departureDate: string
            userSignature: string
            profilePhoto: string
            dueBack: string
            outOnTask: string
            personalEDIMailBox: string
            brokerID: string
            brokerPassword: string
            brokerWorkingPassword: string
            brokerPasswordStatus: string
            passport: string
            isInTrainingMode: boolean
            isInTrainingModeSpecified: boolean
            lastPasswordAttemptDateTime_Utc: string
            passwordNeverChanges: boolean
            passwordNeverChangesSpecified: boolean
            nextReviewDate: string
            workingLanguage: string
            lastActivityDate: string
            commissionBasis: string
            newClientCommissionRate: number
            newClientCommissionRateSpecified: boolean
            establishedClientCommissionRate: number
            establishedClientCommissionRateSpecified: boolean
            commissionMinimumEarning: number
            commissionMinimumEarningSpecified: boolean
            isActivityLogged: boolean
            isActivityLoggedSpecified: boolean
            activeDirectoryObjectGuid: string
            systemCreateTimeUtc: string
            systemLastEditTimeUtc: string
            canLogin: boolean
            canLoginSpecified: boolean
            isDevice: boolean
            isDeviceSpecified: boolean
            isTwoFactorAuthenticationEnabled: boolean
            isTwoFactorAuthenticationEnabledSpecified: boolean
            addressMap: string
            domainName: string
            activityTrackingStatus: string
            isDriver: boolean
            isDriverSpecified: boolean
            passwordHash: string
            passwordHashIterations: number
            passwordHashIterationsSpecified: boolean
            passwordSalt: string
            emergencyContactEmail: string
            lastDayOfWork: string
            nextOfKinEmail: string
            probationEndDate: string
            residencyExpiry: string
            residencyStatus: string
            homeBranch: string
            homeDepartment: string
            lastLogonBranch: string
            lastLogonDepartment: string
            preferredPaymentCompany: string
            countryCode: string
            nationalityCode: string
            glbStaffLanguageCollection: string
            glbCertificatesCollection: string
            glbStaffHolidayCollection: string
            glbGroupLinkCollection: string
            glbWorkTimeCollection: string
            genRegCertAccredMaintListCollection: string
            action: number
            actionSpecified: boolean
        }
        fullName: string
        portalLogin: string
        email: string
        userPreference: string
        staffPortalData: {
            fullName: string
            address: string
            country: string
            city: string
            dateOfBirth: string
            gender: string
            jobTitle: string
            employeStatus: string
            accountNo: string
            bankName: string
            emergencyContactName: string
            emergencyHomePhone: string
            workPhone: string
            mobilePhone: string
            homePhone: string
            portalEmail: string
        }
        lastLogin: string
        staffPortalRole: string
        role: string
    }
    isSuccess: boolean
}
