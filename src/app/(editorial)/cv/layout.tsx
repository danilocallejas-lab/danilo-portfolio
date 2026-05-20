import { GalleryHeader } from "@/components/site-header";

export default function CvLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GalleryHeader />
      {children}
    </>
  );
}
