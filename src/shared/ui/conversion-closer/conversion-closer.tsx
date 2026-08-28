import type { ReactNode } from "react";
import { ScreenSection } from "@/shared/ui/screen-section";

interface ConversionCloserProps {
  id?: string;
  eyebrow: string;
  title: string;
  titleDescription: ReactNode;
  children: ReactNode;
}

export function ConversionCloser({
  id,
  eyebrow,
  title,
  titleDescription,
  children,
}: ConversionCloserProps) {
  return (
    <ScreenSection
      id={id}
      eyebrow={eyebrow}
      title={title}
      titleDescription={titleDescription}
      variant="accent"
      withChildrenPadding={false}
    >
      {children}
    </ScreenSection>
  );
}
