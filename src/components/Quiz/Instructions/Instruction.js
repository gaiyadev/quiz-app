import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../../Quiz/Instructions/Instruction.css';

const quizInstructions = () => {
    return (
        <div>
            <Helmet>
                <title>Quiz Instructions</title>
            </Helmet>
            <div id="Intructions" className="container-fluid text-white mt-5">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <h1>How to play the game</h1>
                        <p>Please ensure you read the instructions    </p>
                        <ul className="List" style={{ fontSize: '19px' }}>
                            <li>The quiz contain total of 15 questions to be attempt</li>
                            <li>A user is allow to use hint button to remove incorrect answers</li>
                            <li>A user is allow to use 50/50 button to remove incorrect answers</li>
                            <li>All questions must be attemptes witthin 3mins</li>
                        </ul>
                        <Link className="btn btn-danger mx-4 mt-3" to="/">No take me back home</Link>
                        <Link className="btn btn-primary mx-4 mt-3" to="/play/quiz">let's do this</Link>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        </div>
    );
}

export default quizInstructions;