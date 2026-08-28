"use client";

import { Button } from "@/shared/ui/button";
import type { ButtonVariant } from "@/shared/ui/button";
import type { ProjectsBoardTab } from "@/shared/lib/projects-board-state";
import { ROUTES } from "@/shared/constants/routes";

interface ProjectsBoardButtonProps {
  text: string;
  tab?: ProjectsBoardTab;
  tag?: string;
  variant?: ButtonVariant;
}

export const ProjectsBoardButton = ({
  text,
  tab,
  tag,
  variant = "outline",
}: ProjectsBoardButtonProps) => (
  <Button
    text={text}
    variant={variant}
    href={ROUTES.projects}
    projectsBoardTab={tab}
    projectsBoardTag={tag}
  />
);
