import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AddComposerForm from "./AddComposerForm";
import ComposerQuiz from "./ComposerQuiz";
import { shuffle, sample } from "underscore";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, withRouter } from "react-router-dom";

const composers = [
  {
    name: "Johannes Sebastian Bach",
    imageUrl: "images/composers/jbach.jpg",
    imageSource: "Wikimedia Commons",
    works: [
      "Goldberg Variations",
      "Suites for cello solo",
      "St Matthew Passion",
      "The Well-Tempered Clavier"
    ]
  },
  {
    name: "Giuseppe Verdi",
    imageUrl: "images/composers/gverdi.jpg",
    imageSource: "Wikimedia Commons",
    works: ["La traviata", "Aida", "Otello", "La forza del destino"]
  },
  {
    name: "Johannes Brahms",
    imageUrl: "images/composers/jbrahms.jpg",
    imageSource: "Wikimedia Commons",
    works: [
      "Double Concerto in A minor",
      "Clarinet Sonata No. 2 in E♭ major",
      'Piano Quartet No. 3 in C minor ("Werther Quartet")',
      "Hungarian Dances"
    ]
  },
  {
    name: "Wolfgang Amadeus Mozart",
    imageUrl: "images/composers/wamozart.jpg",
    imageSource: "Wikimedia Commons",
    works: [
      "Sinfonia Concertante for Violin, Viola and Orchestra in E♭ major",
      "Le nozze di Figaro",
      "Requiem Mass in D minor",
      "Die Zauberflöte"
    ]
  },
  //   {
  //     name: "George Frideric Händel",
  //     imageUrl: "images/composers/gverdi.jpg",
  //     imageSource: "Wikimedia Commons",
  //     works: ["La traviata"]
  //   },
  //   {
  //     name: "Fŕedéric Chopin",
  //     imageUrl: "images/composers/gverdi.jpg",
  //     imageSource: "Wikimedia Commons",
  //     works: ["La traviata"]
  //   },
  //   {
  //     name: "Antonio Vivaldi",
  //     imageUrl: "images/composers/gverdi.jpg",
  //     imageSource: "Wikimedia Commons",
  //     works: ["La traviata"]
  //   },
  //   {
  //     name: "Joseph Haydn",
  //     imageUrl: "images/composers/gverdi.jpg",
  //     imageSource: "Wikimedia Commons",
  //     works: ["La traviata"]
  //   },
  {
    name: "Ludwig Van Beethoven",
    imageUrl: "images/composers/lvbeethoven.jpg",
    imageSource: "Wikimedia Commons",
    works: [
      "Kreutzer Violin Sonata",
      "Fidelio",
      "Pastoral Symphony",
      "Grosse Fugue Op.133"
    ]
  },
  {
    name: "Dimitri Shostakovich",
    imageUrl: "images/composers/dshostakovich.jpg",
    imageSource: "Wikimedia Commons",
    works: [
      "Symphony No. 7 in C major, Leningrad",
      "Viola Sonata Op. 147",
      "String Quartet Node.8 in C minor op. 110: IV Largo",
      "Jazz Suite No.2: VI: Watz No.2"
    ]
  },
  {
    name: "Pyotr Ilyich Tchaikovsky",
    imageUrl: "images/composers/ptchaikovsky.jpg",
    imageSource: "Wikimedia Commons",
    works: [
      "The Nutcracker ballet",
      "Symphony No.6 'Pathétique'",
      "Variations on a Rococo Theme",
      "Romeo and Juliet"
    ]
  },
  {
    name: "Franz Schubert",
    imageUrl: "images/composers/fschubert.jpg",
    imageSource: "Wikimedia Commons",
    works: [
      'Sonata "Arpeggione"',
      "Winterreise Lieder",
      "Piano Trio in E-Flat Major, D.929: II.Andante con moto",
      "Die Schöne Müllerin"
    ]
  }
];

function resetState() {
  return { turnData: getTurnData(composers), highlight: "" };
}

let state = resetState();

function App() {
  return (
    <ComposerQuiz
      {...state}
      onAnswerSelected={onAnswerSelected}
      onContinue={() => {
        state = resetState();
        render();
      }}
    />
  );
}

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

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.composer.works.some(work => work === answer);
  state.highlight = isCorrect ? "correct" : "wrong";
  render();
}

const ComposerWrapper = withRouter(({ history }) => (
  <AddComposerForm
    onAddComposer={composer => {
      composers.push(composer);
      history.push("/");
    }}
  />
));

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <>
        <Route exact path="/" component={App} />
        <Route path="/add" component={ComposerWrapper} />
      </>
    </BrowserRouter>,
    document.getElementById("root")
  );
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
