import React, { Component } from 'react';
import { Table, Button, Card } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export class ShowQuestions extends Component {
    static displayName = ShowQuestions.name;

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            loading: true,
            editQuestion: false,
            wrongAnswers: [],
            question: ''
            
        };
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.renderQuestions = this.renderQuestions.bind(this);
    }

    componentDidMount() {
        this.populateQuestions();
    }

     renderQuestions(questions) {
        return (
            <Table responsive>
                <thead>
                   <tr>
                       <th>Question</th>
                   </tr>
               </thead>
                <tbody>
                    {questions.map(question =>
                        <tr key={question.id}>   
                            <td class="bg-info">{question.questionText}</td>
                            <td class="bg-info"><Button color="success" onClick={() => this.editQuestion(question.id)}>Edit Question</Button></td>
                            <td class="bg-info"><Button color="danger" onClick={() => this.deleteQuestion(question.id)}>Delete Question</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }


    render() {
        let contents = this.state.editQuestion
            ? this.renderQuestionToEdit(this.state.question, this.state.wrongAnswers)
            : this.renderQuestions(this.state.questions);

        return (
            <div>
                <h1 id="tabelLabel" >Edit Questions</h1>
                {contents}
            </div>
        );
    }

    async populateQuestions() {
        const response = await fetch('/question');
        const data = await response.json();
        this.setState({ questions: data, loading: false });
    }

    async deleteQuestion(questionid) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }  
        };
        var response =  await fetch("/question/" + questionid, requestOptions).then();
        console.log(response);
        this.populateQuestions();
    }

    async editQuestion(questionid) {
        let result = await fetch("/question/" + questionid).then(response => response.json()); 
        let array = []
        result.answers.forEach(answer => {
            if(answer.answerText != result.correctAnswer) array.push(answer.answerText)
        });
        this.setState({ editQuestion: true, question: result, wrongAnswers: array });
    }
     removeItemOnce(arr, value) {
     var index = arr.indexOf(value);
         if (index > -1) {
             arr.splice(index, 1);
         }
         return arr;
}

   renderQuestionToEdit(question, wrongAnswers) {
      
       console.log(question.id)
       
   return(
      <div>
          <Formik
              initialValues={{
                  difficulty: question.difficulty,
                  category: question.category,
                  question: question.questionText,
                  correctanswer: question.correctAnswer,
                  wronganswerone: wrongAnswers[0],
                  wronganswertwo: wrongAnswers[1],
                  wronganswerthree: wrongAnswers[2],
                  id: question.id
   
              }}
              validationSchema={Yup.object().shape({
                  question: Yup.string().required('Question is required'),
                  correctanswer: Yup.string().required('Correct answer is required'),
                  wronganswerone: Yup.string().required('An answer is required'),
                  wronganswertwo: Yup.string().required('An answer is required'),
                  wronganswerthree: Yup.string().required('An answer is required'),
   
              })}
              onSubmit={({ question, correctanswer, wronganswerone, wronganswertwo, wronganswerthree, difficulty, category, id }, { setStatus, setSubmitting, resetForm }) => {
                  setStatus();
                 this.submitChange(question, correctanswer, wronganswerone, wronganswertwo, wronganswerthree, difficulty, category, id)
                     .then(
                         this.setState({editQuestion: false}),
                         error => {
                             setSubmitting(false);
                             setStatus(error);
                         }
                     );
              }}>
                  {props => (
                      <Card color="info">
                  <Form>
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
                          <label htmlFor="wronganswertwo">Wrong Answer Two</label><br />
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
                          <button type="submit" className="btn btn-primary" disabled={props.isSubmitting}>Submit Changes</button>
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

   async submitChange(question, correctanswer, wronganswerone, wronganswertwo, wronganswerthree, difficulty, category, questionid) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, correctanswer, wronganswerone, wronganswertwo, wronganswerthree, difficulty, category })
        };
        console.log(questionid);
        await fetch('/question/' + questionid, requestOptions)
           .then();

       this.populateQuestions();
    }
}

