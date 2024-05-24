import React from 'react'

function Line({ guess, isFinal, word }) {

     const tiles = [];
     const word_length = word.length;

     for (let i = 0; i < word_length; i++) {
          const char = guess[i]
          let className = 'tile';
          if (isFinal) {
               if (char === word[i]) {
                    className += ' correct';
               } else if (word.includes(char)) {
                    className += ' close';
               } else {
                    className += ' incorrect';
               }
          }

          tiles.push(<div key={i} className={className}>{char}</div>)
     }
     // console.log(tiles)
     return (
          <div className='line'>{tiles}</div>
     )
}

export default Line