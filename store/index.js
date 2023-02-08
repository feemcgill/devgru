export const state = () => ({
  screensaver_mode: true,
  mouse_pos: { x: 0, y: 0 },
})

export const getters = {
  screensaverMode(state) {
    return state.screensaver_mode
  },
  mousePos(state) {
    return state.mouse_pos
  },
}

export const mutations = {
  setScreensaverMode(state, bool) {
    state.screensaver_mode = bool
  },
  setMousePos(state, pos) {
    state.mouse_pos = pos
  },
}
