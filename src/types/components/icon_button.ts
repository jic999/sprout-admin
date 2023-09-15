import type { ButtonProps } from 'naive-ui'

interface ExtendProps {
  icon: string
  iconSize?: number
}

export interface IconButtonProps extends ExtendProps, ButtonProps {}
