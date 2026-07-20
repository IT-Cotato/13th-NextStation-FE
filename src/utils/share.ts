import copyToClipboard from "./copyToClipBoard";

export const isShareSupported = () => typeof navigator.share === "function";

export const share = async (
  data: ShareData,
): Promise<"shared" | "copiedToClipboard" | "cancelled" | "failed"> => {
  if (isShareSupported()) {
    try {
      await navigator.share(data);
      return "shared";
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") {
        return "cancelled";
      }
      return "failed";
    }
  }

  if (data.url) {
    const result = await copyToClipboard(data.url);

    if (result) {
      return "copiedToClipboard";
    }
  }

  return "failed";
};

export default share;
