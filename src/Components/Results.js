import Trophy from '../Assets/undraw_winners_ao2o 2.svg';
const Results = (props) => {
  const { correctAnswers, setWrongAnswer, setCorrectAnswers } = props;
  return (
    <div className="ResultsWrapper">
      <img src={Trophy} alt="trophy"></img>
      <h1>Results</h1>
      <p>
        You got <span>{correctAnswers}</span> correct answers
      </p>
      <button
        onClick={() => {
          setWrongAnswer(false);
          setCorrectAnswers(0);
        }}
      >
        Try again
      </button>
    </div>
  );
};

export default Results;
