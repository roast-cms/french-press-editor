import keycode from "keycode";

/**
 * MarkHotkey - A plugin function that turns Slate plain text into formatted text with bold or italic styles.
 *
 * @param  {Object} options
 * @return {Event}  Change Transformation for Slate.
 */

export function MarkHotkey(options) {
  const { type, key } = options;
  return {
    onKeyDown(event, change) {
      if (change.value.focusBlock.type !== "paragraph") return;
      if (!event.metaKey || keycode(event.which) !== key) return;
      event.preventDefault();
      change.toggleMark(type);
      return true;
    }
  };
}
