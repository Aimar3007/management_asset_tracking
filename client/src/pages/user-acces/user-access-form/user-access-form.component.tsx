/* eslint-disable no-unused-vars */
import Button from 'components/button/button.component'
import {
    IUseUserAccessForm,
    useUserAccessForm,
} from './user-access-form.service'
import SelectModuleModal from './modal/select-module-modal'
import { FormikProvider } from 'formik'
import FormInput from 'components/form-input/form-input.component'
import './user-access-form.style.css'
import FormDropdown from 'components/form-dropdown/form-dropdown.component'
import { IRole } from 'repository/data/role.interface'
import Spinner from 'components/spinner/spinner.component'

export default function UserAccessForm({
    isNew,
    isProfilePage,
}: IUseUserAccessForm) {
    const {
        moduleAdjustmentList,
        modalService,
        modalSelectedPhase1,
        modalSelectedPhase2,
        organization,
        roleDataDropdown,
        isSubmit,
        isLoadDetailUser,
        formikModule,
        formikChangePassword,
        navigate,
        setModalSelectedPhase1,
        setModalSelectedPhase2,
        setAccess,
        setAllAccess,
        setSelectedRole,
        setRoleDataSelected,
        setSelectedOrganization,
    } = useUserAccessForm({ isNew, isProfilePage })

    const labelNew = isNew ? 'CREATE USER' : 'UPDATE USER'
    const label = isProfilePage ? 'USER DETAIL' : labelNew
    const isDisabled = !isProfilePage ? false : true
    const buttonLabel = isNew ? 'CREATE USER' : 'UPDATE USER'
    const cancelButtonLabel = isNew ? 'CANCEL CREATE' : 'CANCEL UPDATE'
    const spinnerShow = isLoadDetailUser ? '' : 'hidden'
    const formShow = !isLoadDetailUser ? 'opacity-100' : 'opacity-0'

    return (
        <>
            <div
                className={`${spinnerShow} flex w-full content-full-height items-center justify-center`}
            >
                <Spinner label="Please Wait..." />
            </div>

            <div
                className={`${formShow} container-global user-access opacity-0 transition-opacity duration-500 `}
            >
                <div className="border-b border-logistical-gray-ver7 ">
                    <div className="p-4 text-size-S font-bold">{label}</div>
                </div>

                {/* Form */}
                <div className="content">
                    <FormikProvider value={formikModule}>
                        <div className="content-flex content-flex-1">
                            <div className="text-size-S font-bold mb-3">
                                User Profile
                            </div>
                            <FormInput
                                disabled={isDisabled}
                                label="FULL NAME"
                                placeholder="Enter full name"
                                name={'fullName'}
                                required
                            />
                            <FormInput
                                disabled={isDisabled}
                                label="JOB TITLE"
                                placeholder="Enter job title"
                                name={'jobTitle'}
                                required
                            />
                            {/* <FormInput
                                disabled={isDisabled}
                                label="JOB CATEGORY"
                                placeholder="Enter job category"
                                name={'jobCategory'}
                                required
                            /> */}
                            {/* <FormDropdown
                                placeholder="Select gender"
                                name={'gender'}
                                label="GENDER"
                                options={gender}
                                dropDownIndicator={true}
                            /> */}

                            <div className="text-size-S font-bold mb-3 mt-3">
                                User Address
                            </div>
                            <FormInput
                                disabled={isDisabled}
                                label="COUNTRY"
                                placeholder="Enter country"
                                name={'country'}
                                required
                            />
                            <FormInput
                                disabled={isDisabled}
                                label="CITY"
                                placeholder="Enter city"
                                name={'city'}
                                required
                            />
                            <FormInput
                                disabled={isDisabled}
                                label="ADDRESS DETAIL"
                                placeholder="Enter address"
                                name={'address'}
                                required
                            />

                            <div className="flex gap-2 flex-wrap mt-4">
                                <div className="flex-1 flex flex-col">
                                    <div className="text-size-S font-bold mb-3">
                                        User Contact
                                    </div>

                                    <FormInput
                                        disabled={isDisabled}
                                        label="MOBILE PHONE NUMBER"
                                        placeholder="Enter mobile phone"
                                        name={'mobilePhone'}
                                    />
                                    <FormInput
                                        disabled={isDisabled}
                                        label="WORK PHONE NUMBER"
                                        placeholder="Enter work phone"
                                        name={'workPhone'}
                                    />
                                    <FormInput
                                        disabled={isDisabled}
                                        label="HOME PHONE"
                                        placeholder="Enter home phone"
                                        name={'homePhone'}
                                    />
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <div className="text-size-S font-bold mb-3">
                                        Emergency Contact
                                    </div>

                                    <FormInput
                                        disabled={isDisabled}
                                        label="EMERGENCY CONTACT NAME"
                                        placeholder="Enter emergency contact name"
                                        name={'emergencyContactName'}
                                    />
                                    <FormInput
                                        disabled={isDisabled}
                                        label="EMERGENCY HOME PHONE"
                                        placeholder="Enter emergency phone"
                                        name={'emergencyHomePhone'}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="content-flex content-flex-2">
                            <div className="text-size-S font-bold mb-3">
                                User Account
                            </div>

                            {isProfilePage ? (
                                <FormInput
                                    disabled={isDisabled}
                                    label="Organisation"
                                    placeholder="Enter Role"
                                    name={'organizationLabel'}
                                    required
                                />
                            ) : (
                                <FormDropdown
                                    disabled={isDisabled}
                                    label="ORGANISATION"
                                    placeholder="Select organisation"
                                    name={'organization'}
                                    required
                                    options={organization}
                                    dropDownIndicator
                                    additionalOnClick={(value) => {
                                        setSelectedOrganization(
                                            value?.value as string,
                                        )
                                    }}
                                />
                            )}

                            <FormInput
                                disabled={isDisabled}
                                label="EMAIL"
                                placeholder="Enter email"
                                name={'portalEmail'}
                                required
                            />
                            <FormInput
                                disabled={isDisabled}
                                label="USERNAME"
                                placeholder="Enter username"
                                name={'portalLogin'}
                                required
                                autoComplete="disabled"
                            />

                            {!isNew ? (
                                <></>
                            ) : (
                                <FormInput
                                    disabled={isDisabled}
                                    label="PASSWORD"
                                    placeholder="Enter password"
                                    name={'password'}
                                    type="password"
                                    required
                                    autoComplete="asdsd"
                                />
                            )}

                            {isProfilePage ? (
                                <FormInput
                                    disabled={isDisabled}
                                    label="ROLE"
                                    placeholder="Enter Role"
                                    name={'roleDropdown'}
                                    required
                                />
                            ) : (
                                <FormDropdown<IRole>
                                    label="ROLE"
                                    placeholder="Select role"
                                    name={'roleDropdown'}
                                    required
                                    options={roleDataDropdown}
                                    dropDownIndicator
                                    additionalDataHandling={(values) => {
                                        setSelectedRole(values?.role || null)
                                        setRoleDataSelected(values)
                                    }}
                                />
                            )}

                            {isProfilePage ? (
                                <FormikProvider value={formikChangePassword}>
                                    <div className="text-size-S font-bold mb-3">
                                        Update Password
                                    </div>
                                    <FormInput
                                        label="Current Password"
                                        placeholder="Enter Current Password"
                                        name={'currentPassword'}
                                        type="password"
                                        required
                                    />
                                    <FormInput
                                        label="New Password"
                                        placeholder="Enter New Password"
                                        name={'newPassword'}
                                        required
                                        autoComplete="disabled"
                                        type="password"
                                    />
                                    <FormInput
                                        label="Re type New Password"
                                        placeholder="Retype New Password"
                                        name={'newPasswordConfirmation'}
                                        required
                                        autoComplete="disabled"
                                        type="password"
                                    />
                                    <div className="flex justify-end">
                                        <Button
                                            isLoading={isSubmit}
                                            type="button"
                                            onClick={() => {
                                                formikChangePassword.handleSubmit()
                                            }}
                                            label={'UPDATE PASSWORD'}
                                            variant="logistical-darkblue"
                                        />
                                    </div>
                                </FormikProvider>
                            ) : null}
                        </div>
                    </FormikProvider>
                </div>

                {/* Button */}
                <div className="flex justify-between p-4">
                    {!isProfilePage ? (
                        <Button
                            onClick={() => {
                                navigate(-1)
                            }}
                            label={cancelButtonLabel}
                        />
                    ) : null}
                    {!isProfilePage ? (
                        <Button
                            isLoading={isSubmit}
                            type="button"
                            onClick={() => {
                                formikModule.handleSubmit()
                            }}
                            label={buttonLabel}
                        />
                    ) : null}
                </div>

                <SelectModuleModal
                    modalService={modalService}
                    moduleList={moduleAdjustmentList}
                    setModalSelectedPhase1={(selected) => {
                        setModalSelectedPhase1(selected)
                    }}
                    setModalSelectedPhase2={(selected) => {
                        setModalSelectedPhase2(selected)
                    }}
                    setAccessHandling={(indexAction: number) => {
                        setAccess(indexAction)
                    }}
                    modalSelectedPhase1={modalSelectedPhase1}
                    modalSelectedPhase2={modalSelectedPhase2}
                    setAllAccess={() => {
                        setAllAccess({})
                    }}
                />
            </div>
        </>
    )
}
