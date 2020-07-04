import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';

const Home = (props) => (
    <Fragment>
        <Helmet>
            <title>Quiz App - home</title>
        </Helmet>
        <div className="container-fluid" id="home">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8 mt-5">
                    <div className="card text-center text-white bg-success shadow-lg p-3 mb-5  rounded">
                        <h5 className="card-header ">
                            <span className="mdi mdi-cube-outline" >QuizApp</span>
                        </h5>
                        <div className="card-body">
                            <h5 className="card-title">
                                <button className="btn btn-danger btn-lg btn-block">
                                    <Link to="/play/instructions"></Link>
                                    Play
                                </button>
                            </h5>
                            <p className="card-text">Click play to start the quiz</p>
                            <button className="btn btn-info btn-lg mx-4 mt-3">
                                <Link to="/login" ></Link >Sign in
                            </button>
                            <button className="btn btn-primary btn-lg mx-4 mt-3">
                                <Link to="/register"></Link >Sign up
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>

        </div>
    </Fragment>
);

export default Home;