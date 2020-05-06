import { remote } from 'electron'
import { Theme } from '@/types/theme'

const lightTheme: string = 'green'
const drakTheme: string = 'dark'
export const themes: Theme[] = [
  {
    key: 'green',
    name: '绿色',
    style: 'green',
    theme: 'light-green'
  },
  {
    key: 'red',
    name: '红色',
    style: 'red',
    theme: 'light-red'
  },
  {
    key: 'dark',
    name: '暗黑',
    style: 'dark',
    theme: 'dark',
    isDark: true
  },
  {
    key: 'auto',
    name: '自动',
    style: 'auto',
    theme: 'auto'
  },
]

/**
 * 切换主题
 * @param key 
 * @param isDark 
 */
export function setTheme (key: string, isDark?: boolean): void {
  if (isDark === undefined) {
    isDark = remote.nativeTheme.shouldUseDarkColors
  }
  if (key === 'auto') {
    key = isDark ? drakTheme : lightTheme
  }
  let theme: Theme = themes.find( o => o.key === key)!
  if (!theme || !window) return
  window.document.documentElement.setAttribute('data-theme', theme.theme)
}