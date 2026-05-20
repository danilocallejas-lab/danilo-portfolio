import { SiteFooter } from "@/components/site-footer";

export default function EditorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen">{children}</main>
      <SiteFooter />
    </>
  );
}
