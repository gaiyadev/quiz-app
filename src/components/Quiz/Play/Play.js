import React from 'react';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import questions from '../../../../src/Questions/Questions.json';
import isEmpty from '../../../../src/utils/Empty';
import correctSound from '../../../sounds/correct.mp3'
import wrongSound from '../../../sounds/wrong.mp3'
import exitSound from '../../../sounds/exit.mp3'

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Quiz application',
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
            time: {
                minutes: 0,
                seconds: 0
            }
        };
        this.interval = null
    }

    componentDidMount() {
        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
        this.startTimer();
    }
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
        clearInterval(this.interval);
    }

    handleOptionClick = (event) => {
        if (event.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            setTimeout(() => {
                document.getElementById('correct').play();
            }, 500);
            this.correctAnswer();
        } else {
            setTimeout(() => {
                document.getElementById('wrong').play();
            }, 500);
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
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            } else {
                this.displayQuestions(
                    this.state.questions,
                    this.state.currentQuestion,
                    this.state.nextQuestion,
                    this.state.previousQuestion
                );
            }
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
                previousRandomNumbers: []
            }, () => {
                this.showOptions();
                this.handleDisableButton();
            });
        }
    };

    handleQuitButtonClick = () => {
        this.playButtonSound();
        if (window.confirm('Are you sure you want to quit?')) {
            this.props.history.push('/');
        }
    };


    playButtonSound = () => {
        document.getElementById('exit').play();
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

    showOptions = () => {
        const options = Array.from(document.querySelectorAll('.btn'));
        options.forEach(option => {
            option.style.visibility = 'visible';
        });
        this.setState({
            usedFiftyFifty: false
        });
    }


    handleHints = () => {
        if (this.state.hints > 0) {
            const options = Array.from(document.querySelectorAll('.btn'));
            let indexOfAnswer;
            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });

            while (true) {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {
                    options.forEach((option, index) => {
                        if (index === randomNumber) {
                            option.style.visibility = 'hidden';
                            this.setState((prevState) => ({
                                hints: prevState.hints - 1,
                                previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
                            }));
                        }
                    });
                    break;
                }
                if (this.state.previousRandomNumbers.length >= 3) break;
            }
        }
    }

    handleFiftyFifty = () => {
        if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
            const options = document.querySelectorAll('.btn');
            const randomNumbers = [];
            let indexOfAnswer;
            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });

            let count = 0;
            do {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer) {
                    if (randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                        randomNumbers.push(randomNumber);
                        count++;
                    } else {
                        while (true) {
                            const newRandomNumber = Math.round(Math.random() * 3);
                            if (!randomNumbers.includes(newRandomNumber) && newRandomNumber !== indexOfAnswer) {
                                randomNumbers.push(newRandomNumber);
                                count++;
                                break;
                            }
                        }
                    }
                }
            } while (count < 2);

            options.forEach((option, index) => {
                if (randomNumbers.includes(index)) {
                    option.style.visibility = 'hidden';
                }
            });
            this.setState(prevState => ({
                fiftyFifty: prevState.fiftyFifty - 1,
                usedFiftyFifty: true
            }));
        }
    }
    //timer method
    startTimer = () => {
        const countDownTime = Date.now() + 180000; //timer
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endGame();
                    this.props.history.push('/')
                });
            } else {
                this.setState({
                    time: {
                        minutes: minutes,
                        seconds: seconds,
                        distance: distance
                    }
                });
            }
        }, 1000);
    }

    endGame = () => {
        alert('Quiz has ended!');
        const { state } = this;
        const playerStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            fiftyFiftyUsed: 2 - state.fiftyFifty,
            hintsUsed: 5 - state.hints
        };
        console.log(playerStats);
        setTimeout(() => {
            this.props.history.push('/play/quizSummary', playerStats);
        }, 1000);
    }


    //disabling button
    handleDisableButton = () => {
        if (this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0) {
            this.setState({
                previousButtonDisabled: true
            });
        } else {
            this.setState({
                previousButtonDisabled: false
            });
        }

        if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
            this.setState({
                nextButtonDisabled: true
            });
        } else {
            this.setState({
                nextButtonDisabled: false
            });
        }
    }

    render() {
        const {
            currentQuestion,
            currentQuestionIndex,
            numberOfQuestions,
            hints, fiftyFifty, time
        } = this.state;
        return (
            < div >
                <Helmet>
                    <title>{this.state.title}</title>
                </Helmet>
                <React.Fragment>
                    <audio id="correct" src={correctSound} ></audio>
                    <audio id="wrong" src={wrongSound} ></audio>
                    <audio id="exit" src={exitSound} ></audio>
                </React.Fragment>
                <div className="container-fluid text-white mt-5">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <h2>Quiz mode</h2>
                            <div className="Life-Line">
                                <span style={{ float: 'left' }} ><i onClick={this.handleHints} className="fa fa-lightbulb"></i>&nbsp;{hints}&nbsp; (Hint)</span><br />
                                <span className="lifeLine" style={{ float: 'right' }} > <i onClick={this.handleFiftyFifty} className="fa fa-toggle-off"></i> {fiftyFifty}&nbsp;(50/50) </span><br />
                            </div>

                            <p >
                                <span style={{ float: 'left' }}>{currentQuestionIndex + 1} of {numberOfQuestions}</span><br />
                                <span style={{ float: 'right' }} > <i className="far fa-clock"></i>{time.minutes}: {time.seconds} </span>
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
                                <button id="previous-button"
                                    onClick={this.handleButtonClick}
                                    disabled={this.state.previousButtonDisabled}
                                    className="btn btn-primary ">Previous</button>&nbsp;&nbsp;&nbsp;

                                <button id="quit-button"
                                    onClick={this.handleButtonClick}
                                    className="btn btn-danger">Quit</button>&nbsp;&nbsp;&nbsp;

                                <button id="next-button"
                                    onClick={this.handleButtonClick}
                                    disabled={this.state.nextButtonDisabled}
                                    className="btn btn-info " >Next</button>&nbsp;&nbsp;&nbsp;
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