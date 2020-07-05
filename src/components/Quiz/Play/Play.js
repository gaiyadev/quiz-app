import React from 'react';
import { Helmet } from 'react-helmet';
import questions from '../../../../src/Questions/Questions.json';
import isEmpty from '../../../../src/utils/Empty';

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: {},
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            fiftyFifty: 2,
            usedFiftyFifty: false,
            nextButtonDisabled: false,
            previousButtonDisabled: true,
            previousRandomNumbers: [],
            time: {}
        };
    }

    // componentDidMount() {
    //     const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
    //     this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
    //     this.startTimer();
    // }
    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;
        if (!isEmpty(this.state.questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion: currentQuestion,
                nextQuestion: nextQuestion,
                previousQuestion: previousQuestion,
                // numberOfQuestions: questions.length,
                answer,
                // previousRandomNumbers: []
            });
        }
    };

    render() {

        return (
            < div >
                <Helmet>
                    <title>Quiz page</title>
                </Helmet>
                <div className="container-fluid text-white mt-5">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <h2>Quiz mode</h2>
                            <div className="Life-Line">
                                <span style={{ float: 'left' }} >life line2</span><br />
                                <span style={{ float: 'right' }} >Hint2</span>
                            </div>

                            <p >
                                <span style={{ float: 'left' }}>1/25</span><br />
                                <span style={{ float: 'right' }} >25:00</span>
                            </p>
                            <h5>Whats your name</h5>
                            <div className="OPtions">
                                <span> <button className="btn btn-info  btn-block  btn-lg  mt-4">500</button> </span>
                                <span> <button className="btn btn-success btn-block btn-lg   mt-4">59</button> </span>
                            </div>
                            <div className="OPtions">
                                <span> <button className="btn btn-danger btn-lg btn-block  mt-4">1997</button> </span>
                                <span> <button className="btn btn-primary btn-block  btn-lg  mt-4">500</button> </span><br />
                            </div>
                            <div className="Buttons mt-5">
                                <button className="btn btn-primary ">Previous</button>&nbsp;&nbsp;&nbsp;
                                <button className="btn btn-danger">Quite</button>&nbsp;&nbsp;&nbsp;
                                <button className="btn btn-info " >Next</button>&nbsp;&nbsp;&nbsp;
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                    </div>

                </div>
            </div >
        );
    }
}

export default Play;