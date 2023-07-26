import { useState } from 'react'
import './App.css'
import Security from './Components/Security/Security';
import CipherProvider from './Components/store/CipherProvider';

function App() {
  const [count, setCount] = useState(0)

  return (
    <CipherProvider>
      <Security/>
    </CipherProvider>
  )
}

export default App
