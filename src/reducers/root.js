import { combineReducers } from 'redux';

import * as fetchStatusReducers from './fetchStatus';
import * as uiReducers from './ui';
import * as authReducers from './auth';
import { filterValues } from './filters';
import { playlists, selectedPlaylist } from './playlists';
import { tracks } from './tracks';

export const fetchStatus = combineReducers(fetchStatusReducers);
export const ui = combineReducers(uiReducers);
export const auth = combineReducers(authReducers);
export {filterValues, playlists, selectedPlaylist, tracks};