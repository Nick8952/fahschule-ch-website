import LegalPage, { legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata("impressum");
export default function Page() {
  return <LegalPage slug="impressum" />;
}
