"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/src/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function NavBar() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogOut = async () => {
    try {
    await dispatch(logout());
      toast.success("loggedOut successful!");

      router.push("/login");
    } catch (error: { response: { data: { message: string } } }) {
      console.error("Login failed", error.response.data.message);
      toast.error(
        error.response.data.message ??
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 shadow-lg">
      <NavigationMenu className="mx-auto w-full max-w-4xl py-3">
        <NavigationMenuList className="flex w-full items-center justify-between gap-8 px-4">
          
          <NavigationMenuItem>
            <Link
              href="/"
              className="text-white transition-colors hover:text-gray-300"
            >
              Home
            </Link>
          </NavigationMenuItem>
          {isLoggedIn ? (
            <NavigationMenuItem className="bg-transparent text-white transition-colors hover:bg-transparent">
              <NavigationMenu className="bg-transparent text-white transition-colors hover:bg-transparent">
                <NavigationMenuTrigger className="bg-transparent text-white transition-colors hover:bg-transparent data-[hover]:bg-transparent data-[state=open]:bg-transparent">
                  <Image
                    src="/default-avatar.png"
                    alt="Profile"
                    width={30}
                    height={30}
                    className="mr-2 inline-block rounded-full"
                  />
                  Account
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-md bg-gray-800 p-2">
                  <NavigationMenuLink asChild>
                    {isLoggedIn && (
                      <Button
                        className="block rounded-md px-4 py-2 text-white"
                        onClick={handleLogOut}
                      >
                        Logout
                      </Button>
                    )}
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/profile"
                      className="block rounded-md px-4 py-2 text-white"
                    >
                      Profile
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenu>
            </NavigationMenuItem>
          ) : (
            <Button>
            {pathname === '/login' ? (
              <Link
              href="/register"
              className="block rounded-md px-4 py-2 text-white"
              >
              SignUp
              </Link>
            ) : (
              <Link
              href="/login"
              className="block rounded-md px-4 py-2 text-white"
              >
              Login
              </Link>
            )}

            </Button>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
