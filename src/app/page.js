'use client'

import "./globals.css"
import React, {useState} from 'react';
import quizData from '../fragen.json';
import Login from "./components/Login.jsx";

export default function Home() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(quizData.quiz.length).fill(null));
    const [showResults, setShowResults] = useState(true);
    const [loginFinished, setLoginFinished] = useState('')

    const handleAnswerChange = (answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = answer;
        setAnswers(updatedAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.quiz.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResults(true);
        }
    };

    const calculateScore = () => {
        return answers.reduce((score, answer, index) => {
            if (answer === quizData.quiz[index].korrekteAntwort) {
                return score + 1;
            }
            return score;
        }, 0);
    };

    return (
        <>
            {!loginFinished ? (
                <Login loginFinished={loginFinished} setLoginFinished={setLoginFinished} />
            ) : (
                <>
                    <h1>Quiz</h1>
                    <div className="quiz-container" style={{
                        padding: '20px',
                        maxWidth: '600px',
                        margin: 'auto',
                        display: "flex",
                        flexDirection: "row"
                    }}>
                        {!showResults ? (
                            <div className="quiz-section">
                                <h2>Frage {currentQuestionIndex + 1} von {quizData.quiz.length}</h2>
                                <h3>{quizData.quiz[currentQuestionIndex].frage}</h3>
                                {quizData.quiz[currentQuestionIndex].antworten.map((antwort, idx) => (
                                    <div key={idx} style={{marginBottom: '10px', display: "flex"}}>
                                        <label style={{display: "flex"}}>
                                            <input
                                                type="radio"
                                                name={`question-${currentQuestionIndex}`}
                                                value={antwort}
                                                checked={answers[currentQuestionIndex] === antwort}
                                                onChange={() => handleAnswerChange(antwort)}
                                                className={`answer-option ${answers[currentQuestionIndex] === antwort ? 'selected' : ''}`}
                                            />
                                            {antwort}
                                        </label>
                                    </div>
                                ))}
                                <button
                                    onClick={handleNextQuestion}
                                    disabled={answers[currentQuestionIndex] === null}
                                    style={{marginTop: '20px', padding: '10px 20px'}}
                                >
                                    {currentQuestionIndex < quizData.quiz.length - 1 ? 'Nächste Frage' : 'Quiz abschließen'}
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h2>Dein Ergebnis</h2>
                                <p>
                                    Du hast {calculateScore()} von {quizData.quiz.length} Fragen richtig beantwortet.
                                </p>
                                <button
                                    onClick={() => {
                                        setAnswers(Array(quizData.quiz.length).fill(null));
                                        setCurrentQuestionIndex(0);
                                        setShowResults(false);
                                    }}
                                    style={{marginTop: '20px', padding: '10px 20px'}}
                                >
                                    Nochmals versuchen
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
}
