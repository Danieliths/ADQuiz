import React, { Component } from 'react';
import { Jumbotron, Card, Button, CardTitle, CardText } from 'reactstrap';

export class Quiz extends Component {
    constructor(props) {
        super(props);
        this.CheckAnswer = this.CheckAnswer.bind(this);
        this.renderQuestions = this.renderQuestions.bind(this);
        this.SubmitScore = this.SubmitScore.bind(this);
        this.state = {
            questions: [],
            loading: true,
            questionIndex: 0,
            score: 0,
            IsAnswered: false,
            buttonColors: ["secondary", "secondary", "secondary", "secondary"]
        }
    }

    componentDidMount() {
        this.populateQuestions();
    }

    render() {
        let contents = "";
        if (this.state.loading) {
            contents = <p><em>Loading...</em></p>;
        }
        else if (this.state.questionIndex < this.state.questions.length) {
            contents = this.renderQuestions(this.state.questions, this.state.questionIndex)
        }
        else if (this.state.questionIndex >= this.state.questions.length) {
            contents = <div className="text-center">
                <Card body inverse color="info">
                    <CardTitle><h1>Your score is: {this.state.score}</h1></CardTitle>
                    <CardText><button onClick={() => this.SubmitScore()}>Submit score</button></CardText>
                    </Card>
            </div>
        }
        
           

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
                   {questions[index].answers.map((answer, answersIndex) => <Button disabled={this.state.IsAnswered} color={this.state.buttonColors[answersIndex]} onClick={() => this.CheckAnswer(questions[index].id, answer.id, answersIndex)} >{answer.answerText}</Button>)}
                   <Button color="primary" disabled={!this.state.IsAnswered} onClick={() => this.RenderNextQuestion()}>Next Question</Button>
               </Card>
           </div>

       );
    }

    async SubmitScore() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ this.state.score })
        };

        return fetch('/login', requestOptions)
            .then(data => {
                console.log(data);
                return data;
            });
    }

    async populateQuestions() {
       const response = await fetch('/question').then((response) => response.json());
        
       this.setState({ questions: response, loading: false })
    }

    async CheckAnswer(questionId, answerId, buttonIndex) {
        let result = await fetch('/question/' + questionId).then((response) => response.json());
        let newButtonColors = this.state.buttonColors;
        if (result.correctAnswer == answerId) {
            newButtonColors[buttonIndex] = "success"
            this.setState({ score: this.state.score + 1, buttonColors: newButtonColors })


        }
        else {
            newButtonColors[buttonIndex] = "danger"
            this.setState({buttonColors: newButtonColors})
        }
        this.setState({IsAnswered: true})
    }

    RenderNextQuestion() {
        this.setState({ IsAnswered: false, questionIndex: this.state.questionIndex + 1, buttonColors: ["secondary", "secondary", "secondary", "secondary",] })
    }
    
} 



