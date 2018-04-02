// tools
import keycode from "keycode"

// return
export const TestPlugin = options => {
  const { key } = options

  return {
    onKeyDown(event, change) {
      const { value } = change
      if (!event.metaKey || keycode(event.which) !== key) return
      event.preventDefault()

      alert(`Mod + ${key} pressed. External plugins do work!`)
      return true
    }
  }
}
