import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./App.scss";
import PropTypes from "prop-types";

function Hero() {
  return (
    <div className="hero jumbotron jumbotron-fluid col-10 offset-1">
      <div className="hero__wrapper">
        <img
          className="hero__logo"
          alt="conductor logo"
          src="./images/conductor.png"
        />
        <h1 className="hero__title">Composers Quiz</h1>
        <p>Select the work written by the composer shown</p>
      </div>
      {/* <button className="hero__addBtn"> */}
      <button className="hero__addBtn btn ">
        {" "}
        <Link to="/add">Add a composer</Link>
      </button>
    </div>
  );
}

function Work({ title, onClick }) {
  return (
    <div
      className="answer"
      onClick={() => {
        onClick(title);
      }}
    >
      <h4>{title}</h4>
    </div>
  );
}

function Turn({ composer, works, highlight, onAnswerSelected }) {
  function highlightToBgColor(highlight) {
    const mapping = {
      none: "",
      correct: "green",
      wrong: "red"
    };
    return mapping[highlight];
  }

  return (
    <div
      className="row turn__wrapper col-10 offset-1"
      style={{ backgroundColor: highlightToBgColor(highlight) }}
    >
      <div className="col-4 offset-1">
        <img src={composer.imageUrl} className="composerImage" alt="Composer" />
      </div>

      <div className="col-6">
        {works.map(title => (
          <Work title={title} key={title} onClick={onAnswerSelected}></Work>
        ))}
      </div>
    </div>
  );
}
Turn.propTypes = {
  composer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    works: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  works: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

function Continue({ show, onContinue }) {
  return (
    <div className="continue">
      {show ? (
        <div className="">
          <button
            className="continue__btn btn btn-primary  col-1 float-right "
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Footer({ highlight, onContinue }) {
  return (
    <div id="footer" className="footer col-10 offset-1 row">
      <small className="text-muted footer__credit">
        All images are from{" "}
        <a href="http://commons.wikimedia.org/wiki/Main_Page">
          Wikimedia Commons
        </a>{" "}
        and are in the public domain
      </small>
      <Continue show={highlight === "correct"} onContinue={onContinue} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    turnData: state.turnData,
    highlight: state.highlight
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAnswerSelected: answer => {
      dispatch({ type: "ANSWER_SELECTED", answer });
    },
    onContinue: () => {
      dispatch({ type: "CONTINUE" });
    }
  };
}

const ComposerQuiz = connect(
  mapStateToProps,
  mapDispatchToProps
)(function({ turnData, highlight, onAnswerSelected, onContinue }) {
  return (
    <div className="container-fluid quiz-wrapper">
      <Hero />
      <Turn
        {...turnData}
        highlight={highlight}
        onAnswerSelected={onAnswerSelected}
      />
      <Footer highlight={highlight} onContinue={onContinue} />
    </div>
  );
});

export default ComposerQuiz;
