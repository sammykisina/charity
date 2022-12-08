import Link from "next/link";
import type { FC } from "react";
import { Icon } from "@/components";
import { BsHeartHalf } from "react-icons/bs";

interface LogoProps {
  logo_styles: string;
}

const Logo: FC<LogoProps> = ({ logo_styles }) => {
  return (
    <Link
      href="/"
      className={`cursor-pointer font-noto text-[1.4rem]  font-bold  ${logo_styles}`}
    >
      <Icon icon={<BsHeartHalf />} />
    </Link>
  );
};

export default Logo;
