"use client";
import { Menu } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/logo.jpg"; // loading image
import Link from "next/link";
import "./Navbar.css";
import NavIcons from "./NavIcons";
import TooltipComponent from "../ui/Tooltip/Tooltip";
import Search from "./Search";
import { useThem } from "@/lib/api/queries";
import { useState } from "react";
interface TopNavbarProps {
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
}
export default function TopNavbar({
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
}: TopNavbarProps) {
  const { data } = useThem();
  const [imgError, setImgError] = useState(false);
  const imageSrc =
    imgError || !data?.website?.logo || data?.website?.logo.trim() === ""
      ? logo
      : data?.website?.logo;
  return (
    <div className="bg-nave">
      <div className="nav-container contain flex-wrap">
        <div className="w-full flex justify-between lg:hidden">
          <div className="flex items-center">
            <Link href="/">
              <Image
                alt="Logo"
                src={imageSrc}
                onError={() => setImgError(true)}
                className="object-cover"
                width={150}
                height={75}
                priority
                loading="eager"
              />
            </Link>
          </div>
          <NavIcons />
        </div>
        <div className="hidden lg:flex lg:items-center lg:gap-6">
          <Link href="/">
            <Image
              alt="Logo"
              src={data?.website?.logo || logo}
              className="object-cover"
              width={150}
              height={75}
              priority
              loading="eager"
            />
          </Link>
        </div>
        <div className="w-full lg:grow lg:w-auto order-last lg:order-none mt-3 lg:mt-0 flex items-center gap-2">
          <TooltipComponent title="Menu">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden icon-with-text"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </TooltipComponent>
          <Search />
        </div>
        <NavIcons className="hidden lg:flex" />
      </div>
    </div>
  );
}
