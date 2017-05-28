import React from 'react';
import ExploreTracksView from './ExploreTracksView';
import Instructions from '../../../Blocks/Instructions/Instructions';
import Message from '../../../Blocks/Message/Message';
import './MainRegion.css';

const MainRegion = ({badAuthToken, selectedPlaylistTracks, selectedPlaylistAudioFeatures, fetchStatus, fullState}) => {
  const tracksLoaded = selectedPlaylistTracks && selectedPlaylistTracks.length > 0;
  const featuresLoaded = selectedPlaylistAudioFeatures && selectedPlaylistAudioFeatures.length > 0;
  const dataLoaded = tracksLoaded && featuresLoaded;
  const fetchPending = fetchStatus.getTracksPending || fetchStatus.getFeaturesPending;
  const fetchFailure = fetchStatus.getTracksFailure || fetchStatus.getFeaturesFailure;

  let content;
  
  if (badAuthToken) {
    content = <Message classList="big" error={true} text="Refreshing authorization token..." />
  } else if (fetchPending) {
    content = <Message classList="big" loading={true} text="Loading tracks data... " />;
  } else if (fetchFailure) {
    content = <Message classList="big" error={true} text="Error: failed to load tracks data." />;
  } else if (dataLoaded) {
    content = <ExploreTracksView selectedPlaylistTracks={selectedPlaylistTracks} selectedPlaylistAudioFeatures={selectedPlaylistAudioFeatures} fullState={fullState} />;
  } else {
    content = <Instructions />;
  }

  return (
    <div className="main-region">
      {content}
    </div>
  );
}

export default MainRegion;

