import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';



class Login extends React.Component {
    constructor(props) {
        super(props);
        //this.loggedin = this.loggedin.bind(this);
    }
    render() {
        //console.log("parentpropLogin = " + this.props.parentIsLoggedIn)
        return (
            <div>
                <h2>Login</h2>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().required('Email is required'),
                        password: Yup.string().required('Password is required')
                    })}
                    onSubmit={({ email, password }, { setStatus, setSubmitting}) => {
                        setStatus();
                        login(email, password)
                            .then(
                                this.props.history.push('/'),
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                        ).then(/*(Response) => { this.loggedin()}*/
                        );
                    }}>
                    {props => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="text" className={'form-control' + (props.errors.username && props.touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (props.errors.password && props.touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={props.isSubmitting}>Login</button>
                                {props.isSubmitting &&
                                    <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                            {props.status &&
                                <div className={'alert alert-danger'}>{props.status}</div>
                            }
                        </Form>
                    )}
                </Formik>

            </div>
                        


        )
        

    }
    //loggedin() {
    //    const requestOptions = {
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' },
    //    };

    //    return fetch('/loggedin', requestOptions)
    //        .then(data => {
    //            console.log(data);
    //            if (data.ok) {
    //                this.props.parentCallbackChangeLoggedin(true)
    //                console.log("precis bytat till true " + this.props.parentIsLoggedIn)
    //            }
    //            else if (!data.ok) {
    //                this.props.parentCallbackChangeLoggedin(false)
    //                console.log("precis bytat till false " + this.props.parentIsLoggedIn)
    //            }

    //            console.log("har varken bytat eller " + this.props.parentIsLoggedIn)
    //            return data;
    //        });
    //};
    
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch('/login', requestOptions)
        .then(data => {
            console.log(data);
            return data;
        });
};



function register(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch('/register', requestOptions)
        .then(data => {
            console.log(data);
            return data;
        });
}
export { Login };
