import { createSlice } from '@reduxjs/toolkit';
import { switchblade } from 'lib/switchblade';

const initialState = {
  loading: false,
  user: {}
}

export const me = createSlice({
  name: 'me',
  initialState,
  reducers: {
    setMe: (state, { payload }) => {
      state.user = payload
    },
    setMeLoading: (state, { payload }) => {
      state.loading = payload;
    },
    resetMe: () => initialState
  }
})

export const { setMe, setMeLoading, resetMe } = me.actions;

export const selectMe = (state) => state.me.user;
export const selectMeLoading = (state) => state.me.loading;

export const loadMe = () => async (dispatch) => {
  dispatch(setMeLoading(true));

  const response = await switchblade.me.get();

  dispatch(setMe(response.user));
  dispatch(setMeLoading(false));
}

export const modifyMe = (body) => async (dispatch) => {
  dispatch(setMeLoading(true));

  const response = await switchblade.me.modify(body);
  dispatch(setMe(response.user))
  dispatch(setMeLoading(false))
}

export const disableMfa = () => async (dispatch) => {
  dispatch(setMeLoading(true));

  const response = await switchblade.me.disableMfa();
  dispatch(setMe(response.user))
  dispatch(setMeLoading(false))
}

export default me.reducer;