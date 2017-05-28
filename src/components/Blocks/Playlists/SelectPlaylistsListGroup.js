import React from 'react';
import SelectPlaylistsListItem from './SelectPlaylistsListItem';

const SelectPlaylistsListGroup = ({accessToken, playlists, selectedPlaylist, autoSidebarTabSwitch, handlePlaylistSelect}) => {
  const mappedPlaylists = playlists.map(list => 
    <SelectPlaylistsListItem 
      key={list.id} 
      playlist={list} 
      accessToken={accessToken}
      selectedPlaylist={selectedPlaylist}
      autoSidebarTabSwitch={autoSidebarTabSwitch}
      handlePlaylistSelect={handlePlaylistSelect}
    />
  );
  
  return (
    playlists.length > 0 ? 
      <div className="list-group">{mappedPlaylists}</div> :
      <p>No playlists found for this account.</p>
  );
}

export default SelectPlaylistsListGroup;