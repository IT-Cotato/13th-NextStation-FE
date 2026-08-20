const FALLBACK_SHARE_ORIGIN =
  "https://next-station-git-develop-canofmatos-projects.vercel.app";

export function buildSharedCoursePath(shareToken: string) {
  return `/course/share/${shareToken}/verify`;
}

export function buildSharedCourseUrl(
  shareToken: string,
  origin =
    typeof window !== "undefined"
      ? window.location.origin
      : FALLBACK_SHARE_ORIGIN,
) {
  const normalizedOrigin = origin.endsWith("/") ? origin.slice(0, -1) : origin;

  return `${normalizedOrigin}${buildSharedCoursePath(shareToken)}`;
}
