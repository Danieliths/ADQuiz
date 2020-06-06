import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Card } from 'reactstrap';

class AddQuestion extends React.Component {
    render() {
        return (
            <div>
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
                        <Card color="info">
                            <Form >
                                    <div className="form-group text-center">
                                        <label htmlFor="question">Question</label><br />
                                        <Field name="question" type="text" className="mb-1 w-80 mx-auto ${'form-control' + (props.errors.question && props.touched.question ? ' is-invalid' : '')}" />
                                    <ErrorMessage name="question" component="div" className="invalid-feedback" />
                                </div>
                                    <div className="form-group text-center">
                                        <label htmlFor="correctanswer">Correct Answer</label><br />
                                        <Field name="correctanswer" type="text" className="mb-1 w-80 mx-auto ${'form-control' + (props.errors.correctanswer && props.touched.correctanswer ? ' is-invalid' : '')}" />
                                    <ErrorMessage name="correctanswer" component="div" className="invalid-feedback" />
                                </div>
                                    <div className="form-group text-center">
                                        <label htmlFor="wronganswerone">Wrong Answer One</label><br />
                                        <Field name="wronganswerone" type="text" className="mb-1 w-80 mx-auto ${'form-control' + (props.errors.wronganswerone && props.touched.wronganswerone ? ' is-invalid' : '')}" />
                                    <ErrorMessage name="wronganswerone" component="div" className="invalid-feedback" />
                                </div>
                                    <div className="form-group text-center">
                                        <label htmlFor="wronganswertwo">Wrong Answer Two</label><br/>
                                        <Field name="wronganswertwo" type="text" className="mb-1 w-80 mx-auto ${'form-control' + (props.errors.wronganswertwo && props.touched.wronganswertwo ? ' is-invalid' : '')}" />
                                    <ErrorMessage name="wronganswertwo" component="div" className="invalid-feedback" />
                                </div>
                                    <div className="form-group text-center">
                                        <label htmlFor="wronganswerthree">Wrong Answer Three</label><br />
                                        <Field name="wronganswerthree" type="text" className="mb-1 w-80 mx-auto ${'form-control' + (props.errors.wronganswerthree && props.touched.wronganswerthree ? ' is-invalid' : '')}" />
                                    <ErrorMessage name="wronganswerthree" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group text-center">
                                    <Field as="select" name="difficulty">
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </Field>
                                </div>
                                <div className="form-group text-center">
                                    <Field as="select" name="category">
                                        <option value="games">Games</option>
                                        <option value="politics">Politics</option>
                                        <option value="sport">Sport</option>
                                    </Field>
                                </div>
                                <div className="form-group text-center">
                                    <Button color="success" type="submit" disabled={props.isSubmitting}>Submit Question</Button>
                                    {props.isSubmitting &&
                                        <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                </div>
                                {props.status &&
                                    <div className={'alert alert-danger'}>{props.status}</div>
                                }
                            </Form>
                        </Card>
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