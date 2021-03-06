import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import TracksTableHead from "../TracksTableHead";
import { testFeaturesData, testFilteredTracks } from "./test-data";

describe("TracksTableHead component", () => {
  const props = {
  features: testFeaturesData,
  handleColumnHeadingClick: () => {}
};

  it("renders without crashing", () => {
    const parentNode = document.createElement("table");
    ReactDOM.render(<TracksTableHead {...props} />, parentNode);
  });

  it("shallow render matches snapshot", () => {
    const tree = toJson(shallow(<TracksTableHead {...props} />));
    expect(tree).toMatchSnapshot();
  });
});
