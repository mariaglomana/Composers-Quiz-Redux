import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow, EnzymeAdapter } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// import { render } from "@testing-library/react";
// import ComposerQuiz from "./ComposerQuiz";

// test("renders learn react link", () => {
//   const { getByText } = render(<ComposerQuiz />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

function Hello(props) {
  return <h1>Hello at {props.now}</h1>;
}

const moment = new Date(1588946400000);

describe("When setting up testing", () => {
  let result;
  beforeAll(() => {
    result = Hello({ now: moment.toISOString() });
  });

  it("return a value", () => {
    expect(result).not.toBeNull();
  });

  it("is a h1", () => {
    expect(result.type).toBe("h1");
  });

  it("has children", () => {
    expect(result.props.children).toBeTruthy();
  });

  // it("should fail", () => {
  //   expect(1 + 1).toBe(3);
  // });
});

describe("When testing with ReactDOM", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Hello now={moment.toISOString()} />, div);
  });
});

Enzyme.configure({ adapter: new Adapter() });

describe("When testing with Enzyme", () => {
  it("renders a h1", () => {
    const wrapper = shallow(<Hello now={moment.toISOString()} />);
    expect(wrapper.find("h1").length).toBe(1);
  });

  it("contains Hello at 2020-05-08T14:00:00.000Z", () => {
    const wrapper = shallow(<Hello now={moment.toISOString()} />);
    expect(wrapper.contains(<h1>Hello at 2020-05-08T14:00:00.000Z</h1>)).toBe(
      true
    );
  });
});
