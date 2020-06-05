import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class AddQuestion extends React.Component {
    render() {
        return (
            <div>
                <h2>Register</h2>
                <Formik
                    initialValues={{
                        difficulty: 'easy',
                        category: 'games',
                        question: '',
                        correctanswer: '',
                        wronganswerone: '',
                        wronganswertwo: '',
                        wronganswerthree: ''
              
                    }}
                    validationSchema={Yup.object().shape({
                        question: Yup.string().required('Question is required'),
                        correctanswer: Yup.string().required('Correct answer is required'),
                        wronganswerone: Yup.string().required('An answer is required'),
                        wronganswertwo: Yup.string().required('An answer is required'),
                        wronganswerthree: Yup.string().required('An answer is required'),
                        
                    })}
                    onSubmit={({ question, correctanswer, wronganswerone, wronganswertwo, wronganswerthree, difficulty, category }, { setStatus, setSubmitting, resetForm }) => {
                        setStatus();
                        submitQuestion(question, correctanswer, wronganswerone, wronganswertwo, wronganswerthree, difficulty, category)
                            .then(
                                resetForm(),
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}>
                    {props => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="question">Question</label>
                                <Field name="question" type="text" className={'form-control' + (props.errors.question && props.touched.question ? ' is-invalid' : '')} />
                                <ErrorMessage name="question" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="correctanswer">Correct Answer</label>
                                <Field name="correctanswer" type="text" className={'form-control' + (props.errors.correctanswer && props.touched.correctanswer ? ' is-invalid' : '')} />
                                <ErrorMessage name="correctanswer" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="wronganswerone">Wrong Answer One</label>
                                <Field name="wronganswerone" type="text" className={'form-control' + (props.errors.wronganswerone && props.touched.wronganswerone ? ' is-invalid' : '')} />
                                <ErrorMessage name="wronganswerone" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="wronganswertwo">Wrong Answer Two</label>
                                <Field name="wronganswertwo" type="text" className={'form-control' + (props.errors.wronganswertwo && props.touched.wronganswertwo ? ' is-invalid' : '')} />
                                <ErrorMessage name="wronganswertwo" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="wronganswerthree">Wrong Answer Three</label>
                                <Field name="wronganswerthree" type="text" className={'form-control' + (props.errors.wronganswerthree && props.touched.wronganswerthree ? ' is-invalid' : '')} />
                                <ErrorMessage name="wronganswerthree" component="div" className="invalid-feedback" />
                            </div>
                            <div>
                                <Field as="select" name="difficulty">
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </Field>
                            </div>
                            <div>
                                <Field as="select" name="category">
                                    <option value="games">Games</option>
                                    <option value="politics">Politics</option>
                                    <option value="sport">Sport</option>
                                </Field>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={props.isSubmitting}>Submit Question</button>
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
}
function submitQuestion(question, correctanswer, wronganswerone, wronganswertwo, wronganswerthree, difficulty, category) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, correctanswer, wronganswerone, wronganswertwo, wronganswerthree, difficulty, category })
    };

    return fetch('/question', requestOptions)
        .then(data => {
            console.log(data);
            return data;
        });
}
export { AddQuestion };