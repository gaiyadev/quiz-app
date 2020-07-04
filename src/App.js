import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import quizIntruction from './components/Quiz/Instructions/Instruction';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/play/instructions" exact component={quizIntruction} />
      </div>
    </Router>


  );
}

export default App;

