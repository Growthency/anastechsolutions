import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AnasTech Solutions",
    short_name: "AnasTech",
    description:
      "Enterprise websites, software, mobile apps & digital solutions. Trusted by 80+ businesses in 10+ countries.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#0F75BC",
    orientation: "portrait",
    icons: [
      {
        src: "/newlogo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["business", "productivity"],
  };
}
