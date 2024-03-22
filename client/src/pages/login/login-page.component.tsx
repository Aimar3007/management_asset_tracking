/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './login.style.css'
import LoginForm from './login-form.component'
import ForgotPasswordForm from './forgot-password-form.component'
const LoginPage = () => {
    const [isLoginForm, setIsLoginForm] = useState(true)

    const component = isLoginForm ? (
        <LoginForm />
    ) : (
        <ForgotPasswordForm
            backFunction={() => {
                setIsLoginForm(true)
            }}
        />
    )

    return (
        <div className="login-bg font-bahnschrift">
            <div className="min-h-screen flex items-center justify-center">
                <div className="mx-auto sm:w-1/2 md:w-2/3 lg:w-1/3 xl:w-1/4 xl:min-w-[440px]">
                    <div className="login-container px-10 py-10 rounded-md shadow-md">
                        <div className="flex justify-center text-size-XXL font-bold text-dark-green pb-8">
                            Asset Management
                        </div>

                        {/* Login Form */}
                        {component}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginPage
