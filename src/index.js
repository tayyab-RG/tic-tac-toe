import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Square extends React.Component {
    render() {
        return (
        <button
            className="square"
            onClick={() => this.props.onClick()}
        >
            {this.props.value}
        </button>
        );
    }
}

class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state  = {
    //         squares: Array(9).fill(null),
    //         xIsNext : true,
    //         winner : null,
    //         isDraw : false,
    //         history : []
    //     };
    // }

    // handleClick(i) {
    //     const squares = this.state.squares.slice();

    //     if (this.state.winner || this.state.isDraw || squares[i]) {
    //         return;
    //     }

    //     squares[i] = this.state.xIsNext ? "O" : "X";
    //     let xIsNext = !this.state.xIsNext;
    //     let winner = this.checkForWinner(squares);
    //     let isDraw = winner ? false : this.isDraw(squares);
    //     this.state.history.push(squares);

    //     this.setState({
    //         squares : squares,
    //         xIsNext : xIsNext,
    //         winner : winner,
    //         isDraw : isDraw
    //     });

    // }

    renderSquare(i) {
        return <Square
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                />;
    }

    // checkForWinner(squares) {
    //     const lines = [
    //         [0, 1, 2],
    //         [3, 4, 5],
    //         [6, 7, 8],
    //         [0, 3, 6],
    //         [1, 4, 7],
    //         [2, 5, 8],
    //         [0, 4, 8],
    //         [2, 4, 6],
    //       ];
    //       for (let i = 0; i < lines.length; i++) {
    //         const [a, b, c] = lines[i];
    //         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    //           return squares[a];
    //         }
    //       }
    //       return null;
    // }

    // isDraw(squares) {
    //     for (let i = 0; i < squares.length; i++) {
    //         if (!squares[i]) return false;
    //     }
    //     return true;
    // }

    render() {
        const status = (this.props.winner || this.props.isDraw) ? "Game has ended" : 'Current player: ' + (this.props.xIsNext ? "O" : "X");
        let winner = this.props.winner ? "The Winner is : " + this.props.winner : "";
        let isDraw = this.props.isDraw ? "the Game is drawn" : "";

        return (
        <div>
            <div className="status">{status}</div>
            <div className="winner">{winner}</div>
            <div className="draw">{isDraw}</div>
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history : [{
                squares : Array(9).fill(null)
            }],
            xIsNext : true,
            step : 0,
            winner : null,
            isDraw : false
        };
    }

    checkForWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
          for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return squares[a];
            }
          }
          return null;
    }

    isDraw(squares) {
        for (let i = 0; i < squares.length; i++) {
            if (!squares[i]) return false;
        }
        return true;
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[this.state.step];
        const squares = current.squares.slice();

        if (this.state.winner || this.state.isDraw || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "O" : "X";
        let winner = this.checkForWinner(squares);
        let isDraw = winner ? false : this.isDraw(squares);

        this.setState({
            history: history.concat([
            {
                squares: squares
            }
            ]),
            step: history.length,
            xIsNext: !this.state.xIsNext,
            winner : winner,
            isDraw : isDraw

        });
    }

    jumpTo(step) {
        this.setState({
            step: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        let history = this.state.history;
        let current = history[this.state.step];

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        return (
        <div className="game">
            <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={i => this.handleClick(i)}
                winner={this.state.winner}
                isDraw={this.state.isDraw}
                xIsNext={this.state.xIsNext}
            />
            </div>
            <div className="game-info">
            <div>{/* status */}</div>
            <ol>{moves}</ol>
            </div>
        </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);