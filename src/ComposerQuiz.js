import React from "react";
import "./App.css";
import "./bootstrap.min.css";

function Hero() {
  return (
    <div className="jumbotron col-10 offset-1">
      <h1>Composer Quiz</h1>
      <p>Select the work written by the composer shown</p>
    </div>
  );
}

function Work({ title }) {
  return (
    <div className="answer">
      <h4>{title}</h4>
    </div>
  );
}

function Turn({ composer, works }) {
  return (
    <div className="row turn" style={{ backgroundColor: "white" }}>
      <div className="col-4 offset-1">
        <img src={composer.imageUrl} className="composerImage" alt="Composer" />
      </div>

      <div className="col-6">
        {works.map(title => (
          <Work title={title} key={title}></Work>
        ))}
      </div>
    </div>
  );
}

function Continue() {
  return <div />;
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

function ComposerQuiz({ turnData }) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData} />
      <Continue />
      <Footer />
    </div>
  );
}

export default ComposerQuiz;
