import { NextResponse } from "next/server";
import { PROJECTS } from "@/shared/constants/data";
import { collectProjectGalleryImageMeta, getProjectData } from "@/entities/project/server";

interface RouteContext {
  params: Promise<{ projectId: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { projectId } = await context.params;
  const project = PROJECTS.find((item) => item.url === projectId);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const pageData = await getProjectData(projectId);
  const images = collectProjectGalleryImageMeta(project, pageData);

  return NextResponse.json(
    { images },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
