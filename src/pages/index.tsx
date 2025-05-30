import { memo } from 'react'
import { useRoutes } from 'react-router-dom'
import Login from './login/Login'
import Register from './Registration/Register'
import Layout from './Layout/Layout'
import OtpVerification from './otpVerification/OtpVerification'
import Profile from './Profile/Profile'

const MainRouter = () => {
    return (
        useRoutes([
            {
                path: "/", element: <Layout />,
                children: [
                    { path: "/otp", element: <OtpVerification /> },
                    { path: "/login", element: <Login /> },
                    { path: "/register", element: <Register /> },
                    { path: "/my-profile", element: <Profile /> },
                ]
            },
        ])
    )
}

export default memo(MainRouter)