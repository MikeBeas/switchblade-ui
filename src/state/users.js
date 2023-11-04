import { createSlice } from '@reduxjs/toolkit';
import { DELETED_STATE_NO } from 'constants/deletedStates';
import { switchblade } from 'lib/switchblade';

const initialState = {
  users: [],
  loading: false,
  filters: {
    deleted: DELETED_STATE_NO,
    search: ''
  },
  searchTerm: '',
  user: {
    loading: false,
    details: {},
    error: null
  },
  newUser: false,
  error: null
}

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setUsersLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setUserError: (state, { payload }) => {
      state.user.error = payload;
    },
    setUserLoading: (state, { payload }) => {
      state.user.loading = payload;
    },
    setUser: (state, { payload }) => {
      state.user.details = payload;
    },
    setNewUser: (state, { payload }) => {
      state.newUser = payload;
    },
    updateUserFilters: (state, { payload }) => {
      state.filters = { ...state.filters, ...payload }
    },
    setUsersSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
    resetUserFilters: (state) => {
      state.filters = initialState.filters;
      state.searchTerm = initialState.searchTerm;
    },
    resetUsers: () => initialState
  }
})

export const { setUsers, setUsersLoading, setUser, setUserError, setUserLoading, setNewUser, updateUserFilters, setUsersSearchTerm, resetUserFilters, resetUsers } = users.actions;

export const selectUsers = (state) => state.users.users;
export const selectUserFilters = (state) => state.users.filters;
export const selectUsersSearchTerm = (state) => state.users.searchTerm;
export const selectUsersLoading = (state) => state.users.loading;
export const selectNewUser = (state) => state.users.newUser;

export const selectUser = (state) => state.users.user.details;
export const selectUserLoading = (state) => state.users.user.loading;
export const selectUserError = (state) => state.users.user.error;

export const loadUsers = () => async (dispatch, getState) => {
  const params = getState().users.filters ?? {};
  dispatch(setUsersLoading(true));

  try {
    const response = await switchblade.users.list(params);
    dispatch(setUsers(response.users ?? []));
    dispatch(setUsersLoading(false));
  } catch (e) {
    console.error(e);
  } finally {
    setUserLoading(false);
  }
}

export const loadUser = (userId) => async (dispatch) => {
  dispatch(setUserLoading(true));

  try {
    const response = await switchblade.users.get(userId);
    dispatch(setUser(response.user ?? {}));
  } catch (e) {
    dispatch(setUserError(e.message));
  } finally {
    dispatch(setUserLoading(false));
  }
}

export const modifyUser = (userId, body) => async (dispatch) => {
  dispatch(setUserLoading(true));

  try {
    const response = await switchblade.users.modify(userId, body);
    dispatch(loadUsers());
    dispatch(setUser(response.user ?? {}));
  } catch (e) {
    throw new Error(e.message)
  } finally {
    dispatch(setUserLoading(false));
  }
}

export const createUser = (body) => async (dispatch) => {
  dispatch(setUserLoading(true));

  try {
    const response = await switchblade.users.create(body);
    dispatch(loadUsers());
    dispatch(setUser(response.user ?? {}));
  } catch (e) {
    throw new Error(e.message)
  } finally {
    dispatch(setUserLoading(false));
  }
}

export default users.reducer;