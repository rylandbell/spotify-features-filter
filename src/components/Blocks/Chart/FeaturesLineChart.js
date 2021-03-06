import React, { Component } from 'react';

//import components separately to reduce bundle size:
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import Legend from 'recharts/lib/component/Legend';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import Tooltip from 'recharts/lib/component/Tooltip';
import ReferenceLine from 'recharts/lib/cartesian/ReferenceLine';

import TrackInfoTooltip from './TrackInfoTooltip';

class FeaturesLineChart extends Component {
  //Don't animate chart on updates:
  componentWillUpdate(e) {
    if (this.props.animateNextChartDraw) {
      this.props.stopAnimatingChart();
    }
  }

  render() {
    const features = this.props.features;
    const filteredTracks = this.props.filteredTracks;
    const hoveredTrackId = this.props.hoveredTrackId;

    // (sort to move lines with isDim to back of chart)
    const graphedFeatures = features
      .filter(x => x.isGraphed)
      .sort((x, y) => y.isDim);

    //find the feature filter currently being dragged, when applicable
    const draggedFeatureIndex = features.findIndex(
      feature => feature.showReferenceLine
    );
    const showAnyReferenceLine = draggedFeatureIndex >= 0;

    //display vertical reference line for track when hovered in the table (not the chart);
    const hoveredTrack = filteredTracks.find(
      track => track.id === hoveredTrackId
    );
    const hoveredTrackName = hoveredTrack && hoveredTrack.name;

    //count track numbers from 1, not 0:
    const shiftedChartData = [{}].concat(filteredTracks);
    const hoveredTrackPosition = filteredTracks.indexOf(hoveredTrack) + 1;

    const xAxisInterval = shiftedChartData.length > 50 ? 9 : 4;

    //tweak chart layout for small screens
    const smallWindow =
      this.props.mediaType === 'extraSmall' || this.props.mediaType === 'small';

    return (
      <ResponsiveContainer width="100%" minWidth={200} minHeight={200} height={smallWindow ? 200 : 300}>
        <LineChart
          data={shiftedChartData}
          margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
        >
          <XAxis
            stroke="rgb(186,186,186)"
            strokeWidth={1}
            interval={xAxisInterval}
            label={smallWindow ? null : 'Track'}
            tick={{ dy: 5 }}
          />
          <YAxis
            stroke="rgb(186,186,186)  "
            strokeWidth={1}
            domain={[0, 1]}
            interval={1}
            tick={{ dx: -5 }}
            padding={{ bottom: 15 }}
          />
          <Legend
            iconSize={18}
            align={smallWindow ? 'center' : 'right'}
            verticalAlign={smallWindow ? 'bottom' : 'middle'}
            layout={smallWindow ? 'horizontal' : 'vertical'}
          />
          <ReferenceLine x={hoveredTrackPosition} label={hoveredTrackName} />
          {showAnyReferenceLine
            ? <ReferenceLine
                y={features[draggedFeatureIndex].currentValue[0]}
                label={features[draggedFeatureIndex].currentValue[0]}
                stroke={features[draggedFeatureIndex].color}
                strokeDasharray="3 3"
              />
            : null}
          {showAnyReferenceLine
            ? <ReferenceLine
                y={features[draggedFeatureIndex].currentValue[1]}
                label={features[draggedFeatureIndex].currentValue[1]}
                stroke={features[draggedFeatureIndex].color}
                strokeDasharray="3 3"
              />
            : null}
          <Tooltip content={<TrackInfoTooltip />} />
          {graphedFeatures.map(feature =>
            <Line
              dataKey={feature.name}
              name={feature.displayName}
              isAnimationActive={this.props.animateNextChartDraw}
              animationDuration={1500}
              type="monotone"
              stroke={feature.isDim ? feature.dimColor : feature.color}
              strokeWidth={2}
              dot={false}
              connectNulls={true}
              activeDot={{ r: 8 }}
              key={feature.name}
            />
          )}

        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default FeaturesLineChart;
