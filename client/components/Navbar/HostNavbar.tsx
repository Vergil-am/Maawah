"use client"
import { BellIcon } from "lucide-react"
import Link from "next/link"
import ProfileMenu from "./ProfileMenu"
import { usePathname } from "next/navigation"


const navigation = [
  { name: 'Dashboard', href: '/host' },
  { name: 'Listings', href: '/host/listings' },
  { name: 'Reservations', href: '/host/reservations' },
  // { name: 'Calendar', href: '/host/#' },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
export default function HostNavbar() {
  const pathname = usePathname()
  return (
    <nav className="relative flex h-16 bg-primary-foreground border-b items-center justify-between w-screen p-5 border-solid">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        {/* button for mobile menu */}
      </div>
      <div className="flex flex-shrink-0 items-center">
        Maawah
      </div>
      <div className="hidden sm:ml-6 sm:block ">
        <div className="flex space-x-4 ">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                item.href == pathname ? 'underline underline-offset-8 decoration-2' : 'text-gray-300 hover:underline hover:underline-offset-8',
                'rounded-md px-3 py-2 text-sm font-medium'
              )}
              aria-current={item.href == pathname ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button
          type="button"
          className="relative rounded-full p-1 text-foregoround hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        {/* <ProfileMenu /> */}
      </div>
    </nav>
  )
}
