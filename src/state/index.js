import { configureStore } from '@reduxjs/toolkit'
import app from './app';
import auth from './auth';
import server from './server';
import shortcuts from './shortcuts';
import versions from './versions';
import me from './me';
import users from './users';

export const store = configureStore({
  reducer: {
    app,
    server,
    auth,
    shortcuts,
    versions,
    me,
    users
  }
})