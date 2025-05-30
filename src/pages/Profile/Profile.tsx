import { memo } from 'react'
import { useGetProfileQuery } from '../../redux/api/authorization.api'

const Profile = () => {
    const { data } = useGetProfileQuery({})
    // console.log(data.image);

    return (
        data &&
        <div className='container mx-auto mt-[50px]'>
            <h1 className='font-bold p-4 text-[24px]'>My profile</h1>
            <div className=' flex flex-col gap-2 p-4 shadow w-[400px]  rounded-[10px]'>
                <div className='flex items-center gap-4'>
                    <img className='w-[50px] h-[50px] object-cover rounded-[300px]' src={data.img} alt="" />
                    <span className='text-[22px]'>{data.email}</span>
                </div>
                <span className='text-[18px]'>{data.firstname}</span>
                <span>{data.lastname}</span>
            </div>

        </div>
    )
}

export default memo(Profile)
