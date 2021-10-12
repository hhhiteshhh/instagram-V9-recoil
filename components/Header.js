import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div className="shadow-md border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center bg-white max-w-6xl mx-5 lg:mx-auto">
        {/* left */}
        <div
          onClick={() => {
            router.push("/");
          }}
          className="relative hidden w-24 h-24 lg:inline-grid cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div
          onClick={() => {
            router.push("/");
          }}
          className="relative w-10 h-10 lg:hidden flex-shrink-0 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* middle */}
        <div className="max-w-xs">
          <div className="mt-1 relative p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="pl-10  bg-gray-50 block w-full sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
            />
          </div>
        </div>
        {/* right */}
        {session ? (
          <div className="flex items-center justify-end space-x-4">
            <HomeIcon
              className="navBtn"
              onClick={() => {
                router.push("/");
              }}
            />
            <MenuIcon className="h-6 md:hidden cursor-pointer" />
            <div className="relative navBtn">
              <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-400 rounded-full flex items-center justify-center animate-pulse text-white">
                3
              </div>
              <PaperAirplaneIcon className="navBtn rotate-45" />
            </div>
            <PlusCircleIcon
              onClick={() => {
                setOpen(true);
              }}
              className="navBtn"
            />
            <UserGroupIcon className="navBtn" />
            <HeartIcon className="navBtn" />
            <img
              src={session?.user?.image}
              alt="Profile Pic"
              className="h-10 rounded-full cursor-pointer"
              onClick={signOut}
            />
          </div>
        ) : (
          <div className="flex items-center justify-end space-x-4">
            <HomeIcon
              className="navBtn"
              onClick={() => {
                router.push("/");
              }}
            />
            <MenuIcon className="h-6 md:hidden cursor-pointer" />
            <button onClick={signIn}>Sign In</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
