import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import  'bootstrap/dist/css/bootstrap.min.css'
import Dnd from './Components/Dnd'
import BackgroundEventsCalendar from './Components/BackgroundEventsCalender'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dnd />} />
          <Route path='/calendar' element={<BackgroundEventsCalendar />} />
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
