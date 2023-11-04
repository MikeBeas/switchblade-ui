import { createSlice } from '@reduxjs/toolkit';
import { resetShortcuts } from './shortcuts';
import { resetVersions } from './versions';
import { loadServerConfig } from './server';
import { resetMe } from './me';
import { resetApp } from 'state/app';

import { switchblade } from 'lib/switchblade';

const initialState = {
  token: localStorage.getItem('token'),
  loading: false,
  tokenExpired: false
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state, { payload }) => {
      state.loading = payload
    },
    setTokenExpired: (state, { payload }) => {
      state.tokenExpired = payload
    },
    resetAuth: () => initialState
  }
})

export const { setAuthLoading, setTokenExpired, resetAuth } = auth.actions;

export const selectToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectTokenExpired = (state) => state.auth.tokenExpired;

export const logout = (tokenExpired = false) => (dispatch) => {
  localStorage.removeItem("token");

  switchblade.authenticate();
  dispatch(resetAuth());
  dispatch(setTokenExpired(tokenExpired));
  dispatch(resetShortcuts());
  dispatch(resetVersions());
  dispatch(resetMe());
  dispatch(loadServerConfig());
  dispatch(resetApp());
}

export default auth.reducer;