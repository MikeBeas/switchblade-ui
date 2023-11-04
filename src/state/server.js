import { createSlice } from '@reduxjs/toolkit';
import { switchblade } from 'lib/switchblade';

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  api: {
    host: null,
    production: false,
    authenticated: false,
    user: {
      id: null,
      username: null,
      permissions: {}
    }
  },
  switchblade: {
    version: null
  },
  features: [],
  permissions: {}
}

const server = createSlice({
  name: 'server',
  initialState,
  reducers: {
    setServerConfig: (_, { payload }) => ({ loaded: true, loading: false, features: payload.features ?? [], ...payload }),
    setServerConfigLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setServerError: (state, { payload }) => {
      state.error = payload
    }
  }
})

export const { setServerConfig, setServerError, resetServerConfig, setServerConfigLoading } = server.actions;

export const selectServerConfig = (state) => state.server;
export const selectCurrentUser = (state) => state.server.api.user;
export const selectPermissions = (state) => state.server.permissions;

export const loadServerConfig = () => async (dispatch) => {
  if (!switchblade.hasHost()) return;
  dispatch(setServerConfigLoading(true));
  try {
    const response = await switchblade.core.getServerConfig();
    dispatch(setServerConfig(response));
  } catch (e) {
    dispatch(setServerError(`There was an error connecting to the Switchblade server.`))
  }
  dispatch(setServerConfigLoading(false));
}

export default server.reducer;