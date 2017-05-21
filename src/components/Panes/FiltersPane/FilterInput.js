import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import Range from 'rc-slider/lib/Range';
import Handle from 'rc-slider/lib/Handle'; 

import ChartedFeatureCheckbox from './ChartedFeatureCheckbox';
import FeatureInfoTooltip from './FeatureInfoTooltip';

import acousticness from './img/acousticness.png';
import danceability from './img/danceability.png';
import energy from './img/energy.png';
import instrumentalness from './img/instrumentalness.png';
import liveness from './img/liveness.png';
import valence from './img/valence.png';

const imagesHash = {acousticness, danceability, energy, instrumentalness, liveness, valence};

const customHandle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="bottom"
      key={index}
    >
      <Handle {...restProps} />
    </Tooltip>
  );
};

class Filter extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const filterIndex = this.props.filterIndex;
    this.props.customHandleFilterChange(filterIndex, value);
  }

  render() {
    const filterData = this.props.filterData;
    const filterIndex = this.props.filterIndex;
    const currentValue = filterData.currentValue;

    const rangeOptions = {
      min: filterData.min,
      max: filterData.max,
      step: (filterData.max - filterData.min)/50,
      defaultValue: [filterData.min, filterData.max],
      value: currentValue,
      className: "filters__range",
      onChange: this.onChange,
    }

    return (
      <div className="filters__filter noselect">
        <h4>{filterData.displayName}&nbsp;
          <FeatureInfoTooltip 
            filter={filterData}
            filterIndex={filterIndex}
            {...this.props}
          />
          <ChartedFeatureCheckbox 
            filter={filterData}
            filterIndex={filterIndex}
            {...this.props}
          />
        </h4>
        <div className="filters__flex-container">
          <div className="filters__flex-left">
            <img className="filters__filter-icon img-responsive center-block" src={imagesHash[filterData.name]} alt={`${filterData.displayName} icon`} />
          </div>
          <div className="filters__flex-right">
            <Range customHandle={customHandle} {...rangeOptions} />
          </div>
        </div>
        
      </div>
    );
  }
}

export default Filter;