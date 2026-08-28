import styles from "./youtube-embed.module.scss";

interface YoutubeEmbedProps {
  youtubeId: string;
  title: string;
}

export function YoutubeEmbed({ youtubeId, title }: YoutubeEmbedProps) {
  return (
    <div className={styles.container}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
