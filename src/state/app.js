import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showNavDrawer: false,
  showSystemInfoDrawer: false,
  showSetupDrawer: false,
  header: 'Switchblade'
}

export const app = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setShowNavDrawer: (state, { payload }) => {
      state.showNavDrawer = payload
    },
    setShowSystemInfoDrawer: (state, { payload }) => {
      state.showSystemInfoDrawer = payload
    },
    setShowSetupDrawer: (state, { payload }) => {
      state.showSetupDrawer = payload
    },
    setHeader: (state, { payload }) => {
      state.header = payload
    },
    resetApp: () => initialState
  }
})

export const { setShowNavDrawer, setShowSystemInfoDrawer, setShowSetupDrawer, setHeader, resetApp } = app.actions;

export const selectShowNavDrawer = (state) => state.app.showNavDrawer;
export const selectShowSystemInfoDrawer = (state) => state.app.showSystemInfoDrawer;
export const selectShowSetupDrawer = (state) => state.app.showSetupDrawer;
export const selectHeader = (state) => state.app.header;

export default app.reducer;