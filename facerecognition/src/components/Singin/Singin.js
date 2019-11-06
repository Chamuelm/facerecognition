import React from 'react';

class Singin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            singInEmail: '',
            singInPassword: '',
            wrongCredentialsTextShown: ''
        };
    }

    onEmailChange = (event) => {
        this.setState({singInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({singInPassword: event.target.value});
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.singInEmail,
                password: this.state.singInPassword
            })
        }).then(response =>  {
            if (response.status === 200) {
                response.json()
                    .then(user => {
                        this.props.loadUser(user);
                        this.props.onRouteChange('home');
                    });
            } else {
                this.showWrongCredentialsError();
            }
        });
    }

    showWrongCredentialsError() {
        document.getElementById("wrongCredParagraph").style.display = "block";
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
                <main className="pa4">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
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
                        <p className="f6 link dim red db pointer" id="wrongCredParagraph" style={{display: "none"}} >Wrong credentials. Try again.</p>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba bg-transparent grow pointer light-silver f6 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim light-silver db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Singin;
