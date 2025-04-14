import { useState, useEffect, useContext } from 'react'
import { auth, db } from '../firebase.config'
import axios from 'axios'
import bronze from "../assets/bronze.png"
import silver from '../assets/silver.png'
import gold from '../assets/gold.png'
import { FreeSoloPopover } from '@nextui-org/react'
import { UserAuth } from "../context/AuthContext"
import { doc, updateDoc } from 'firebase/firestore';
import questionsArray from "../components/SolarSystem/questionsDb";

function Exam({ unmountCallback }) {
  const user = UserAuth();
  const [questionsList, setQuestions] = useState([]);
  const [reportDisplay, setReportDisplay] = useState(false);
  const [finalReport, setFinalReport] = useState(false);
  const [loading, setLoading] = useState(true);
  const examPlanets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];
  const properties = ["distance", "mass", "period", "radius", "temperature",];
  const questions = [];
  const planetsData = [];
  const examAPI = `https://api.api-ninjas.com/v1/planets`;
  const answers = [];
  let numberOfRightAnswers = 0;
  let numberOfWrongAnswers = 0;
  let badge = "";
  let slideIndex = 0;

  useEffect(() => {
    console.log(user);

    const prepareQuestions = function () {
      let objectToExtract, rightAnswer, questionObject;
      let planetIndex = Math.floor(Math.random() * examPlanets.length);
      let propertiesIndex = Math.floor(Math.random() * properties.length);
      for (let i = questions.length; questions.length < 15; i++) {

        let exists = false;
        let propertiesIndex = Math.floor(Math.random() * questionsArray.length);

        questionObject = questionsArray[propertiesIndex];
        questionObject.number = i;
        console.log(i);


        for (let obj of questions) {
         
          
          // Check if the name property matches the searchText
          if (obj.Question === questionObject.Question) {
            i--;
            exists = true;
            break; // Exit the loop if found
          }
        }

        if (!exists) {
          questions.push(questionObject);
        }

        if (i >= 14) {
          setQuestions(questions);
          setLoading(false);
          console.log("bigger than 29");
          break;
        }


      }

      console.log(questions);
    }
    prepareQuestions();
  }, []); // The empty dependency array ensures useEffect runs only once, equivalent to componentDidMount

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getRandomNumberWithoutRepeat() {
    const numbers = [0, 1, 2, 3];
    shuffleArray(numbers);
    return numbers;
  }

  function shuffleList() {


    for (let i = 0; i < questionsList.length; i++) {
      const randomArray = getRandomNumberWithoutRepeat();
      const temp = [];
      for (let v = 0; v < randomArray.length; v++) {
        temp[v] = questionsList[i].values[randomArray[v]];
      }

      questionsList[i].values = temp;
    }
  };
  shuffleList();


  const handleRadioChange = (event) => {

    if (slideIndex == 14) {
      const selectedValue = event.target.value;
      const answer = event.target.getAttribute('data-answer');
      const rightAnswer = event.target.getAttribute('data-rightAnswer');
      answers.push({
        questionNumer: slideIndex + 1,
        Question: questionsList[slideIndex].Question,
        yourAnswer: selectedValue,
        rightAnswer: rightAnswer,
        trueOrFalse: answer
      })

      if (answer == "right") {
        numberOfRightAnswers++;
      } else {
        numberOfWrongAnswers++;
      }

      if (numberOfRightAnswers >= 5 && numberOfRightAnswers < 10) {
        badge = "Bronze";
        updateDocument(user.user.uid, { badge: "bronze" });
      } else if (numberOfRightAnswers >= 10 && numberOfRightAnswers < 13) {
        badge = "Silver";
        updateDocument(user.user.uid, { badge: "silver" });
      } else if (numberOfRightAnswers >= 13) {
        badge = "Gold";
        updateDocument(user.user.uid, { badge: "gold" });

      } else {
        badge = ""
        updateDocument(user.user.uid, { badge: "" });
      }


      answers.push({
        numberOfRightAnswers: numberOfRightAnswers,
        numberOfWrongAnswers: numberOfWrongAnswers,
        badge: badge
      })


      setReportDisplay(true);
      setFinalReport(answers);
      console.log(finalReport);


    } else {

      const selectedValue = event.target.value;
      const answer = event.target.getAttribute('data-answer');
      const rightAnswer = event.target.getAttribute('data-rightAnswer');
      console.log(selectedValue, answer, rightAnswer);
      nextSlide(slideIndex);
      console.log(slideIndex);

      answers.push({
        questionNumer: slideIndex,
        Question: questionsList[slideIndex - 1].Question,
        yourAnswer: selectedValue,
        rightAnswer: rightAnswer,
        trueOrFalse: answer
      })
      console.log(answers);

      if (answer == "right") {
        numberOfRightAnswers++;
      } else {
        numberOfWrongAnswers++;
      }







    }



  }


  function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    if (n >= slides.length + 1) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }
    const offset = -slideIndex * 100 + '%';
    document.querySelector('.slider-content').style.transform = 'translateX(' + offset + ')';

  }

  function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
  }


  const updateDocument = async (docId, updatedData) => {
    try {
      const docRef = doc(db, "users", docId);
      await updateDoc(docRef, updatedData);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  function handleExit() {
  reportDisplay ? unmountCallback(finalReport[15].badge) : unmountCallback("");
  }

  return (
    <>
    {loading && <div className="loader-container"><div className="loader"></div></div>}

    <div className='overLay'></div>
    <div id='examWrapper'>

      <div className={`backdrop-blur-md slider-container ${reportDisplay ? 'expanded' : ''}`}>
        {!reportDisplay && <button className="absolute z-10 top-0 right-0 p-2 px-3 bg-transparent border-none text-xl" onClick={handleExit}>X</button>}
       <div className="slider-content">
            {questionsList.map((item, index) => (
              <div className={`slide ${reportDisplay ? 'expanded' : ''}`}>
                {reportDisplay ? (
                  <>
                    <button className="buttonMain closeButton" onClick={() => unmountCallback(finalReport[15].badge)}>Close</button>
                    <div className='topReport'>
                      <div className='reportText'>
                        <p>You answered overall {finalReport[15].numberOfRightAnswers} questions correctly.</p>
                        <p>You answered {finalReport[15].numberOfWrongAnswers} questions unfortunatelly incorrect.</p>
                      </div>
                      <div className='badgesShow'>
                        <div className='imageShow'>
                          {finalReport[15].badge === 'Bronze' && <img src={bronze} alt="Some Image" className='badgeImg' />}
                          {finalReport[15].badge === 'Silver' && <img src={silver} alt="Some Image" className='badgeImg' />}
                          {finalReport[15].badge === 'Gold' && <img src={gold} alt="Some Image" className='badgeImg' />}
                        </div>
                        <div>
                          {finalReport[15].badge === 'Gold' && <p>Congratuations!, You have got Gold Badge</p>}
                          {finalReport[15].badge === 'Silver' && <p>Congratuations!, You have got Silver Badge</p>}
                          {finalReport[15].badge === 'Bronze' && <p>Congratuations!, You have got Bronze Badge</p>}
                          {finalReport[15].badge === '' && <p>You have got no Badge, You can try again</p>}
                        </div>
                      </div>
                    </div>
                    <div className='tableWrapper'>
                      <table>
                        <thead>
                          <tr>
                            <th>Question Number</th>
                            <th>Question</th>
                            <th>Your Answer</th>
                            <th>Right Answer</th>
                            <th>Result</th>
                          </tr>
                        </thead>
                        <tbody>
                          {finalReport.map((report, index) => (
                            <tr key={index}>
                              <td>{report.questionNumer}</td>
                              <td>{report.Question}</td>
                              <td>{report.yourAnswer}</td>
                              <td>{report.rightAnswer}</td>
                              <td>{report.trueOrFalse}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <div className='options'>
                    <p>{item.number + 1} /15</p>
                    <div className='questionsDiv'>
                      <h1>{item.Question}</h1>
                      {item.values.map((itemRadio, index) => (
                        <>
                          <input type="radio" id={itemRadio.rightValue ? itemRadio.rightValue : itemRadio.falseValue} name="capital" value={itemRadio.rightValue ? itemRadio.rightValue : itemRadio.falseValue} data-answer={itemRadio.rightValue ? "right" : "false"} onChange={handleRadioChange} data-rightAnswer={item.values[0].rightValue ? item.values[0].rightValue : item.values[1].rightValue ? item.values[1].rightValue : item.values[2].rightValue ? item.values[2].rightValue : item.values[3].rightValue ? item.values[3].rightValue : "null"} />
                          <label className="mt-4  buttonMain" htmlFor={itemRadio.rightValue ? itemRadio.rightValue : itemRadio.falseValue}>{itemRadio.rightValue ? itemRadio.rightValue : itemRadio.falseValue}</label>
                        </>
                      )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default Exam
