import React from 'react';
import config from '../../config';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerEmail: '',
            registerPassword: '',
            registerName: ''
        };
    }

    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value});
    }

    onNameChange = (event) => {
        this.setState({registerName: event.target.value});
    }

    onSubmitRegister = () => {
        fetch(config.apiUrl + '/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                name: this.state.registerName
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user && user.id) {
                    this.props.loadUser(user);
                    this.hideErrorPane();
                    this.props.onRouteChange('home');
                } else {
                    this.showErrorPane('Incorrect form submission');
                }
            });
    }

    showErrorPane(message) {
        const errorPane = document.getElementById("errorPane");
        errorPane.innerHTML = message;
        errorPane.style.display = "block";
    }

    hideErrorPane() {
        document.getElementById("errorPane").style.display = "none";
    }

    render() {
        return (
            <article className="br3 ba mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
                <main className="pa4">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <p className="f6 dim red db" id="errorPane" style={{display: "none"}} ></p>
                        <div className="">
                            <input
                                onClick={this.onSubmitRegister}
                                className="b ph3 pv2 input-reset ba bg-transparent grow pointer light-silver f6 dib" type="submit" value="Register" />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;
