import { memo } from 'react'
import { FaUserLock } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className='bg-blue-400 text-white text-[20px]'>
            <nav className='container mx-auto p-5 flex justify-between'>
                <NavLink className='flex items-center gap-2' to={'/'}>
                    <FaUserLock />
                    <span>Authorization</span>
                </NavLink>
                <div className='flex gap-3 items-center'>
                    <NavLink to={'/otp'}>Otp</NavLink>
                    <NavLink to={'/register'}>Register</NavLink>
                    <NavLink to={'/login'}>Login</NavLink>
                </div>
            </nav>
        </header>
    )
}

export default memo(Header)
