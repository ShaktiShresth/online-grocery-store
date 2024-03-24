"use client";

import { Button } from "@/components/ui/button";
import { CircleUserRound, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_utils/GlobalApi";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Header = () => {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();
  const isLoggedIn = sessionStorage.getItem("jwt") ? true : false;
  const params = usePathname();
  const pagePath = params == "/sign-in";

  useEffect(() => {
    getCategoryList();
  }, []);

  /**
   * Get category list
   */
  const getCategoryList = () => {
    GlobalApi.getCategory().then((response) => {
      setCategoryList(response.data.data);
    });
  };

  const onSignout = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  return (
    <div className="p-3 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Image src="/logo.png" width={40} height={40} alt="grocery logo" />

        {isLoggedIn && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <h2 className="hidden md:flex items-center gap-2 border rounded-full p-2 px-10 bg-slate-200 cursor-pointer">
                  <LayoutGrid className="h-5 w-5" />
                  Category
                </h2>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Browser Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categoryList.map((category) => (
                  <Link
                    href={`/products-category/${category.attributes.name}`}
                    key={category.id}
                  >
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                          category?.attributes?.icon?.data[0]?.attributes?.url
                        }
                        unoptimized={true}
                        alt="icon"
                        width={26}
                        height={26}
                      />
                      <h2>{category?.attributes?.name}</h2>
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden md:flex gap-3 items-center border rounded-full p-2 px-5">
              <Search />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none"
              />
            </div>
          </>
        )}
      </div>
      <div className="flex items-center gap-5">
        {!isLoggedIn ? (
          <>
            {pagePath ? (
              <Link href={"/create-account"}>
                <Button>Create Account</Button>
              </Link>
            ) : (
              <Link href={"/sign-in"}>
                <Button>Login</Button>
              </Link>
            )}
          </>
        ) : (
          <>
            <h2 className="flex items-center gap-2 text-lg">
              <ShoppingBag /> 0
            </h2>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <CircleUserRound className="size-12 bg-green-100 text-primary rounded-full p-2 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  My Order
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => onSignout()}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
