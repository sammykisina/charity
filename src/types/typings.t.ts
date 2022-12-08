import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

export type HTMLElementType = "small" | "medium" | "large";

export type Route = {
  inactive_icon: ReactNode;
  active_icon: ReactNode;
  name: string;
  to: string;
};

interface Info {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
}

export interface Campaign extends Info {
  target_donation_amount: number;
  donated_amount: number;
}

export interface WhoWeHelp extends Info {
  icon: ReactNode;
}

export type Role = 'DONOR' | "ORGANIZATION"
