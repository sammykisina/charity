import {
  educationImage,
  environmentImage,
  humanityImage,
  medicalImage,
  naturalDisasterImage,
  fundraisingImage,
} from "@/assets";
import { type StaticImageData } from "next/image";

export const classNames = (...classes: any): string => {
  return classes.filter(Boolean).join(" ");
};

export const calculatePercentage = (
  target_donation_amount: number,
  donated_amount: number
): number => {
  const percentage = (donated_amount / target_donation_amount) * 100;
  return Math.round(percentage);
};

export const generateNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getFundraisingImage = (campaign_id: string): StaticImageData => {
  let image = null;
  switch (campaign_id) {
    case "humanity":
      image = humanityImage;
      break;
    case "education":
      image = educationImage;
      break;
    case "medical":
      image = medicalImage;
      break;
    case "natural_disaster":
      image = naturalDisasterImage;
      break;
    case "environment":
      image = environmentImage;
      break;
    default:
      image = fundraisingImage;
  }

  return image;
};
