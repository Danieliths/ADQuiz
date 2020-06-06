import React, { Component } from 'react';

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
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>UserName</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {highscoreList.map(highscoreList =>
                        <tr key={highscoreList.highScore}>
                            <td>{highscoreList.userName}</td>
                            <td>{highscoreList.highScore}</td>
                        </tr>
                    )}
                </tbody>
            </table>
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