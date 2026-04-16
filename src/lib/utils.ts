import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WA_NUMBER = "8801743656066";
export const WA_BASE = `https://wa.me/${WA_NUMBER}`;

export function waLink(message: string) {
  return `${WA_BASE}?text=${encodeURIComponent(message)}`;
}

export const WA_LINKS = {
  general: waLink("Hi AnasTech, I'd like to discuss a project"),
  website: waLink("Hi AnasTech, I'm interested in Website Development"),
  software: waLink("Hi AnasTech, I'm interested in Software Development"),
  mobile: waLink("Hi AnasTech, I'm interested in Mobile App Development"),
  business: waLink("Hi AnasTech, I'm interested in Business Development"),
  accounting: waLink("Hi AnasTech, I'm interested in Accounting Services"),
  sms: waLink("Hi AnasTech, I'm interested in SMS Solutions"),
  callcenter: waLink("Hi AnasTech, I'm interested in Call Center Solutions"),
  other: waLink("Hi AnasTech, I have an inquiry"),
  support: waLink("Hi AnasTech, I need support"),
};
