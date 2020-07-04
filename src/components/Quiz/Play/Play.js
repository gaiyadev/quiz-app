import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Quiz page</title>
                </Helmet>
                <div className="container-fluid text-white mt-5">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <div className="Life-Line">
                                <span style={{ float: 'left' }} >life line2</span>
                                <span style={{ float: 'right' }} >Hint2</span>
                            </div>
                            <br />
                            <p style={{ float: 'left' }}>
                                <span>1/25</span><br />
                                <span>25:00</span>
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
            </Fragment >
        );
    }
}

export default Play;