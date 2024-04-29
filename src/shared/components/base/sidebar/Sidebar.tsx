import { Button, Link, Tooltip, Image, Divider, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'

import useDialog from '@hooks/dialog/dialogHook'
import Dialog from '@components/global/dialog/Dialog'
import { FaRegWindowClose } from 'react-icons/fa'

export interface PopoverState {
  isOpen: boolean,
  contentState: Boolean
}

const Sidebar = () => {
  const router = useRouter()
  const path = usePathname()
  const { openDialog, dialog, closeDialog } = useDialog()

  const active = useCallback((route:any) => {
    const data = path?.split('/')
    return data ? data[2] === route.route : false
  }, [path])

  type Route = {
    name: string;
    route: string;
    permission?: string;
    icon: JSX.Element;
  }

  const [{ isOpen, contentState }, setIsOpen] = useState<PopoverState>({
    isOpen: false,
    contentState: false
  })
  const handleClosePopover = () => {
    if (isOpen) {
      setIsOpen({
        isOpen: false,
        contentState
      })
    } else {
      setIsOpen({
        isOpen: true,
        contentState: false
      })
    }
  }

  const routes: Array<Route> = useMemo(
    () => [
      {
        name: 'Home',
        route: 'home'
        // icon: <HomeIcon/>
      },
      {
        name: 'Screens',
        route: 'screens',
        permission: 'settings:screen:read'
        // icon: <ScreenIcon/>
      },
      {
        name: 'Files',
        route: 'files',
        permission: 'settings:files:read'
        // icon: <FileIcon/>
      },
      {
        name: 'Users',
        route: 'users',
        permission: 'settings:users:read'
        // icon: <UserIcon/>
      },
      {
        name: 'Roles',
        route: 'roles',
        permission: 'settings:roles:read'
        // icon: <RoleIcon/>
      },
      {
        name: 'Permissions',
        route: 'permissions',
        permission: 'settings:permission:read'
        // icon: <PermissionIcon/>
      }

    ],
    []
  )

  return (
    <div className='w-full h-full rounded-[8px]  bg-[#091638] flex flex-col' >
      <div className='flex justify-center items-center h-[20%]'>
        <Image radius='none' alt='Mvision_logo' className='h-[40px] 2xl:h-[80px] min-[3000px]:h-[100px]' src='/sidebar/logo_sidebar.svg'/>
      </div>
      <div className='flex flex-col h-[70%] lg:h-[58%] overflow-y-auto justify-center'>
        <ul className='list-none w-full   h-[100%]  flex flex-col items-center '>
          {routes.map(({ name, route, icon, permission }, index) => (

            <Tooltip
              showArrow
              content={name}
              key={`sidebar-btn-${name}-${index}`}
              classNames={{
                base: [
                  'before:bg-[#091638] dark:before:bg-red-500'
                ],
                content: [
                  'py-2 px-4 shadow-xl ',
                  'text-background text-md bg-[#091638]'
                ]
              }}
              placement='left'>
              <Button
                isIconOnly
                startContent={icon}
                className={`w-[80%] h-[60px] 2xl:h-[160px]  mb-[20px] bg-[#091638] hover:bg-[#333f5fa8] ${
                  active(route) ? ' text-background' : 'text-background'
                } ${path === `/settings/${route}` ? 'bg-[#5AC8FB]' : ''}`}
                onClick={() => router.push(`/settings/${route}`)}
              />
            </Tooltip>
          ))}
        </ul>
      </div>

      <div className='flex flex-col p-1 items-center justify-center overflow-hidden text-background h-[22%] 2xl:h-[40%]'>
        <Divider className='w-[68px] min-[3000px]:w-[150px] bg-white mb-[30px]'/>
        <div className='h-[30px] 2xl:h-[100px] w-[114px] flex items-center justify-center rounded-[10px] '>
          <Popover className="p-1" isOpen={isOpen} shouldCloseOnInteractOutside={() => !contentState} onOpenChange={handleClosePopover} shouldFlip placement="right-end">
            <PopoverTrigger>
              <Image radius='none' className='h-[20px] 2xl:h-[60px] min-[3000px]:h-[70px]' alt='Mvision_user_logout' src='/sidebar/user_logout.svg'/>
            </PopoverTrigger>
            <PopoverContent className={`${contentState ? 'hidden' : ''} `}>
              <div className='w-full text-end'>
                <Button onClick={handleClosePopover}>
                  <FaRegWindowClose />
                </Button>
              </div>
            </PopoverContent>

          </Popover>
        </div>
        <Tooltip
          content="Log out"
          showArrow
          classNames={{
            base: [
              'before:bg-[#091638] dark:before:bg-backgrounds-500'
            ],
            content: [
              'py-2 px-4 shadow-xl h-[40px]',
              'text-background text-md bg-[#091638]'
            ]
          }}
          placement='left'
        >
          <Button
            isIconOnly
            className='w-[30pxpx] bg-[#091638] h-[45px] 2xl:h-[120px] min-[3000px]:w-[200px] min-[3000px]:h-[160px] min-[3000px]:p-0 py-[26px] px-[40px] mb-[12px] mt-[13px] hover:bg-[#333f5fa8] text-background'
            as={Link}
            onClick={() => openDialog(
              'Logging Out',
              `¿Are you sure you want to log out"?`,
              true,
              () => console.log('logout')
            )}
          >
            <Image radius='none' className='hover:border-none h-[20px] 2xl:h-[40px] min-[3000px]:h-[90px] min-[3000px]:w-[80px]' width={34} height={43} alt='Mvision_logout' src='/sidebar/logout.svg'/>
          </Button>
        </Tooltip>
        <Dialog {...dialog} closeDialog={closeDialog} />
      </div>
    </div>
  )
}

export default Sidebar
