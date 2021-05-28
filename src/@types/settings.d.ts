declare module 'my-settings-type' {
  import {Updater} from 'use-immer'
  import {ThemeBase, ThemeSupplement, ThemeProps} from 'my-theme-type'

  export type BaseThemePickerProps = {
    current: ThemeBase,
    setTheme: Updater<ThemeProps>,
  }
  export type BaseThemePickerItemProps = BaseThemePickerProps & {
    base: ThemeBase,
  }

  export type ThemePickerProps = {
    base: ThemeBase,
    supplement: ThemeSupplement

    isActive: boolean,
    setTheme: Updater<ThemeProps>,
  }
}
