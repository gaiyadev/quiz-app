import React from 'react';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import questions from '../../../../src/Questions/Questions.json';
import isEmpty from '../../../../src/utils/Empty';

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'QUiz app',
            questions: questions,
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

    componentDidMount() {
        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
        // this.startTimer();
    }

    handleOptionClick = (event) => {
        if (event.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            this.correctAnswer();
        } else {
            this.wrongAnswer();
        }
    }

    correctAnswer = () => {
        toast.success("Correct answer", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000

        });
        this.setState(preState => ({
            score: preState.score + 1,
            correctAnswers: preState.correctAnswers + 1,
            currentQuestionIndex: preState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: preState.numberOfAnsweredQuestions + 1,
        }), () => {
            this.displayQuestions(
                this.state.questions,
                this.state.currentQuestion,
                this.state.nextQuestion,
                this.state.previousQuestion
            );
        });
    }

    wrongAnswer = () => {
        navigator.vibrate(1000);
        toast.error("Wrong answer", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000
        });
        this.setState(preState => ({
            wrongAnswers: preState.wrongAnswers + 1,
            currentQuestionIndex: preState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: preState.numberOfAnsweredQuestions + 1
        }), () => {
            this.displayQuestions(
                this.state.questions,
                this.state.currentQuestion,
                this.state.nextQuestion,
                this.state.previousQuestion
            );
        });
    }

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;
        if (!isEmpty(questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion: currentQuestion,
                nextQuestion: nextQuestion,
                previousQuestion: previousQuestion,
                numberOfQuestions: questions.length,
                answer: answer,
                // previousRandomNumbers: []
            });
        }
    };

    handleQuitButtonClick = () => {
        if (window.confirm('Are you sure you want to quit?')) {
            this.props.history.push('/');
        }
    };
    handleButtonClick = (event) => {
        switch (event.target.id) {
            case 'next-button':
                this.handleNextButtonClick();
                break;

            case 'previous-button':
                this.handlePreviousButtonClick();
                break;

            case 'quit-button':
                this.handleQuitButtonClick();
                break;

            default:
                break;
        }

    };

    handlePreviousButtonClick = () => {
        if (this.state.previousQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex - 1
            }), () => {
                this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
    };

    handleNextButtonClick = () => {
        if (this.state.nextQuestion !== undefined) {
            this.setState(preState => ({
                currentQuestionIndex: preState.currentQuestionIndex + 1
            }), () => {
                this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
    }

    render() {
        const { currentQuestion, currentQuestionIndex, numberOfQuestions } = this.state;
        return (
            < div >
                <Helmet>
                    <title>{this.state.title}</title>
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
                                <span style={{ float: 'left' }}>{currentQuestionIndex + 1} of {numberOfQuestions}</span><br />
                                <span style={{ float: 'right' }} >25:00</span>
                            </p>
                            <h5>{currentQuestion.question}</h5>
                            <div className="OPtions">
                                <span><button onClick={this.handleOptionClick} className="btn btn-info  btn-block  btn-lg  mt-4">{currentQuestion.optionA}</button> </span>
                                <span><button onClick={this.handleOptionClick} className="btn btn-success btn-block btn-lg   mt-4">{currentQuestion.optionB}</button> </span>
                            </div>
                            <div className="OPtions">
                                <span> <button onClick={this.handleOptionClick} className="btn btn-danger btn-lg btn-block  mt-4">{currentQuestion.optionC}</button> </span>
                                <span> <button onClick={this.handleOptionClick} className="btn btn-primary btn-block  btn-lg  mt-4">{currentQuestion.optionD}</button> </span><br />
                            </div>
                            <div className="Buttons mt-5">
                                <button id="previous-button" onClick={this.handleButtonClick} className="btn btn-primary ">Previous</button>&nbsp;&nbsp;&nbsp;
                                <button id="quit-button" onClick={this.handleButtonClick} className="btn btn-danger">Quite</button>&nbsp;&nbsp;&nbsp;
                                <button id="next-button" onClick={this.handleButtonClick} className="btn btn-info " >Next</button>&nbsp;&nbsp;&nbsp;
                            <ToastContainer />
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