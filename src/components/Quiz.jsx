import React, { useEffect, useState } from "react";
import "../assets/quiz.css";
import { toast } from "react-toastify";
import axios from "axios";

const Quiz = () => {
  const [questions, setQuestions] = useState([]); // formatted questions
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);


  const getDataFromApi = async () => {
    try {
      const res = await axios.post(
        "https://api.paraheights.com/edzy-api/hackathon/task/quizDetails",
        {
          examSubjectName: "Class 10 - English",
          numberOfQuestions: 5,
        }
      );

      // Format API response according to my need
      const formatted = res.data.data.questions.map((q) => ({
        q: q.text,
        o: q.optionOrdering, // array of options [{_id,text,media}]
        a: q.questionInfo.option, // correct answer id
      }));

      setQuestions(formatted);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    getDataFromApi();
  }, []);


  const handleSelect = (opt) => {
    if (!submit) {
      setSelectedOption(opt);
    }
  };

 // Handling the submit
const handleSubmit = () => {
  if (!selectedOption) return;

  // if already submitted once (wrong answer case), go to next Q
  if (submit) {
    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelectedOption(null);
      setSubmit(false);
    } else {
      setCompleted(true);
    }
    return;
  }

  // ✅ Correct answer
  if (selectedOption._id === questions[currentQ].a) {
    toast.success("✅ Correct!");
    setScore((prev) => prev + 1);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((prev) => prev + 1);
        setSelectedOption(null);
        setSubmit(false);
      } else {
        setCompleted(true);
      }
    }, 800);
  } else {
    toast.error("❌ Wrong!");
    setSubmit(true);
  }
};



  const handleRestart = () => {
    setCurrentQ(0);
    setScore(0);
    setCompleted(false);
    setSelectedOption(null);
    setSubmit(false);
  };

  if (completed) {
    return (
        <div className="mainContainer1">
      <div className="mainContainer WhiteColor">
        <h2>🎉 Quiz Completed!</h2>
        <p>
          Your Score: <b>{score}</b> / {questions.length}
        </p>
        <button onClick={handleRestart}>Restart Quiz</button>
      </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <h3>Loading Quiz...</h3>;
  }

  
  const handleReset=()=>{
    setSelectedOption(null);
          setSubmit(false);
  }


  return (
    <div className="mainContainer1">
    <div className="mainContainer">
      <h2>
        Question: {currentQ + 1}
      </h2>
<p className="">{questions[currentQ].q}</p>
      <div className="options">
        {questions[currentQ]?.o?.map((opt) => {
          let className = "option";

          if (submit) {
            if (opt._id === questions[currentQ].a) {
              className += " correct"; 
            }
            if (
              opt._id === selectedOption?._id &&
              opt._id !== questions[currentQ].a
            ) {
              className += " wrong"; 
            }
          } else if (selectedOption?._id === opt._id) {
            className += " optionSelect"; 
          }

          return (
            <div
              key={opt._id}
              className={className}
              onClick={() => handleSelect(opt)}
            >
              {opt.text}
            </div>
          );
        })}
      </div>

      <div className="buttons">
        <button
          type="button"
          disabled={!selectedOption}
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          type="button"
          disabled={!selectedOption}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
    </div>
  );
};

export default Quiz;
