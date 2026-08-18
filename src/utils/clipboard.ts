const getDummyTextarea = () => {
  const textarea = document.createElement("textarea") as HTMLTextAreaElement;
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.position = "fixed";

  return textarea;
};

export const isClipboardSupported = () => navigator?.clipboard != null;
export const isClipboardCommandSupported = () =>
  document.queryCommandSupported?.("copy") ?? false;

export const copyToClipboard = async (text: string): Promise<boolean> => {
  const rootElement = document.body;

  if (!isClipboardCommandSupported()) {
    return false;
  }

  const textarea = getDummyTextarea();
  textarea.value = text;

  rootElement.appendChild(textarea);

  textarea.focus();
  textarea.select();

  const succeeded = document.execCommand("copy");
  rootElement.removeChild(textarea);

  return succeeded;
};

export default copyToClipboard;
