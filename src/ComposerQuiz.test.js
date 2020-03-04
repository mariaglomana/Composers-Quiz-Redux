import React from "react";
import ReactDOM from "react-dom";
import ComposerQuiz from "./ComposerQuiz";
// import Enzyme, { shallow, EnzymeAdapter } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";

describe("ComposerQuiz", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ComposerQuiz />, div);
  });
});
