import { GalleryHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function CvLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GalleryHeader />
      {children}
      <SiteFooter />
    </>
  );
}
