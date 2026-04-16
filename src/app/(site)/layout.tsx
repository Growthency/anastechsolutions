import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/shared/WhatsAppFab";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { CustomCursor } from "@/components/effects/CustomCursor";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
      <WhatsAppFab />
      <ScrollToTop />
    </SmoothScroll>
  );
}
