import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'

const Layout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default memo(Layout)