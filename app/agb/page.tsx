import LegalPage, { legalMetadata } from "@/components/LegalPage";

export function generateMetadata() {
  return legalMetadata("agb");
}
export default function Page() {
  return <LegalPage slug="agb" />;
}
