import { GalleryHeader } from "@/components/site-header";

export default function WorkLayout({
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
