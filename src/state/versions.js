import { createSlice } from '@reduxjs/toolkit';
import { DELETED_STATE_NO } from 'constants/deletedStates';
import { PRERELEASE_STATE_ALL } from 'constants/prereleaseStates';
import { REQUIRED_STATE_ALL } from 'constants/requiredStates';
import { VERSION_STATE_ALL } from 'constants/versionStates';
import { switchblade } from 'lib/switchblade';

const initialState = {
  shortcut: {},
  currentVersion: {
    loading: false,
    data: {},
    error: null
  },
  versions: [],
  loading: false,
  filters: {
    state: VERSION_STATE_ALL,
    deleted: DELETED_STATE_NO,
    prerelease: PRERELEASE_STATE_ALL,
    required: REQUIRED_STATE_ALL,
    search: '',
    creatorId: null
  },
  searchTerm: '',
  newVersion: false,
  creator: {
    options: [],
    loading: false,
    selected: null
  }
}

const versions = createSlice({
  name: 'versions',
  initialState,
  reducers: {
    setVersionsData: (state, { payload }) => {
      state.versions = payload.versions;
      state.shortcut = payload.shortcut;
    },
    setVersionsLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setCurrentVersion: (state, { payload }) => {
      state.currentVersion.data = payload;
    },
    setCurrentVersionLoading: (state, { payload }) => {
      state.currentVersion.loading = payload;
    },
    updateVersionFilters: (state, { payload }) => {
      state.filters = { ...state.filters, ...payload }
    },
    setVersionsSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
    resetVersionFilters: (state) => {
      state.filters = initialState.filters;
      state.searchTerm = initialState.searchTerm;
      state.creator = initialState.creator;
    },
    setVersionError: (state, { payload }) => {
      state.currentVersion.error = payload;
    },
    setNewVersion: (state, { payload }) => {
      state.newVersion = payload;
    },
    updateVersionsCreator: (state, { payload }) => {
      state.creator = { ...state.creator, ...payload };
    },
    resetVersions: () => initialState
  }
})

export const { setVersionsData, setVersionsLoading, resetVersions, updateVersionFilters, setVersionsSearchTerm, resetVersionFilters, setCurrentVersion, setCurrentVersionLoading, setVersionError, setNewVersion, updateVersionsCreator } = versions.actions;

export const selectVersions = (state) => state.versions.versions;
export const selectCurrentShortcut = (state) => state.versions.shortcut;
export const selectVersionsLoading = (state) => state.versions.loading;
export const selectVersionFilters = (state) => state.versions.filters;
export const selectVersionsSearchTerm = (state) => state.versions.searchTerm;

export const selectCurrentVersion = (state) => state.versions.currentVersion.data;
export const selectCurrentVersionLoading = (state) => state.versions.currentVersion.loading;
export const selectCurrentVersionError = (state) => state.versions.currentVersion.error;

export const selectNewVersion = (state) => state.versions.newVersion;

export const selectVersionsCreator = (state) => state.versions.creator;

export const loadVersionsForShortcut = (shortcutId) => async (dispatch, getState) => {
  const params = getState().versions.filters ?? {};
  dispatch(setVersionsLoading(true));

  try {
    const response = await switchblade.versions.list(shortcutId, params);
    dispatch(setVersionsData(response ?? { version: initialState.versions, shortcut: initialState.shortcut }))
  } catch (e) {
    console.error(e)
  } finally {
    dispatch(setVersionsLoading(false));
  }
}

export const loadCurrentVersion = (shortcutId, versionNumber) => async (dispatch) => {
  dispatch(setVersionError());
  dispatch(setCurrentVersionLoading(true));

  try {
    const response = await switchblade.versions.get(shortcutId, versionNumber);
    dispatch(setCurrentVersion(response.version));
  } catch (e) {
    dispatch(setVersionError(e.message));
  } finally {
    dispatch(setCurrentVersionLoading(false));
  }
}

export const modifyVersionForShortcut = (shortcutId, versionNumber, changes) => async (dispatch) => {
  dispatch(setCurrentVersionLoading(true));
  dispatch(setVersionError());

  try {
    const response = await switchblade.versions.modify(shortcutId, versionNumber, changes);
    dispatch(setCurrentVersion(response.version));
    dispatch(loadVersionsForShortcut(shortcutId));
  } catch (e) {
    dispatch(setCurrentVersionLoading(false));
    throw new Error(e.message);
  } finally {
    dispatch(setCurrentVersionLoading(false));
  }
}

export const newVersionForShortcut = (shortcutId, body) => async (dispatch) => {
  dispatch(setCurrentVersionLoading(true));
  dispatch(setVersionError());

  try {
    const response = await switchblade.versions.create(shortcutId, body);
    dispatch(setCurrentVersion(response.version));
    dispatch(setNewVersion(false));
    dispatch(loadVersionsForShortcut(shortcutId));
    dispatch(setCurrentVersionLoading(false));
  } catch (e) {
    throw new Error(e.message);
  } finally {
    dispatch(setCurrentVersionLoading(false));
  }
}

export default versions.reducer;