import LegalPage, { legalMetadata } from "@/components/LegalPage";

export function generateMetadata() {
  return legalMetadata("datenschutz");
}
export default function Page() {
  return <LegalPage slug="datenschutz" />;
}
