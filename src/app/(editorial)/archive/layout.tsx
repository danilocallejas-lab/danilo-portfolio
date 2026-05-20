import { GalleryHeader } from "@/components/site-header";

export default function ArchiveLayout({
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
