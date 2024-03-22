import Button from 'components/button/button.component'
import RoundedToggle from 'components/rounded-toggle'
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
        gender,
        organization,
        roleDataDropdown,
        isLoadRoleModule,
        selectedRole,
        isSubmit,
        isLoadDetailUser,
        formikModule,
        navigate,
        setModalSelectedPhase1,
        setModalSelectedPhase2,
        setAccess,
        setAllAccess,
        setSelectedRole,
        setRoleDataSelected,
    } = useUserAccessForm({ isNew, isProfilePage })

    const label = isNew ? 'Create User' : 'Update User'
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
                <div className="border-b border-logistical-gray-ver3 ">
                    <div className="p-4 text-size-S font-bold">{label}</div>
                </div>

                {/* Form */}
                <FormikProvider value={formikModule}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            formikModule.handleSubmit()
                        }}
                    >
                        <div className="content">
                            <div className="content-flex content-flex-1">
                                {/* Flex 1 */}
                                <div className="w-full pb-3 font-bold">
                                    USER DETAIL
                                </div>
                                <FormInput
                                    label="FULL NAME"
                                    placeholder="Enter full name"
                                    name={'fullName'}
                                    required
                                />

                                <FormInput
                                    label="JOB TITLE"
                                    placeholder="Enter job title"
                                    name={'jobTitle'}
                                    required
                                />
                                <FormInput
                                    label="ADDRESS"
                                    placeholder="Enter address"
                                    name={'address'}
                                    required
                                />
                                <FormInput
                                    label="CITY"
                                    placeholder="Enter city"
                                    name={'city'}
                                    required
                                />
                                <FormInput
                                    label="COUNTRY"
                                    placeholder="Enter country"
                                    name={'country'}
                                    required
                                />
                                <FormDropdown
                                    placeholder="Select gender"
                                    name={'gender'}
                                    label="GENDER"
                                    options={gender}
                                    dropDownIndicator={true}
                                />
                                <FormInput
                                    label="BANK NAME"
                                    placeholder="Enter bank name here"
                                    name={'bankName'}
                                />
                                <FormInput
                                    label="WORK PHONE NUMBER"
                                    placeholder="Enter work phone"
                                    name={'workPhone'}
                                />
                                <FormInput
                                    label="MOBILE PHONE NUMBER"
                                    placeholder="Enter mobile phone"
                                    name={'mobilePhone'}
                                />
                                <FormInput
                                    label="HOME PHONE"
                                    placeholder="Enter home phone"
                                    name={'homePhone'}
                                />
                                <FormInput
                                    label="EMERGENCY CONTACT NAME"
                                    placeholder="Enter emergency contact name"
                                    name={'emergencyContactName'}
                                />
                                <FormInput
                                    label="EMERGENCY HOME PHONE"
                                    placeholder="Enter emergency phone"
                                    name={'emergencyHomePhone'}
                                />
                            </div>

                            <div className="content-flex content-flex-2">
                                {/* Flex 2 */}

                                <div className="lg:w-1/2">
                                    <div className="w-full pb-3 font-bold">
                                        PORTAL LOGIN
                                    </div>
                                    <FormDropdown
                                        label="ORGANIZATION"
                                        placeholder="Select organization"
                                        name={'organization'}
                                        required
                                        options={organization}
                                        dropDownIndicator
                                    />
                                    <FormInput
                                        label="EMAIL"
                                        placeholder="Enter email"
                                        name={'portalEmail'}
                                        required
                                    />
                                    <FormInput
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
                                            label="PASSWORD"
                                            placeholder="Enter password"
                                            name={'password'}
                                            type="password"
                                            required
                                            autoComplete="asdsd"
                                        />
                                    )}

                                    <FormDropdown<IRole>
                                        label="ROLE"
                                        placeholder="Select role"
                                        name={'roleDropdown'}
                                        required
                                        options={roleDataDropdown}
                                        dropDownIndicator
                                        additionalDataHandling={(values) => {
                                            setSelectedRole(
                                                values?.role || null,
                                            )
                                            setRoleDataSelected(values)
                                        }}
                                    />
                                </div>
                                {selectedRole === null ? (
                                    ''
                                ) : (
                                    <div>
                                        <div className="pt-3 leading-none">
                                            <p className="font-bold text-size-S">
                                                Module Adjustment
                                            </p>
                                            <div className="font-thin text-size-S pt-1">
                                                {isLoadRoleModule
                                                    ? 'Please wait'
                                                    : 'Adjust on what you would like to display and hide on the portal, disable orenable to change your portal module.'}
                                            </div>
                                        </div>

                                        <div className="pt-3 grid grid-cols-1 lg:grid-cols-2  gap-3">
                                            {moduleAdjustmentList.map(
                                                (data, index) => {
                                                    return (
                                                        <div
                                                            className="flex gap-2"
                                                            key={'data' + index}
                                                        >
                                                            <div className="flex-grow border border-logistical-gray-ver3 rounded-logistical-radius p-3 flex justify-between items-center">
                                                                {
                                                                    data.moduleName
                                                                }
                                                                <RoundedToggle
                                                                    handleToggle={() => {
                                                                        setAllAccess(
                                                                            {
                                                                                index: index,
                                                                            },
                                                                        )
                                                                    }}
                                                                    isActive={
                                                                        data.status
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="flex">
                                                                <Button
                                                                    onClick={() => {
                                                                        setModalSelectedPhase1(
                                                                            index,
                                                                        )
                                                                        modalService.openModalHandling()
                                                                    }}
                                                                    icon="ri-settings-2-line"
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                },
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Button */}
                        <div className="flex justify-between p-4">
                            <Button
                                onClick={() => {
                                    navigate(-1)
                                }}
                                label={cancelButtonLabel}
                            />
                            <Button
                                isLoading={isSubmit}
                                type="submit"
                                onClick={() => {}}
                                label={buttonLabel}
                            />
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
                    </form>
                </FormikProvider>
            </div>
        </>
    )
}
