export const state = () => ({
  screensaver_mode: false,
})

export const getters = {
  screensaverMode(state) {
    return state.screensaver_mode
  },
}

export const mutations = {
  setScreensaverMode(state, bool) {
    state.screensaver_mode = bool
  },
}
