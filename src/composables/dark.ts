export const isDark = useDark()
export const toggleHtmlDark = useToggle(isDark)

export const elBgColor = useCssVar('--el-bg-c', document.documentElement)

watch(isDark, () => {
  if (isDark.value)
    elBgColor.value = '#3336'
  else
    elBgColor.value = '#fff'
}, { immediate: true })

export const toggleDark = () => {
  toggleHtmlDark()
}
