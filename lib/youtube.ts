export function getYoutubeEmbedUrl(url: string): string {
  try {
    const videoId = new URL(url).searchParams.get('v');
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  } catch {
    return '';
  }
}