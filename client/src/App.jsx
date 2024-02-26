import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div className='App'>
        <h1>Event Page</h1>

      <Routes>
        <Route path = "/" element={<Event/>} />
        <Route path = "/create" element={<Create/>} />
        <Route path = "/vote" element={<Vote/>} />
        <Route path = "*" element={<Error404View/>} />
      </Routes>
      </div>
   
  );
}

export default App
