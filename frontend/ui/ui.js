function setup() {
    return {
        isSidebarOpen: false,
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen
        },
        isSettingsPanelOpen: false,
        toggleSettingsPanel() {
            this.isSettingsPanelOpen = !this.isSettingsPanelOpen
        },
    }
}