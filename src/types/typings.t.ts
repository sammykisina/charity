import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

export type HTMLElementType = "small" | "medium" | "large";

export type Route = {
  inactive_icon?: ReactNode;
  active_icon?: ReactNode;
  name?: string;
  to: string;
};

interface Info {
  id?: string;
  title?: string;
  description: string;
  image: StaticImageData;
}

export type CampaignTitle =
  | "humanity"
  | "education"
  | "medical"
  | "natural disaster"
  | "environment";

export interface Campaign extends Info {
  title: CampaignTitle;
  icon: ReactNode;
}

export type Fundraising = {
  id?: string;
  title: string;
  description: string;
  target_donation_amount: number;
  donated_amount: number;
  campaign?: string;
  start_date: Date;
  end_date: Date;
};

export type Role = "DONOR" | "ORGANIZATION";

export type SelectionOption = {
  name: string;
  value: string;
};

export type Donation = {
  owner: string;
  location: string;
  type: CampaignTitle;
  date: Date;
  amount: number;
};

export type AnalysisData = {
  title: string;
  amount: number;
  updated_status: string;
  difference: string;
  filter: string;
};
