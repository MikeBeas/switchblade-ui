import { createSlice } from '@reduxjs/toolkit';
import { DELETED_STATE_NO } from 'constants/deletedStates';
import { SHORTCUT_STATE_ALL } from 'constants/shortcutStates';
import { switchblade } from 'lib/switchblade';

const initialState = {
  shortcuts: [],
  loading: false,
  shortcut: {
    loading: false,
    details: {},
    error: null
  },
  filters: {
    state: SHORTCUT_STATE_ALL,
    deleted: DELETED_STATE_NO,
    search: '',
    creatorId: null
  },
  searchTerm: '',
  creator: {
    options: [],
    loading: false,
    selected: null
  }
}

const shortcuts = createSlice({
  name: 'shortcuts',
  initialState,
  reducers: {
    setShortcuts: (state, { payload }) => {
      state.shortcuts = payload;
    },
    setShortcutsLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setShortcutLoading: (state, { payload }) => {
      state.shortcut.loading = payload;
    },
    setShortcutDetails: (state, { payload }) => {
      state.shortcut.details = payload;
    },
    setShortcutError: (state, { payload }) => {
      state.shortcut.error = payload;
    },
    updateShortcutFilters: (state, { payload }) => {
      state.filters = { ...state.filters, ...payload }
    },
    setShortcutsSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
    resetShortcutFilters: (state) => {
      state.filters = initialState.filters;
      state.searchTerm = initialState.searchTerm;
      state.creator = initialState.creator;
    },
    updateShortcutsCreator: (state, { payload }) => {
      state.creator = { ...state.creator, ...payload };
    },
    resetShortcut: (state) => {
      state.shortcut = initialState.shortcut;
    },
    resetShortcuts: () => initialState
  }
})

export const { setShortcuts, setShortcutsLoading, setShortcutLoading, setShortcutDetails, setShortcutError, resetShortcut, resetShortcuts, updateShortcutFilters, setShortcutsSearchTerm, updateShortcutsCreator, resetShortcutFilters } = shortcuts.actions;

export const selectShortcuts = (state) => state.shortcuts.shortcuts;
export const selectShortcutsLoading = (state) => state.shortcuts.loading;
export const selectShortcutFilters = (state) => state.shortcuts.filters;
export const selectShortcutsSearchTerm = (state) => state.shortcuts.searchTerm;

export const selectShortcut = (state) => state.shortcuts.shortcut.details;
export const selectShortcutLoading = (state) => state.shortcuts.shortcut.loading;
export const selectShortcutError = (state) => state.shortcuts.shortcut.error;

export const selectShortcutsCreator = (state) => state.shortcuts.creator;

export const loadShortcuts = () => async (dispatch, getState) => {
  const params = getState().shortcuts.filters ?? {};
  dispatch(setShortcutsLoading(true));

  try {
    const response = await switchblade.shortcuts.list(params);
    dispatch(setShortcuts(response.shortcuts ?? []));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(setShortcutsLoading(false));
  }
}

export const loadShortcut = (shortcutId) => async (dispatch) => {
  dispatch(setShortcutLoading(true));

  try {
    const response = await switchblade.shortcuts.get(shortcutId);
    dispatch(setShortcutDetails(response.shortcut ?? {}));
  } catch (e) {
    dispatch(setShortcutError(e.message));
  } finally {
    dispatch(setShortcutLoading(false));
  }
}

export const modifyShortcut = (shortcutId, body) => async (dispatch) => {
  dispatch(setShortcutLoading(true));

  try {
    const response = await switchblade.shortcuts.modify(shortcutId, body);
    dispatch(loadShortcuts());
    dispatch(setShortcutDetails(response.shortcut ?? {}));
  } catch (e) {
    console.error(e);
  }
}

export const createShortcut = (body) => async (dispatch) => {
  dispatch(setShortcutLoading(true));

  try {
    const response = await switchblade.shortcuts.create(body);
    dispatch(loadShortcuts());
    dispatch(setShortcutDetails(response.shortcut ?? {}));
  } catch (e) {
    console.error(e);
  }
}

export default shortcuts.reducer;