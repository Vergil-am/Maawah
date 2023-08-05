import ProfileMenu from "./ProfileMenu";
import SearchBox from "./SearchBox";
import Link from "next/link";
export default function Navbar() {
  return (
    <>
      {/* LOGO */}
      <nav className="top-0 z-50 bg-primary-foreground text-primary w-full flex justify-between items-center  px-8 h-20 border-b fixed">
        <div className="inline-flex">
          <Link className="_o6689fn" href="/">
            <div className="hidden md:block">
              <h1>RentUp</h1>
            </div>
            <div className="block md:hidden">
              <h1>LOGO</h1>
            </div>
          </Link>
        </div>
        {/* END LOGO */}
        <SearchBox />
        {/* LOGIN */}
        <div className="flex-initial">
          <div className="flex justify-end items-center relative">
            <div className="flex mr-4 items-center">
              <Link
                className="max-sm:hidden inline-block py-2 px-3 hover:bg-gray-200 rounded-full"
                href="/host"
              >
                <div className="flex items-center relative cursor-pointer whitespace-nowrap">
                  Rent your home
                </div>
              </Link>
              <div className="max-sm:hidden block relative">
                <button
                  type="button"
                  className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full relative "
                >
                  <div className="flex items-center h-5">

                  </div>
                </button>
              </div>
            </div>
            <ProfileMenu />
          </div>
        </div>
      </nav>
    </>
  );
}
