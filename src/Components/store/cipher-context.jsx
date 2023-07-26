import React from "react";

const CipherContext = React.createContext({
    incryptedText: '',
    alphabet: [],
    incryptedTextFunction: (plainText) => {},
    clearData: () => {}
});

export default CipherContext;