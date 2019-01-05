import React, {Component} from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

import axios from "axios/index";

library.add(faSearch);

class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: '',
            resultsReceived: []
        };
    }

    componentWillMount() {
        axios.get('https://candidate-test.herokuapp.com/contacts')
            .then(res => {
                this.setState({resultsReceived: res.data});
            });
    }



    toggleMoreInfo(e) {
        if (e.target.classList.contains("results-section-item")) {
            const t = e.target;
            if (t.style.height === "440px") {
                e.target.style.height = "382px";
                e.target.getElementsByClassName("item-more-details-container")[0].style.display = "none";
            } else {
                t.style.height = "440px";
                setTimeout(function () {
                    if (t.style.height === "440px") t.getElementsByClassName("item-more-details-container")[0].style.display = "block";
                }, 500);
            }
        }
        return false;
    }

    render() {
        let ResultsForName = this.state.resultsReceived.map((result) => {
            if (result.name.includes(this.state.value) ||
                result.job.includes(this.state.value) ||
                result.company_name.includes(this.state.value) ||
                result.phone.includes(this.state.value) ||
                result.email.includes(this.state.value)
            ) {
                return <div className="results-section-item"
                            onMouseEnter={this.toggleMoreInfo}
                            onMouseLeave={this.toggleMoreInfo}
                            onClick={this.toggleMoreInfo}>
                            <div className="item-profile-image-container">
                                <img src={result.profile_image} alt={result.name}></img>
                                <div className="item-icon-image-container">
                                    <img src={result.icon} alt={result.company_name}></img>
                                </div>
                            </div>
                            <div className="item-user-name">{result.name}</div>
                            <div>
                                <span>{result.job} |</span>
                                <span> @{result.company_name}</span>
                            </div>
                            <div className="item-more-details-container">
                                <br/>
                                <div>Phone Number {result.phone}</div>
                                <div>{result.email}</div>
                            </div>
                        </div>
            }
            return false;
        });

        return (
            <div className="app">
                <header>
                    <img
                        src={'https://downloads.intercomcdn.com/i/o/86437/3d5f69d25957c368b1793ed8/c00a58f3c0a0c632419bc58ff1a0855b.png'}
                        alt="HoneyBook logo"/>
                </header>
                <div className="search-section-wrapper">
                    <form className="search-section">
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Contact list:</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.value}
                                placeholder="search..."
                                onChange={this.handleChange}
                            />
                            <FontAwesomeIcon icon="search" className="search-icon"/>
                        </FormGroup>
                    </form>
                </div>
                <div className="results-section-wrapper">
                    <div className="results-section">
                        {ResultsForName}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
