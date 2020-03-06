import React from "react";
import ReactDOM from "react-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import "./bootstrap.min.css";
import "./index.css";
import "./AddComposerForm.scss";

import AddComposerForm from "./AddComposerForm";
import ComposerQuiz from "./ComposerQuiz";
import { shuffle, sample } from "underscore";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";
import composers from "./data/composers";

//REACT-REDUX func

function reducer(
  state = { composers, turnData: getTurnData(composers), highlight: "" },
  action
) {
  switch (action.type) {
    case "ANSWER_SELECTED":
      const isCorrect = state.turnData.composer.works.some(
        work => work === action.answer
      );
      return Object.assign({}, state, {
        highlight: isCorrect ? "correct" : "wrong"
      });
    case "CONTINUE":
      return Object.assign({}, state, {
        highlight: "",
        turnData: getTurnData(state.composers)
      });
    case "ADD_COMPOSER":
      return Object.assign({}, state, {
        composers: state.composers.concat([action.composer])
      });
    default:
      return state;
  }
  return state;
}

let store = Redux.createStore(
  reducer,

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function getTurnData(composers) {
  const allWorks = composers.reduce(function(acc, currentVal) {
    return acc.concat(currentVal.works);
  }, []);
  const fourRandomWorks = shuffle(allWorks).slice(0, 4);
  const answer = sample(fourRandomWorks);
  return {
    works: fourRandomWorks,
    composer: composers.find(composer =>
      composer.works.some(title => title === answer)
    )
  };
}

ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={store}>
      <>
        <Route exact path="/" component={ComposerQuiz} />
        <Route path="/add" component={AddComposerForm} />
      </>
    </ReactRedux.Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.register();
