import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import "./bootstrap.min.css";
import PropTypes from "prop-types";

function Hero() {
  return (
    <div className="jumbotron col-10 offset-1">
      <h1>Composer Quiz</h1>
      <p>Select the work written by the composer shown</p>
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
      className="row turn"
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
    <div className="row continue">
      {show ? (
        <div className="col-11">
          <button
            className="btn btn-primary btn-lg float-right continue"
            onClick={onContinue}
          />
        </div>
      ) : null}
    </div>
  );
}

function Footer() {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">
          All images are from{" "}
          <a href="http://commons.wikimedia.org/wiki/Main_Page">
            Wikimedia Commons
          </a>{" "}
          and are in the public domain
        </p>
      </div>
    </div>
  );
}

function ComposerQuiz({ turnData, highlight, onAnswerSelected, onContinue }) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn
        {...turnData}
        highlight={highlight}
        onAnswerSelected={onAnswerSelected}
      />
      <Continue show={highlight === "correct"} onContinue={onContinue} />
      <p>
        <Link to="/add">Add a composer</Link>
      </p>
      <Footer />
    </div>
  );
}

export default ComposerQuiz;
