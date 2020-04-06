import { BrowserWindowConstructorOptions, AboutPanelOptionsOptions } from 'electron'


export interface Configuration {

  appName: string

  protocol: string

  startUrl: string

  aboutPanelOptions?: AboutPanelOptionsOptions

  windowOptions?: BrowserWindowConstructorOptions
}