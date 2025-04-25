// @\components\navbar\navbar.tsx
"use client";

import Container from "../container";
import Categories from "./categories";
import Logo from "./logo";
import Search from "./search";
import Usermenu from "./usermenu";
import { SafeUser } from "@/types";

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px] border-neutral-200">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <Usermenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
}
export default Navbar;