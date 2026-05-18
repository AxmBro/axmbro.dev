import Link from "next/link";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button } from "@/shared/ui/button";

export default function NotFound() {
  return (
    <ScreenContainer>
      <ScreenSection
        id="not-found"
        title="404 - Not Found"
        titleDescription="Seems like this path doesn't exist."
      >
        <Link href="/">
          <Button text="Back to Home" variant="primary" />
        </Link>
      </ScreenSection>
    </ScreenContainer>
  );
}
