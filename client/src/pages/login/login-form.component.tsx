import { useEffect, useState } from 'react'
import Alert from 'components/alert/alert.component'
import Button from 'components/button/button.component'
import FormInput from 'components/form-input/form-input.component'
import {
    ILoginValidation,
    loginInitialValue,
    loginValidation,
} from 'form-validation/login.validation'
import { Form, Formik } from 'formik'
import { useLogin } from './login.service'
import { removeSessionMessage, userDataSelector } from './login.slice'
import { useSelector } from 'react-redux'
import { IUserAuth } from 'repository/data/user-auth.interface'
import { useDispatch } from 'react-redux'
const LoginForm = () => {
    const dispatch = useDispatch()
    const { submitLogin, errorMessage, loading } = useLogin()
    const user: IUserAuth = useSelector(userDataSelector)

    // session expired message
    const [sessionMessage] = useState(user.sessionExpiredMessage)
    const error = errorMessage ? errorMessage : sessionMessage
    useEffect(() => {
        dispatch(removeSessionMessage())
    }, [sessionMessage])

    return (
        <div>
            <div className="text-[20px] font-bold mb-3">Login</div>
            {/* Form */}
            <Formik<ILoginValidation>
                validationSchema={loginValidation}
                initialValues={loginInitialValue}
                onSubmit={(values, { setSubmitting }) => {
                    submitLogin({
                        ...values,
                        email: values.email,
                    })
                    setSubmitting(false)
                }}
            >
                <Form>
                    <FormInput
                        name="email"
                        label="EMAIL ADDRESS"
                        placeholder="Enter email address here"
                        className="w-full"
                    />
                    <FormInput
                        name="password"
                        label="PASSWORD"
                        type={'password'}
                        placeholder="Enter password here"
                        className="w-full"
                    />
                    <Alert
                        className={`mt-[40px] 
                        ${error ? '' : 'opacity-0'}`}
                        label={error}
                        type="danger"
                    />
                    <Button
                        type="submit"
                        label="LOGIN TO PORTAL"
                        className="w-full !justify-start"
                        variant="primary"
                        onClick={() => {}}
                        isLoading={loading}
                    />
                </Form>
            </Formik>
        </div>
    )
}
export default LoginForm
