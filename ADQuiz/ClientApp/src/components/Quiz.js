import React, { Component } from 'react';
import { Jumbotron, Card, Button, CardTitle, CardText } from 'reactstrap';

export class Quiz extends Component {
    constructor(props) {
        super(props);
        this.CheckAnswer = this.CheckAnswer.bind(this);
        this.renderQuestions = this.renderQuestions.bind(this);
        this.state = {
            questions: [],
            loading: true,
            questionIndex: 1,
            score: 0
          

        }
    }

    componentDidMount() {
        this.populateQuestions();
    }

    render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p>
            : this.renderQuestions(this.state.questions, this.state.questionIndex)

        return (
            <div>
                <h1 id="tabelLabel" >Questions</h1>
                {contents}
            </div>
        );
    }

    renderQuestions(questions, index) {
       return (
           <div className="text-center">
               <Card body inverse color="info">
                   <CardTitle><h3>Category: {questions[index].category}</h3></CardTitle>
                   <CardText>{questions[index].questionText}</CardText>
                   {questions[index].answers.map(answer => <Button color="secondary" onClick={() => this.CheckAnswer(questions[index].id, answer.id)} >{answer.answerText}</Button>)}
                   
               </Card>
           </div>

       );
    }


    async populateQuestions() {
       const response = await fetch('/question').then((response) => response.json());
        
       this.setState({ questions: response, loading: false })
    }

    async CheckAnswer(questionId, answerId) {
        let result = await fetch('/question/' + questionId).then((response) => response.json());
        console.log(result.correctAnswer);
        console.log(answerId);
        if (result.correctAnswer == answerId)
        {
            this.setState({ score: this.state.score + 1, questionIndex: this.state.questionIndex + 1 })
            console.log("true");
            return;
        }
    }
}



