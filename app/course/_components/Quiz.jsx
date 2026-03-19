// File: app/course/[courseId]/_components/Quiz.jsx

"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Loader2Icon, RefreshCcw } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

function Quiz({ notes }) {
    const [loading, setLoading] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const generateQuiz = async () => {
        setLoading(true);
        try {
            const result = await axios.post('/api/generate-quiz', { notes });
            setQuizData(result.data);
            resetQuizState();
        } catch (error) {
            toast.error("Failed to generate quiz. Please try again.");
            console.error(error);
        }
        setLoading(false);
    }

    const handleOptionChange = (questionIndex, option) => {
        setUserAnswers({
            ...userAnswers,
            [questionIndex]: option
        });
    }

    const handleSubmit = () => {
        let currentScore = 0;
        quizData.forEach((question, index) => {
            if (userAnswers[index] === question.answer) {
                currentScore++;
            }
        });
        setScore(currentScore);
        setSubmitted(true);
        toast.success(`You scored ${currentScore} out of ${quizData.length}!`);
    }
    
    const resetQuizState = () => {
        setSubmitted(false);
        setUserAnswers({});
        setScore(0);
    }

    const getOptionClass = (question, option, index) => {
        if (!submitted) return 'hover:bg-gray-200';
        if (option === question.answer) return 'bg-green-200';
        if (userAnswers[index] === option && option !== question.answer) return 'bg-red-200';
        return 'bg-gray-100';
    }

    if (!notes) return null;

    return (
        <div className='mt-10 p-5 bg-secondary rounded-2xl'>
            <h2 className='font-bold text-2xl text-primary mb-4'>Test Your Knowledge 🧠</h2>
            {!quizData && !loading && (
                 <Button onClick={generateQuiz}>
                    Take a Quick Quiz
                </Button>
            )}

            {loading && <div className='flex items-center gap-2'><Loader2Icon className='animate-spin'/> Generating Quiz...</div>}
            
            {quizData && (
                <div>
                    {quizData.map((q, index) => (
                        <div key={index} className='my-4'>
                            <p className='font-semibold'>{index + 1}. {q.question}</p>
                            <div className='flex flex-col gap-2 mt-2'>
                                {q.options.map((option, optIndex) => (
                                    <label 
                                        key={optIndex} 
                                        className={`p-2 rounded-md cursor-pointer transition-colors ${getOptionClass(q, option, index)}`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={option}
                                            checked={userAnswers[index] === option}
                                            onChange={() => handleOptionChange(index, option)}
                                            disabled={submitted}
                                            className='mr-2'
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    
                    {submitted ? (
                        <div className='mt-6 text-center'>
                             <h3 className='font-bold text-xl'>Your Score: {score} / {quizData.length}</h3>
                             <Button onClick={generateQuiz} className='mt-4'>
                                <RefreshCcw className='w-4 h-4 mr-2' /> Try Another Quiz
                            </Button>
                        </div>
                    ) : (
                         <Button onClick={handleSubmit} disabled={Object.keys(userAnswers).length !== quizData.length}>
                            Submit Answers
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}

export default Quiz