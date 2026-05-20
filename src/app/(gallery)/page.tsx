import { PortfolioHome } from "@/components/portfolio/portfolio-home";
import { portfolio_sections } from "@/lib/portfolio-content";

export const dynamic = "force-static";

export default function Home() {
  return <PortfolioHome sections={portfolio_sections} />;
}
