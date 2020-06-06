import React, { Component } from 'react';
import { Button, Card, CardText, CardTitle } from 'reactstrap';

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
            buttonColors: ["secondary", "secondary", "secondary", "secondary"],
            startQuiz: false,
            currentUser: null,
            userIsAdmin: false
        }
    }

    componentDidMount() {
        this.populateQuestions();
    }

    render() {
        let contents = "";
        if (!this.state.startQuiz) {
            contents = this.renderStartScreen()
        }
        else if (this.state.questionIndex < this.state.questions.length) {
            contents = this.renderQuestions(this.state.questions, this.state.questionIndex)
        }
        else if (this.state.questionIndex >= this.state.questions.length) {
            contents = this.renderScoreScreen()
        }
        return (
            <div>
                
                {contents}
            </div>
        );
    }

    renderStartScreen() {
        return <div className="text-center">
            <Card body inverse color="info">
                <CardTitle><h1>Are You Ready To Quiz?</h1></CardTitle>
                <CardText><Button color="success" onClick={() => { this.setState({ startQuiz: true }) }}>Start Quiz!</Button></CardText>
            </Card>
        </div>;
    }

    renderScoreScreen() {
        return <div className="text-center">
            <Card body inverse color="info">
                <CardTitle><h1>Your score is: {this.state.score}</h1></CardTitle>
                <CardText><Button color="success" onClick={() => this.SubmitScore(this.state.score)}>Submit score</Button></CardText>
            </Card>
        </div>;
    }

    renderQuestions(questions, index) {
       return (
           <div className="text-center ">
               <Card className="mx-auto" body inverse color="info">
                   <CardTitle><h3>Category: {questions[index].category}</h3></CardTitle>
                   <CardText >{questions[index].questionText}</CardText>
                   {questions[index].answers.map((answer, answersIndex) => <Button className="mb-1 w-50 mx-auto" disabled={this.state.IsAnswered} color={this.state.buttonColors[answersIndex]} onClick={() => this.CheckAnswer(questions[index].id, answer.answerText, answersIndex)} >{answer.answerText}</Button>)}
                   <Button className="mb-1 w-50 mx-auto" color="primary" disabled={!this.state.IsAnswered} onClick={() => this.RenderNextQuestion()}>Next Question</Button>
               </Card>
           </div>

       );
    }

    async SubmitScore(score) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ score })
        };

        return fetch('/highscore', requestOptions)
            .then(data => {
                console.log(data);
                return data;
            });
    }

    async populateQuestions() {
       const response = await fetch('/question').then((response) => response.json());
        
       this.setState({ questions: response, loading: false })
    }

    async CheckAnswer(questionId, answerText, buttonIndex) {
        let result = await fetch('/question/' + questionId).then((response) => response.json());
        let newButtonColors = this.state.buttonColors;
        
        if (result.correctAnswer === answerText) {
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



