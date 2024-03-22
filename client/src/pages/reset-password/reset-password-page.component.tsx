import FormInput from 'components/form-input/form-input.component'
import logoLogistical from '../../assets/img/logos/IconLogistical.png'
import { Form, Formik } from 'formik'
import {
    IResetPasswordValidation,
    resetPasswordInitialValue,
    resetPasswordValidation,
} from 'form-validation/reset-password.validation'
import { useResetPassword } from './reset-password.service'
import Alert from 'components/alert/alert.component'
import Button from 'components/button/button.component'
import './reset-password.style.css'

const ResetPasswordPage = () => {
    const { submitResetPassword, errorMessage, loading } = useResetPassword()

    return (
        <div className="reset-password-bg font-bahnschrift">
            <div className="min-h-screen flex items-center justify-center">
                <div className="mx-auto sm:w-1/2 md:w-2/3 lg:w-1/3 xl:w-1/4 xl:min-w-[440px]">
                    <div className="reset-password-container px-10 py-10 rounded-md shadow-md">
                        {/* logo */}
                        <img
                            src={logoLogistical}
                            className="reset-password-logo mx-auto"
                            alt="Logo"
                        />

                        {/* Reset Form */}
                        <div>
                            <div className="text-[20px] font-bold mb-3">
                                Reset Password
                            </div>
                            {/* Form */}
                            <Formik<IResetPasswordValidation>
                                validationSchema={resetPasswordValidation}
                                initialValues={resetPasswordInitialValue}
                                onSubmit={(value) => {
                                    console.log('value', value)

                                    submitResetPassword(value)
                                }}
                            >
                                <Form>
                                    <FormInput
                                        name="newPassword"
                                        label="NEW PASSWORD"
                                        type={'password'}
                                        placeholder="Enter new password"
                                        className="w-full"
                                    />
                                    <FormInput
                                        name="passwordConfirmation"
                                        label="CONFIRM PASSWORD"
                                        type={'password'}
                                        placeholder="Confirm new password"
                                        className="w-full"
                                    />
                                    <Alert
                                        className={`mt-[40px] ${errorMessage ? '' : 'opacity-0'}`}
                                        label={errorMessage}
                                        type="danger"
                                    />
                                    <Button
                                        type="submit"
                                        label="RESET PASSWORD"
                                        className="w-full !justify-start"
                                        variant="logistical-lightblue"
                                        onClick={() => {}}
                                        isLoading={loading}
                                    />
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ResetPasswordPage
