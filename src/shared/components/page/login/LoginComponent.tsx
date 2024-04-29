import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AuthContext } from '@context/auth/AuthContext'
import { IAuthPayload } from '@interfaces/core/auth/Auth'
import Button from '@components/global/button/Button'
// import Link from 'next/link'
import InputLabel from '@components/global/input-label/InputLabel'
import { Divider, Image } from '@nextui-org/react'

export default function LoginComponent () {
  const { login } = useContext(AuthContext)
  const { handleSubmit, control } = useForm<IAuthPayload>()

  const onSubmit = (data: IAuthPayload) => {
    login(data)
  }

  return (
    <div className='p-[10px] 2xl:p-[21px] h-[100vh] w-[100vw] flex justify-center items-center'>
      <div style={{ backgroundImage: 'url("/login/login.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='text-background flex flex-col rounded-[8px] w-[50%] h-[100%]'>
        <div className='flex justify-center items-center font-medium p-5 w-full h-[10%]'>
          <h1 className="flex-grow  text-[40px] 2xl:text-[2.5vw] ">MVISION</h1>
          <Divider className="bg-white w-[60%] mr-[2vw]" />
        </div>

        <div className='flex flex-col justify-end 2xl:pb-[20px] w-full h-[90%]'>
          <div className='flex flex-col justify-center items-center h-[70%]'>
            <div className='w-[50%] flex flex-col'>
              <span className="font-extrabold text-[50px] 2xl:text-[4vw] whitespace-nowrap">Control Your</span>
              <span className="font-extrabold text-[50px]  2xl:text-[4vw] whitespace-nowrap">scenario,</span>
            </div>
            <div className='w-[50%] flex flex-col'>
              <span className='text-[40px] 2xl:text-[3vw] whitespace-nowrap'>And Elevate</span>
              <span className='text-[40px] 2xl:text-[3vw] whitespace-nowrap'>Your Experience</span>
            </div>
          </div>
        </div>

      </div>

      <div className='text-[#091638] flex flex-col justify-center items-center w-[50%]  h-full'>
        <div className='flex flex-col  w-full h-full items-center p-5  rounded-xl '>
          <div className='flex flex-col items-center justify-center  h-[30%] 2xl:h-[30%] w-full'>
            <Image src='/sidebar/logo_sidebar.svg' alt='' className='h-[4vw]'/>
            <h1 className="text-primary font-semibold  text-center text-[30px] 2xl:text-[70px] w-[100%]">
              Welcome Back
            </h1>
            <p className="text-[18px] 2xl:text-[22px] text-[#84868B]  font-medium text-center w-[80%] h-[70px] xl:h-[100px] 2xl:h-[150px]">
              Enter your username and password to log in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full h-[70%] 2xl:h-[70%] justify-center items-center flex-col  gap-[2vw] xl:gap-[2vw] 2xl:gap-[2vw]">
            <Controller
              name="username"
              control={control}
              rules={{
                required: true,
                minLength: {
                  value: 4,
                  message: 'Minimum 4 characters'
                },
                pattern: {
                  message: 'Username is required.',
                  value: /(.*)/
                }
              }}
              render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
                <InputLabel
                  id="1_uname"
                  value={value}
                  name='username'
                  label='Username'
                  placement="outside"
                  variant='flat'
                  size='lg'
                  placeholder='Enter your username'
                  className='w-[50%] h-[40px] mb-5 2xl:h-[73px]'
                  onChange={onChange}
                  errorMessage={error?.message}
                  classNames={{
                    label: '!text-[#000000] font-medium text-[20px] xl:text-[1vw] 2xl:text-[20px] 2xl:pb-[40px]',
                    inputWrapper: 'border !border-white h-full',
                    input: 'text-black h-full xl:text-[1vw] 2xl:text-[20px]',
                    errorMessage: 'text-[#ffc3c3] font-semibold',
                    clearButton: '!text-background'
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: true,
                minLength: {
                  value: 4,
                  message: 'Minimum 4 characters'
                },
                pattern: {
                  message: 'Password is required.',
                  value: /(.*)/
                }
              }}
              render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
                <InputLabel
                  id="1_uword"
                  placeholder='Enter your password'
                  name="password"
                  value={value}
                  label='Password'
                  className='w-[50%] h-[40px] 2xl:h-[73px]'
                  type="password"
                  size='lg'
                  variant='faded'
                  placement='outside'
                  onChange={onChange}
                  errorMessage={error?.message}
                  classNames={{
                    label: '!text-[#000000] font-medium text-[20px] xl:text-[1vw] 2xl:text-[20px]  2xl:pb-[40px]',
                    inputWrapper: '!border-white  h-full',
                    input: 'text-black mt-1 xl:text-[1vw] 2xl:text-[20px]',
                    errorMessage: 'text-[#ffc3c3] font-semibold',
                    innerWrapper: '!flex !items-center'
                  }}
                />
              )}
            />

            <div className="flex flex-col w-full text-background justify-between gap-5 items-center mt-[10px]">
              <Button
                text='Sign in'
                type='submit'
                variant='solid'
                className={`font-medium text-[18px] 2xl:text-[22px] bg-[#5AC8FB] w-[50%] h-[40px]  2xl:h-[73px]`}
              />
              {/* <Link className='text-[#84868B] cursor-pointer text-[18px] 2xl:text-[22px]  font-medium ' href="/recover-password" >
        Forgot Your Password?
              </Link> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
