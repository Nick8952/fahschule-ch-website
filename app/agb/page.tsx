import LegalPage, { legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata("agb");
export default function Page() {
  return <LegalPage slug="agb" />;
}
