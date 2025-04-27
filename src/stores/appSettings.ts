import { defineStore } from 'pinia'

export type AppSettingItem = {
  id: string
  label: string | null
  value: string | null
}

export type AppSetting = {
  dashboardTopImage: AppSettingItem
  dashboardArtImage: AppSettingItem
  dashboardGoalImage: AppSettingItem
  dashboardFooter: AppSettingItem
  aboutUsMain: AppSettingItem
  aboutUsTopLeft: AppSettingItem
  aboutUsTopRight: AppSettingItem
  aboutUsArt: AppSettingItem
  aboutUsGoal: AppSettingItem
  aboutUsBottomLeft: AppSettingItem
  aboutUsBottomRight: AppSettingItem
  aboutUsFooter: AppSettingItem
  contactMain: AppSettingItem
}

export const useAppSettingsStore = defineStore('appSettings', {
  state: () => ({
    appSettingsLoading: true,
    appSettings: getLocalItem<string>('appSettings') || (null as any | null)
  }),
  actions: {
    async setAppSettings() {
      this.appSettingsLoading = true
      this.appSettings = getLocalItem('appSettings')

      if (!this.appSettings) {
        try {
          const response = await useNuxtApp().$axios.get('/app-settings')
          this.appSettings = {}
          await response.data.forEach((item: AppSettingItem) => {
            this.appSettings[formatKebabToCamelCase(item.label as string)] =
              item.value
          })
          setLocalItem('appSettings', this.appSettings, 600_000) // 10 min
        } catch (error) {
          console.error('API Error:', error)
        } finally {
          this.appSettingsLoading = false
        }
      } else {
        this.appSettingsLoading = false
      }
    }
  }
})
