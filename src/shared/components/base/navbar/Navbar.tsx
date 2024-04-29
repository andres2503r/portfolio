import { Navbar as NavbarUi, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@nextui-org/react'
import { Logo } from '@public/logo'
import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const menuItems: Array<string> = [
    'Features',
    'Customers',
    'Integrations'
  ]
  return (
    <NavbarUi className='w-full rounded-xl bg' onMenuOpenChange={setIsMenuOpen} isBlurred={false}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="sm:hidden"
      />
      <NavbarBrand>
        <Logo/>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="blue" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="solid">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className='gap-3' >
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            {/* <Link
              color={
                index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'
              }
              className="w-full"
              href="#"
            >
              {item}
            </Link> */}

            <Button as={Link} href="#" variant="solid" color='default' className='w-full h-16' >
              {item}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarUi>
  )
}

export default Navbar
