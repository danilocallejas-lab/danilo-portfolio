import { GalleryHeader } from "@/components/site-header";

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GalleryHeader />
      <main className="min-h-screen">{children}</main>
    </>
  );
}
