import React, { useState } from "react";

import CipherContext from "./cipher-context";

const plainAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const CipherProvider = (props) => {
    const [ cipherData, setCipherData ] = useState('');
    const [ alphabetArray, setAlphabetArray ] = useState([]);

    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    const addCipherText = (size, alphabetArray) => {
        let addedCipherText = [];
        let j = 0;

        for (let i = size; i < 16; i++) {
            if (i === 0) {
              addCipherText[j] = alphabetArray[j].charCodeAt(0) % 16;
              j++;
              continue;
            }

            addedCipherText[j] = alphabetArray[i].charCodeAt(0) % 16;
            j++;
        }

        return addedCipherText;
    };

    const convertToStrings = (tempCipherText, addedCipherText) => {
        let newAddedCipherText = addedCipherText.map(num => num.toString(16));
        newAddedCipherText = newAddedCipherText.toString().replace(/,/g, '');
        let newTempCipherText = tempCipherText.map(num => num.toString(16));
        newTempCipherText = newTempCipherText.toString().replace(/,/g, '');
        const cipherText = newAddedCipherText + newTempCipherText;

        return cipherText;
    };

    function reverseString(str) {
        return str.split('').reduce((reversed, char) => char + reversed, '');
    }

    const incryptedTextHandler = (plainText) => {
        let cipherText;

        const plainTextArray = Array.from(plainText);

        const tempCipherText = plainTextArray.map(letter => letter.charCodeAt(0) % 16);
        
        const newPlainAlphabet = shuffleArray(plainAlphabet);
        
        if (tempCipherText.length < 16) {
            const addedCipherText = addCipherText(tempCipherText.length, newPlainAlphabet);
            let cipherText = convertToStrings(tempCipherText, addedCipherText);
            cipherText = reverseString(cipherText);
            setAlphabetArray(newPlainAlphabet);
            setCipherData(cipherText);
        } else if (tempCipherText.length > 16) {
            let j = 0;

            for (let i = 16; i < tempCipherText.length; i++) {
                if (j === 16) {
                    j = 0;
                }

                tempCipherText[j] = tempCipherText[i];
                tempCipherText[i] = '';
                j++;
            }

            cipherText = tempCipherText.map(num => num.toString(16));
            cipherText = cipherText.toString().replace(/,/g, "");
            cipherText = reverseString(cipherText);
            
            setCipherData(cipherText);
        } else {
            cipherText = tempCipherText.map(num => num.toString(16));
            cipherText = cipherText.toString().replace(/,/g, '');
            cipherText = reverseString(cipherText);

            setCipherData(cipherText);
        }

    };

    const clearDataHandler = () => {
        setCipherData('');

    }

    const cipherContext = {
      incryptedText: cipherData,
      alphabet: alphabetArray,
      incryptedTextFunction: incryptedTextHandler,
      clearData: clearDataHandler
    };
    
    return (
        <CipherContext.Provider value={cipherContext}>
            { props.children }
        </CipherContext.Provider>
    )
};

export default CipherProvider