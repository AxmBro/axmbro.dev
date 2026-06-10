// @axmbro: UCJ4h7Ph4PBivLl9FePFZFqQ
// @axmbro2: UCrmm0FiLHkbv9gNAmXjTCHw

interface YouTubeChannelItem {
  statistics: {
    subscriberCount?: string;
    viewCount?: string;
  };
}

const CHANNEL_IDS = 'UCJ4h7Ph4PBivLl9FePFZFqQ,UCrmm0FiLHkbv9gNAmXjTCHw';

export async function getYouTubeStats() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  if (!API_KEY) {
    return { subscribers: 0, views: 0 };
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_IDS}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      console.error('Failed to fetch YouTube stats', await res.text());
      return { subscribers: 0, views: 0 };
    }

    const data = await res.json();
    
    let totalSubscribers = 0;
    let totalViews = 0;

    data.items.forEach((item: YouTubeChannelItem) => {
      totalSubscribers += parseInt(item.statistics.subscriberCount || '0', 10);
      totalViews += parseInt(item.statistics.viewCount || '0', 10);
    });

    return { subscribers: totalSubscribers, views: totalViews };
  } catch (error) {
    console.error('Error fetching YouTube stats:', error);
    return { subscribers: 0, views: 0 };
  }
}

export function formatStatValue(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M+';
  }
  if (num >= 1000) {
    return Math.floor(num / 1000) + 'K+';
  }
  return num.toString() + '+';
}
