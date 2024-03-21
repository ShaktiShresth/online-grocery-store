import { Button } from "@/components/ui/button";
import { LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <div className="p-3 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Image src="/logo.png" width={40} height={40} alt="grocery logo" />

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
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="hidden md:flex gap-3 items-center border rounded-full p-2 px-5">
          <Search />
          <input type="text" placeholder="Search..." className="outline-none" />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <h2 className="flex items-center gap-2 text-lg">
          <ShoppingBag /> 0
        </h2>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Header;
