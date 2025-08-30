import React, { useEffect, useState } from "react";
import "../assets/quiz.css";
import { toast } from "react-toastify";
import axios from "axios";

const Quiz = () => {
  const [submit, setSubmit] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0); 
  const [completed, setCompleted] = useState(false);
const [newData,setNewData]=useState(null)
const [error,setError]=useState(null)


  const data = [
    { q: "question1", o: ["Option1", "Option2", "Option3", "Option4"], a: "Option3" },
    { q: "question2", o: ["Option1", "Option2", "Option3", "Option4"], a: "Option4" },
    { q: "question3", o: ["Option1", "Option2", "Option3", "Option4"], a: "Option1" },
  ];

  const getDataFromApi=async()=>{
    try{
    const res=await axios.post("https://api.paraheights.com/edzy-api/hackathon/task/quizDetails",{
  "examSubjectName": "Class 10 - English",
  "numberOfQuestions": 5
} )
    // data=res.data
    setNewData(res.data.data.questions)
    }
    catch (error){
setError(error)
    }
  }

  useEffect(()=>{
getDataFromApi()
  },[])
  
console.log(newData)
console.log(error)

  const handleSelect = (opt) => {
    if (!submit) {
      setSelectedOption(opt);
    }
  };

//   const handleSubmit = () => {
//     if (selectedOption != null) {
//       if (selectedOption === data[currentQ].a) {
//         toast.success("✅ Correct!");
//         setScore(score + 1); 

//         setTimeout(() => {
//           if (currentQ < data.length - 1) {
//             setCurrentQ(currentQ + 1);
//             setSelectedOption(null);
//             setSubmit(false);
//           } else {
//             setCompleted(true);
//           }
//         }, 800);
//       } else {
//         toast.error("❌ Wrong!");
//         setSubmit(true);
//       }
//     }
//   };




if(newData){
    const options=newData[currentQ].optionOrdering
    const question=newData[currentQ].text
    const solution=newData[currentQ].questionInfo.solution

console.log("dvklm",newData[currentQ])
console.log("Q",question)
console.log("O",options)
console.log("Ans",solution)
}


//   const handleReset = () => {
//     setSubmit(false);
//     setSelectedOption(null);
//   };

//   const handleRestart = () => {
//     setCurrentQ(0);
//     setScore(0);
//     setCompleted(false);
//     setSubmit(false);
//     setSelectedOption(null);
//   };

//   if (completed) {
//     return (
//       <div className="mainContainer WhiteColor">
//         <h2>🎉 Quiz Completed!</h2>
//         <p>
//           Your Score: <b>{score}</b> / {data.length}
//         </p>
//         <button onClick={handleRestart}>Restart Quiz</button>
//       </div>
//     );
//   }

  return (
    // <>
    //   <div className="mainContainer">
    //     <form onSubmit={(e) => e.preventDefault()}>
    //       <h2>
    //         Question {currentQ + 1}: {newData[currentQ]}
    //       </h2>

    //       <div className="options">
    //         {data[currentQ]?.o?.map((opt, i) => {
    //           let className = "option";

    //           if (submit) {
    //             if (opt === data[currentQ].a) {
    //               className += " correct";
    //             }
    //             if (opt === selectedOption && opt !== data[currentQ].a) {
    //               className += " wrong";
    //             }
    //           } else if (selectedOption === opt) {
    //             className += " optionSelect";
    //           }

    //           return (
    //             <div
    //               key={i}
    //               onClick={() => handleSelect(opt)}
    //               className={className}
    //             >
    //               {opt}
    //             </div>
    //           );
    //         })}
    //       </div>

    //       <div className="buttons">
    //         <button type="button" onClick={handleReset}>
    //           Reset
    //         </button>
    //         <button
    //           type="button"
    //           disabled={!selectedOption}
    //           onClick={handleSubmit}
    //         >
    //           Submit
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </>
    <>
    </>
  );
};

export default Quiz;
