import React, { useState, useCallback, useMemo } from 'react';
import Li from '../Reusable Components/Li';
import adventure from '../Assets/undraw_adventure_4hum 1.svg';
import Button from '../Reusable Components/Button';

const Question = (props) => {
  const { countries, wrongAnswer, correctAnswers } = props;
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [questionType, setQuestionType] = useState('flag');
  const [nextClicked, setNextClicked] = useState(false);

  const getRandCountry = useCallback(() => {
    const rand = Math.round(Math.random() * (countries.length - 1 - 0) + 0);
    return {
      id: rand,
      country: {
        capital: countries[rand].capital[0],
        name: countries[rand].name.common,
        flag: countries[rand].flags.svg,
      },
    };
  }, [countries, nextClicked]);

  const answers = useMemo(
    () =>
      [
        { ...getRandCountry(), correct: true },
        { ...getRandCountry(), correct: false },
        { ...getRandCountry(), correct: false },
        { ...getRandCountry(), correct: false },
      ].sort((a, b) => a.id - b.id),
    [getRandCountry]
  );

  const getCorrectData = () => {
    const filteredAnswers = answers.filter((answer) => answer.correct === true);
    const country = filteredAnswers[0].country;

    return {
      capital: country.capital,
      countryName: country.name,
      flag: country.flag,
    };
  };

  const onClickHandler = (elem) => {
    const countryName = elem.innerText.slice(1, elem.innerText.length).trim();
    setIsAnswerSelected(true);

    if (countryName === getCorrectData().countryName) {
      correctAnswers.set((prevValue) => prevValue + 1);
      elem.classList.toggle('correctAnswer');
    } else {
      wrongAnswer.set(true);
    }
  };

  return (
    <div className="QuestionWrapper">
      <img src={adventure} alt="globus" className="GlobusImg"></img>
      {questionType === 'flag' && (
        <img className="Flag" src={getCorrectData().flag} alt="flag"></img>
      )}
      <h2 className="Question">
        {questionType === 'capital'
          ? `${getCorrectData().capital} is the capital of:`
          : `Which country does this flag belong to?`}
      </h2>
      <ul className="ChoicesList">
        {answers.map((answer, i) => {
          return (
            <Li
              key={`${answer.id}${i}`}
              onClick={({ target }) => onClickHandler(target)}
            >
              <Button>
                <span className="Alpha">{String.fromCharCode(65 + i)}</span>
                {answer.country.name}
              </Button>
            </Li>
          );
        })}
      </ul>
      <Button
        className={isAnswerSelected ? 'NextButton' : 'hideNextButton'}
        onClick={() => {
          setNextClicked(
            (prevState) =>
              wrongAnswer.get === false && isAnswerSelected && !prevState
          );
          setQuestionType((prevQuestion) =>
            wrongAnswer.get === false &&
            isAnswerSelected &&
            prevQuestion === 'capital'
              ? 'flag'
              : 'capital'
          );
          setIsAnswerSelected(false);
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default Question;
