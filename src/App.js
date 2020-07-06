import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import quizIntruction from './components/Quiz/Instructions/Instruction';
import Play from './components/Quiz/Play/Play';
import QuizSummary from './QuizSummary/quizSummary';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/play/instructions" exact component={quizIntruction} />
        <Route path="/play/quiz" exact component={Play} />
        <Route path="/play/quizSummary" exact component={QuizSummary} />
      </div>
    </Router>
  );
}

export default App;

