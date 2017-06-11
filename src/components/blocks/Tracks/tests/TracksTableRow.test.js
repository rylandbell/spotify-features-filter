import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import TracksTableRow from "../TracksTableRow";
import { testFeaturesData, testFilteredTracks } from "./test-data";

describe("TracksTableRow component", () => {
  const props = {
  features: testFeaturesData,
  track: testFilteredTracks[0],
  handleTrackRowHover: () => {},
};

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TracksTableRow {...props} />, div);
  });

  it("shallow render matches snapshot", () => {
    const tree = toJson(shallow(<TracksTableRow {...props} />));
    expect(tree).toMatchSnapshot();
  });
});
