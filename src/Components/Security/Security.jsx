import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { AiFillCopy } from "react-icons/ai";
import clipboardCopy from 'clipboard-copy';

import CipherContext from "../store/cipher-context";

import styles from "./Security.module.css";

export default function BasicTextFields() {
  const cipherCtx = useContext(CipherContext);

  const [ plainText, setPlainText ] = useState('');

  const textFieldChangeHandler = (event) => {
    setPlainText(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (plainText.trim(' ') === '') {
        return;
    }

    cipherCtx.incryptedTextFunction(plainText);
    setPlainText('');
  };

  const handleCopy = (text) => {
    console.log(text);
    clipboardCopy(text)
      .then(() => alert("Text copied to clipboard!"))
      .catch((error) => console.error("Failed to copy:", error));
  };

  const resetHandler = () => {
    cipherCtx.clearData();
  }

  const content =
    Object.entries(cipherCtx.incryptedText).length === 0 ? (
      <form onSubmit={submitHandler}>
        <TextField
          onChange={textFieldChangeHandler}
          placeholder="Enter plain text"
          id="outlined-basic"
          label="JohnysPher"
          variant="outlined"
          sx={{ width: "100%" }}
        />
        <button className={`${styles["button-85"]}`} role="button">
          Encrypt Me
        </button>
      </form>
    ) : Object.entries(cipherCtx.incryptedText).length !== 0 ? (
      <div className={styles.decrypted}>
          <div>
            <button onClick={() => handleCopy(cipherCtx.incryptedText)}>
              <AiFillCopy size={25} />
            </button>
            {cipherCtx.incryptedText}
          </div>
          <button
            className={`${styles["button-78"]}`}
            role="button"
            onClick={resetHandler}
          >
            Encrypt Again?
          </button>
        </div>
    ) : '';

  return (
    <div className={styles.card}>
      <h1>JohnysPher</h1>
      { content }
    </div>
  );
}
