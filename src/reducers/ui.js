export const hoveredTrackId = (state = null, action) => {
  switch (action.type) {
    case 'HOVER_ON_TRACK':
      return action.data.id;
    case 'CLEAR_HOVERED_TRACK':
      return null;
    default:
      return state;
  }
};

export const activeSidebarTab = (state = 'playlists', action) => {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return action.data;
    case 'SELECT_PLAYLIST':
      return action.forceTabSwitch ? 'filters' : state;
    default:
      return state;
  }
};

// on first playlist select, automatically push user to Filters tab. after that, let user control tabs
export const autoSidebarTabSwitch = (state = true, action) => {
  switch (action.type) {
    case 'SELECT_PLAYLIST':
      return false;
    default:
      return state;
  }
};

export const newPlaylistName = (state = '', action) => {
  switch (action.type) {
    case 'SELECT_PLAYLIST':
      return 'Modified: ' + action.data.name;
    case 'CHANGE_NAME_TEXT':
      return action.data;
    default:
      return state;
  }
};

export const animateNextChartDraw = (state = true, action) => {
  switch (action.type) {
    case 'STOP_ANIMATING_CHART':
      return false;
    case 'ADD_FEATURES_DATA':
      return true;
    default:
      return state;
  }
};
