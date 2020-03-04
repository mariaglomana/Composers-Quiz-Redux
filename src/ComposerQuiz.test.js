import React from "react";
import ReactDOM from "react-dom";
import ComposerQuiz from "./ComposerQuiz";
import Enzyme, { mount, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    works: [
      "Winterreise Lieder",
      "Variations on a Rococo Theme",
      "Double Concerto in A minor",
      "Hungarian Dances",
      "Viola Sonata Op. 147",
      "Kreutzer Violin Sonata",
      "Le nozze di Figaro"
    ],
    composer: {
      name: "Johannes Brahms",
      imageUrl: "images/composers/jbrahms.jpg",
      imageSource: "Wikimedia Commons",
      works: ["Double Concerto in A minor", "Hungarian Dances"]
    }
  },
  highlight: "none"
};

describe("ComposerQuiz", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <ComposerQuiz {...state} onAnswerSelected={() => {}} />,
      div
    );
  });

  describe("When no answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<ComposerQuiz {...state} onAnswerSelected={() => {}} />);
    });

    it("should have no background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
        ""
      );
    });
  });

  describe("When the wrong answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <ComposerQuiz
          {...Object.assign({}, state, { highlight: "wrong" })}
          onAnswerSelected={() => {}}
        />
      );
    });

    it("should have a red background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
        "red"
      );
    });
  });

  describe("When the correct answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <ComposerQuiz
          {...Object.assign({}, state, { highlight: "correct" })}
          onAnswerSelected={() => {}}
        />
      );
    });

    it("should have a green background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
        "green"
      );
    });
  });

  describe("When the first answer is selected", () => {
    let wrapper;
    const handleAnswerSelected = jest.fn();
    beforeAll(() => {
      wrapper = mount(
        <ComposerQuiz {...state} onAnswerSelected={handleAnswerSelected} />
      );
      wrapper
        .find(".answer")
        .first()
        .simulate("click");
    });

    it("onAnswerSelected should be called", () => {
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it("should receive Winterreise Lieder", () => {
      expect(handleAnswerSelected).toHaveBeenCalledWith("Winterreise Lieder");
    });
  });
});
