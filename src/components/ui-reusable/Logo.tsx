import Link from "next/link";
import type { FC } from "react";
import { Title } from "@/components";

interface LogoProps {
  logo_styles?: string;
  extra_styles?: string;
}

const Logo: FC<LogoProps> = ({ logo_styles, extra_styles }) => {
  return (
    <Link
      href="/"
      className={`flex cursor-pointer items-center  gap-1 font-noto  text-[1.4rem] font-bold  ${logo_styles}`}
    >
      <Title title="Sam" />
      <div className={`h-1 w-1 self-end rounded-full ${extra_styles}`} />
    </Link>
  );
};

export default Logo;
