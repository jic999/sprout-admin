export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export const {
  isFullscreen,
  enter: enterFullscreen,
  exit: exitFullscreen,
  toggle: toggleFullscreen,
} = useFullscreen(document.documentElement)
