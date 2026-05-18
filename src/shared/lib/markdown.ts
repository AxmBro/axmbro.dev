import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_PATH = path.join(process.cwd(), "src/shared/constants/projects");

export interface ProjectMarkdownData {
  id: string;
  title: string;
  description: string;
  creditsDescription?: string;
  extraButtons?: { text: string; href: string; external?: boolean }[];
  credits?: { role: string; name: string; href: string }[];
  videos?: { title: string; description: string; youtubeId: string }[];
  imageSections?: {
    title: string;
    description: string;
    rowStyle?: boolean;
    items: { title: string; description: string; imageSrc?: string }[];
  }[];
  content: string;
}

export async function getProjectData(id: string): Promise<ProjectMarkdownData | null> {
  try {
    const filePath = path.join(CONTENT_PATH, `${id}.md`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      id,
      title: data.title || "",
      description: data.description || "",
      creditsDescription: data.creditsDescription,
      extraButtons: data.extraButtons,
      credits: data.credits,
      videos: data.videos,
      imageSections: data.imageSections,
      content,
    };
  } catch (error) {
    console.error(`Error loading project data for ${id}:`, error);
    return null;
  }
}
