import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import quizIntruction from './components/Quiz/Instructions/Instruction';
import Play from './components/Quiz/Play/Play';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/play/instructions" exact component={quizIntruction} />
        <Route path="/play" exact component={Play} />
      </div>
    </Router>


  );
}

export default App;

