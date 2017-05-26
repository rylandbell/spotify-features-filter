import React, { Component } from 'react';
import './PreAuthLayout.css';

import Instructions from '../../Blocks/Instructions/Instructions';

class PreAuthLayout extends Component {
  render() {
    return (
      <div className="pre-auth-layout">
        <Instructions {...this.props} />
      </div>
    );
  }
}

export default PreAuthLayout;
