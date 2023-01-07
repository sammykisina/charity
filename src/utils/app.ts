import { campaigns } from "@/constants";
import { type StaticImageData } from "next/image";
import { ReactNode } from "react";
import notificationIcons from "src/constants/notificationIcons";
import type { Campaign } from "src/types/typings.t";

export const classNames = (...classes: any): string => {
  return classes.filter(Boolean).join(" ");
};

const calculatePercentage = (
  target_donation_amount: number,
  donated_amount: number
): number => {
  const percentage = (donated_amount / target_donation_amount) * 100;
  return Math.round(percentage);
};

export const generateNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getFundraisingCampaignInfo = (campaign_id: string): Campaign | null => {
  let campaignInfo: Campaign | null = null;

  switch (campaign_id) {
    case "humanity":
      campaignInfo = campaigns[0] || null;
      break;
    case "education":
      campaignInfo = campaigns[1] || null;
      break;
    case "medical":
      campaignInfo = campaigns[2] || null;
      break;
    case "natural disaster":
      campaignInfo = campaigns[3] || null;
      break;
    case "environment":
      campaignInfo = campaigns[4] || null;
      break;
    default:
      campaignInfo = campaigns[4] || null;
  }

  return campaignInfo;
};

const getNotificationIcon = (type: string) => {
  let icon: ReactNode = null;

  switch (type) {
    case "fundraising":
      icon = notificationIcons.fundraising;
  }

  return icon;
};

const app_utils = {
  calculatePercentage,
  generateNumberWithCommas,
  getFundraisingCampaignInfo,
  getNotificationIcon,
};

export default app_utils;
