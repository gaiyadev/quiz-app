import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../../Quiz/Instructions/Instruction.css';

const quizInstructions = () => {
    return (
        <div>
            <Helmet>
                <title>Quiz Intructions</title>
            </Helmet>
            <div id="Intructions" className="container-fluid text-white">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <h1>How to play the game</h1>
                        <p>Please ensure you read the instructions    </p>
                        <ul className="List">
                            <li>list 1</li>
                            <li>list 2</li>
                            <li>list 3</li>
                        </ul>
                        <Link className="btn btn-danger mx-4" to="/">No take me back home</Link>
                        <Link className="btn btn-primary mx-4" to="/play/quiz">let's do this</Link>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        </div>
    );
}

export default quizInstructions;