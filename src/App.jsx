import Navigation from './Components/Navigation/Navigation'
import {Route, Routes, Link} from 'react-router-dom';

import './App.css'
import Registration from './Components/Registration/Registration';

function App() {

  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<h1 style={{marginTop: '150px', textAlign: 'center' }}>Ovdje idu OGLASI</h1>} />
        <Route path="/prijava" element={<Registration />} />
			  <Route path="*" element={<h1>NOT FOUND</h1>} />
      </Routes>
    </>
  )
}

export default App
