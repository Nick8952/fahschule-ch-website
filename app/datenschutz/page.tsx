import LegalPage, { legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata("datenschutz");
export default function Page() {
  return <LegalPage slug="datenschutz" />;
}
