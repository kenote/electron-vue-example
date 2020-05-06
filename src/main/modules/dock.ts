/**
 * Dock 菜单, Only MacOS
 */
import { Menu, MenuItem, MenuItemConstructorOptions } from 'electron'

export const applicationDockMenu = (): Menu => {
  let applicationMenuTemplate: Array<MenuItem | MenuItemConstructorOptions> = [
    
  ]

  return Menu.buildFromTemplate(applicationMenuTemplate)
}
