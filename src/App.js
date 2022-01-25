import './App.css';
import React, { useState, useEffect } from 'react';
import Question from './Components/Question';
import Results from './Components/Results';
import axios from 'axios';
import Loading from './Reusable Components/Loading';

function App() {
  const [countries, setCountries] = useState(null);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [tryAgain, setTryAgain] = useState(false);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((res) => {
      setCountries([
        //Data for some capitals are not provided!
        ...res.data.filter((country) => country.capital && country),
      ]);
    });
  }, []);

  return (
    <div className="App">
      <div className="MainWrapper">
        <h1>Country Quiz</h1>
        <main>
          {countries && !wrongAnswer ? (
            <Question
              countries={countries}
              wrongAnswer={{ get: wrongAnswer, set: setWrongAnswer }}
              correctAnswers={{ get: correctAnswers, set: setCorrectAnswers }}
              tryAgain={tryAgain}
            />
          ) : wrongAnswer ? (
            <Results
              correctAnswers={correctAnswers}
              setWrongAnswer={setWrongAnswer}
              setCorrectAnswers={setCorrectAnswers}
            />
          ) : (
            <Loading />
          )}
        </main>
      </div>
      <div className="Credits">
        created by <span className="Creator">GeorgeKVR</span> - devChallenges.io
      </div>
    </div>
  );
}

export default App;
