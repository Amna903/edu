/**
 * A client-side deterrent only: browsers cannot reliably prevent a user from opening
 * their own developer tools. Never rely on this for protecting secrets or authorisation.
 */
export function enableDeveloperToolsDeterrent(): () => void {
  const onKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    const opensDeveloperTools =
      event.key === "F12" ||
      (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key)) ||
      (event.ctrlKey && key === "u");

    if (opensDeveloperTools) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  const onContextMenu = (event: MouseEvent) => event.preventDefault();

  window.addEventListener("keydown", onKeyDown, true);
  window.addEventListener("contextmenu", onContextMenu);
  return () => {
    window.removeEventListener("keydown", onKeyDown, true);
    window.removeEventListener("contextmenu", onContextMenu);
  };
}
