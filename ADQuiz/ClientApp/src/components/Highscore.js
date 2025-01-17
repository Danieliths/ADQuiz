﻿import React, { Component } from 'react';
import { Table } from 'reactstrap';
export class Highscore extends Component {
    static displayName = Highscore.name;
    constructor(props) {
        super(props);
        this.state = { highscoreList: [], loading: true };
    }

    componentDidMount() {
        this.getHighscoreList();
    }

    static renderHighscoreTable(highscoreList) {
        return (
            <Table dark>
                <thead>
                    <tr>
                        <th>UserName</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {highscoreList.map(highscoreList =>
                        <tr key={highscoreList.highScore}>
                            <td>{highscoreList.userName}</td>
                            <td>{highscoreList.highScore}</td>
                            <td>{highscoreList.highScoreTime}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Highscore.renderHighscoreTable(this.state.highscoreList);

        return (
            <div>
                <h1 id="tabelLabel" >Highscore</h1>
                {contents}
            </div>
        );
    }
    async getHighscoreList() {
        const response = await fetch('/highscore');
        const data = await response.json();
        this.setState({ highscoreList: data, loading: false })
    }
    
}


//.then((response) => response.json())