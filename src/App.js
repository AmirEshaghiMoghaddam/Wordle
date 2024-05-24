import React, { useEffect, useState } from 'react';
import Line from './Line';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import Spinner from 'react-bootstrap/Spinner';

function App() {

     const [word, setWord] = useState([]);
     const [loading, setLoading] = useState(true);
     const [className, setClassName] = useState(false);
     const [guesses, setGuesses] = useState(Array(6).fill(null));
     const [currentGuess, setCurrentGuess] = useState('')
     const [isGameOver, setIsGameOver] = useState(false)


     const BASE_URL = "https://api.frontendexpert.io/api/fe/wordle-words";

     async function fetchWords() {
          const res = await fetch(BASE_URL)
          const data = await res.json()
          const word = data[Math.floor(Math.random() * data.length)]
          // console.log(word)
          setWord(word.toLowerCase());
          setLoading(false)
     }

     useEffect(() => {
          setTimeout(() => fetchWords(), 1000)
          toast(
               "Welcome to Wordle.\n\nGuess the Wordle in 6 tries.\nEnter an alphabet to start!",
               {
                    duration: 10000,
               }
          );
     }, [])

     useEffect(() => {
          const handleType = (event) => {
               if (isGameOver) {
                    return;
               }
               if (event.key === 'Enter') {
                    if (currentGuess.length !== word.length) {
                         return;
                    }
                    if (currentGuess.length === word.length) {
                         const newGuesses = [...guesses];
                         newGuesses[guesses.findIndex(el => el === null)] = currentGuess;
                         setGuesses(newGuesses);
                         if (newGuesses.includes(null)) {
                              setCurrentGuess('');
                         } else {
                              setIsGameOver(true);

                              toast('Good Try!\nTry Again', {
                                   icon: '👏',
                              });
                         }
                    }
                    // console.log(word)
                    const isCorrect = word === currentGuess;
                    if (isCorrect) {
                         setIsGameOver(true);
                         setClassName(true);
                         toast('Good Job!', {
                              icon: '👏',
                         });
                    }
               }

               if (event.key === 'Backspace') {
                    setCurrentGuess(currentGuess.slice(0, -1));
                    return;
               }

               if (currentGuess.length >= 5) {
                    return;
               }

               const isLetter = event.key.match(/^[a-z]{1}$/) !== null;
               if (isLetter) {
                    setCurrentGuess(prev => prev + event.key)
               } else toast.error('Please Enter Alphabet')
          }

          window.addEventListener('keydown', handleType)
          return () => window.removeEventListener('keydown', handleType)
     }, [currentGuess, isGameOver, word, guesses])



     function handleClick() {
          toast(
               "Welcome to Wordle.\n\nGuess the Wordle in 6 tries.\nEnter an alphabet to start!",
               {
                    duration: 10000,
               }
          );
     }

     return (
          <div className='mainContainer'>
               {loading ? <Spinner animation="border" variant="light" /> :
                    <div className='container'>
                         <Toaster />
                         <div className='title' onClick={handleClick}>Wordle</div>
                         <div className='lineContainer'>
                              {guesses.map((guess, idx) => {
                                   const isCurrentGuess = idx === guesses.findIndex(el => el === null)
                                   return <Line key={idx} guess={isCurrentGuess ? currentGuess : guess ?? ""} word={word} isFinal={!isCurrentGuess && guess != null} />
                              })}
                         </div>
                    </div>
               }
               {isGameOver ? <div className={className ? 'rightAnswer' : 'wrongAnswer'}>{word.toUpperCase()}</div> : null}
          </div>
     )
}

export default App