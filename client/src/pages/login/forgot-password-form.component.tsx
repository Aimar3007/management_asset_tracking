import Button from 'components/button/button.component'
import FormInput from 'components/form-input/form-input.component'
import { Form, Formik } from 'formik'
import { useForgotPassword } from './login.service'
import { IForgotPassword } from 'validations/auth.validations'
import {
    forgotPasswordInitialValue,
    forgotPasswordValidation,
} from 'form-validation/forgot-password.validation'

const ForgotPasswordForm = ({ backFunction }: { backFunction: () => void }) => {
    /* 
        ### NOTES 
        - OLD API using username & password
        - if new auth API is ready, then change `username` to `email`
    */
    const { loading, submitForgotPassword } = useForgotPassword()

    return (
        <div>
            <div className="text-[20px] font-bold mb-3">Forgot Password</div>
            {/* Form */}
            <Formik<IForgotPassword>
                validationSchema={forgotPasswordValidation}
                initialValues={forgotPasswordInitialValue}
                onSubmit={(values) => {
                    submitForgotPassword(values)
                }}
            >
                <Form>
                    <FormInput
                        name="email"
                        label="EMAIL"
                        placeholder="Enter email here"
                        className="w-full"
                        required={true}
                    />

                    <Button
                        type="submit"
                        label="SUBMIT"
                        variant="logistical-lightblue"
                        className={`w-[100%] mt-[40px]`}
                        onClick={() => {}}
                        isLoading={loading}
                    />

                    <Button
                        type="button"
                        label="BACK"
                        variant="logistical-white"
                        className="w-[100%] mt-2"
                        onClick={() => {
                            backFunction()
                        }}
                        isLoading={loading}
                    />
                </Form>
            </Formik>
        </div>
    )
}
export default ForgotPasswordForm
