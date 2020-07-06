import React from 'react';
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';
import '../../components/Home/Home.css';

const Home = () => (
    <div>
        <Helmet>
            <title>Quiz App - home</title>
        </Helmet>
        <div className="container-fluid" id="home">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8 mt-5">
                    <div className="card text-center text-white bg-primary shadow-lg p-3 mb-5  rounded">
                        <h5 className="card-header ">
                            <span className="mdi mdi-cube-outline" >Welcome to Quiz Application</span>
                        </h5>
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to="/play/instructions"> <button className="btn btn-info btn-lg btn-block">
                                    Play
                                </button>
                                </Link>
                            </h5>
                            <p className="card-text">Click play to start the quiz</p>
                            <Link to="/login" > <button disabled className="btn btn-info btn-lg mx-4 mt-3">
                                Sign in
                            </button></Link >
                            <Link to="/register"> <button disabled className="btn btn-primary btn-lg mx-4 mt-3">
                                Sign up
                            </button> </Link >
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    </div >
);

export default Home;