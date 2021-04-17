import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const str_heroes = ["Abaddon","Alchemist","Axe","Beastmaster","Brewmaster","Io"]
const agi_heroes = ["Anti-Mage","Arc_Warden","Bloodseeker","Bounty_Hunter","Broodmother"]
const int_heroes = ["Ancient_Apparition","Bane","Batrider","Chen","Crystal_Maiden","Dark_Seer"]

//src={process.env.PUBLIC_URL+'./images/Strength Heroes/Axe_icon.png'}
// Individual hero icon
function Square(props) {
  return (
    <img
      alt = "hero icon"
      src={process.env.PUBLIC_URL+props.hero_img}
      className={props.class}
      onClick={props.onClick}
    ></img>
  );
}

class Banner extends React.Component {
  render() {
    return (
      <div>Lorem Impsum</div>
    );
  }
}

// List of all heroes
class Board extends React.Component {
  renderSquare(i,attr,name) {

    let className;
    if (this.props.bans.includes(name)){
      className = "banned-square"
    } else if (this.props.radiant_picks.includes(name)){
      className = "radiant-square"
    } else if (this.props.dire_picks.includes(name)){
      className = "dire-square"
    } else {
      className = "square"
    }

    console.log(name)
    console.log(className)
    return (
      <Square
        key = {name}
        value={attr}
        class={className}
        hero_img={'./images/'+ attr + ' Heroes/'+ name+ '_icon.png'}
        onClick={() => this.props.onClick(name)}
      />
    );
  }

  render() {

    const strength_hero_list = str_heroes.map((step, i) => {

      return this.renderSquare(i,"Strength",str_heroes[i])
    })

    const agility_hero_list = agi_heroes.map((step, i) => {

      return this.renderSquare(i,"Agility",agi_heroes[i])
    })

    const intelligence_hero_list = int_heroes.map((step, i) => {

      return this.renderSquare(i,"Intelligence",int_heroes[i])
    })

    return (
      <div>
        <div className="board-row">
          {strength_hero_list}
        </div>
        <div className="board-row">
          {agility_hero_list}
        </div>
        <div className="board-row">
          {intelligence_hero_list}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    // 5 radiant hero picks, 5 dire hero picks, banned heroes
    // select is user selecting a banned, radiant or dire hero
    this.state = {
      radiant_picks: ["Axe"],
      dire_picks: ["Chen"],
      bans: ["Bane"],
      select: "B"
    }
  }

  handleClick(name) {
    console.log(name + ' was clicked')
    let new_bans = this.state.bans
    let new_radiant_picks = this.state.radiant_picks
    let new_dire_picks = this.state.dire_picks

    // if user is in ban mode
    if (this.state.select == "B"){
      // if hero is already in ban list, remove it from ban list
      if (this.state.bans.includes(name)){
        new_bans.splice(new_bans.indexOf(name),1)
      // if hero is not in ban list, add it to list
      } else {
        // if hero is picked on either team, remove it from that list
        if (this.state.radiant_picks.includes(name)){
          new_radiant_picks.splice(new_radiant_picks.indexOf(name),1)
        } else if (this.state.dire_picks.includes(name)){
          new_dire_picks.splice(new_dire_picks.indexOf(name),1)
        }
        new_bans.push(name)
      }
    }

    this.setState({
      radiant_picks : new_radiant_picks,
      dire_picks : new_dire_picks,
      bans: new_bans,
      select: this.state.select
    })
  }

  render() {
    /*const history = this.state.history
    const current = history[history.length - 1]
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';

      //added key here to maintain unique keys among sibling components
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })*/

    return (
      <div className="Screen">
        <div className ="Banner">
          <Banner />
        </div>
        <div className="content">
          <div className = "hero-board">
            <Board
              bans = {this.state.bans}
              radiant_picks = {this.state.radiant_picks}
              dire_picks = {this.state.dire_picks}
              onClick = {(name) => this.handleClick(name)}
            />
          </div>
          <div className="game-info">
            <div>Under Construction!</div>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
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
