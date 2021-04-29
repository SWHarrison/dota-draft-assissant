import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Importing json data created from running the JSON_assembly.py script
import hero_data from './hero_data.json'
console.log(hero_data)
console.log(hero_data["Axe"])
console.log(hero_data["Axe"]["Role"])

const str_heroes = ["Abaddon","Alchemist","Axe","Beastmaster","Brewmaster","Bristleback","Centaur_Warrunner","Chaos_Knight","Clockwerk","Dawnbreaker","Doom","Dragon_Knight","Earth_Spirit","Earthshaker","Elder_Titan","Huskar","Io","Kunkka","Legion_Commander","Lifestealer","Lycan","Magnus","Mars","Night_Stalker","Omniknight","Phoenix","Pudge","Sand_King","Slardar","Snapfire","Spirit_Breaker","Sven","Tidehunter","Timbersaw","Tiny","Treant_Protector","Tusk","Underlord","Undying","Wraith_King"]
const agi_heroes = ["Anti-Mage", "Arc_Warden", "Bloodseeker", "Bounty_Hunter", "Broodmother", "Clinkz", "Drow_Ranger", "Ember_Spirit", "Faceless_Void", "Gyrocopter", "Hoodwink", "Juggernaut", "Lone_Druid", "Luna", "Medusa", "Meepo", "Mirana", "Monkey_King", "Morphling", "Naga_Siren", "Nyx_Assassin", "Pangolier", "Phantom_Assassin",  "Phantom_Lancer", "Razor", "Riki", "Shadow_Fiend",  "Slark", "Sniper", "Spectre", "Templar_Assassin", "Terrorblade", "Troll_Warlord", "Ursa", "Vengeful_Spirit", "Venomancer", "Viper",  "Weaver"]
const int_heroes = ["Ancient_Apparition", "Bane", "Batrider", "Chen", "Crystal_Maiden", "Dark_Seer", "Dark_Willow",  "Dazzle", "Death_Prophet", "Disruptor", "Enchantress", "Enigma", "Grimstroke", "Invoker", "Jakiro", "Keeper_of_the_Light", "Leshrac", "Lich", "Lina", "Lion", "Nature's_Prophet",  "Necrophos", "Ogre_Magi", "Oracle", "Outworld_Destroyer", "Puck", "Pugna", "Queen_of_Pain",  "Rubick", "Shadow_Demon", "Shadow_Shaman", "Silencer", "Skywrath_Mage", "Storm_Spirit", "Techies", "Tinker", "Visage", "Void_Spirit", "Warlock", "Windranger", "Winter_Wyvern", "Witch_Doctor", "Zeus"]

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

class SelectMode extends React.Component {
  render() {
    return (
      <div className = "select-mode-buttons">
        <button
          className = {this.props.select === "B" ? "selected-button" : "button"}
          onClick = {() => this.props.onClick("Bans")}
        >Ban Heroes</button>
        <button
          className = {this.props.select === "R" ? "selected-button" : "button"}
          onClick = {() => this.props.onClick("Radiant")}
        >Radiant Picks</button>
        <button
          className = {this.props.select === "D" ? "selected-button" : "button"}
          onClick = {() => this.props.onClick("Dire")}
        >Dire Picks</button>
      </div>
    )
  }
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

    //console.log(name)
    //console.log(className)
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

class GameInfo extends React.Component {
  render() {
    const bans = this.props.bans.map((name, i) => {

      return (<div key = {name}>{name}</div>)
    })

    let r_greed = 0
    let d_greed = 0
    let r_disable = 0
    let d_disable = 0

    for (let i = 0; i < this.props.radiant_picks.length; i++) {
      console.log(this.props.radiant_picks[i])
      r_greed += parseInt(hero_data[this.props.radiant_picks[i]]["Greed"])
    }

    for (let i = 0; i < this.props.dire_picks.length; i++) {
      console.log(this.props.dire_picks[i])
      d_greed += parseInt(hero_data[this.props.dire_picks[i]]["Greed"])
    }

    return (
      <div>
        <div>{bans}</div>
        <div>Radiant Greed: {r_greed}</div>
        <div>Dire Greed: {d_greed}</div>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    // 5 radiant hero picks, 5 dire hero picks, banned heroes
    // select is user selecting a banned, radiant or dire hero
    this.state = {
      radiant_picks: [],
      dire_picks: [],
      bans: [],
      select: "B"
    }
  }

  handleHeroClick(name) {
    console.log(name + ' was clicked')
    let new_bans = this.state.bans
    let new_radiant_picks = this.state.radiant_picks
    let new_dire_picks = this.state.dire_picks

    // if user is in ban mode
    if (this.state.select === "B"){
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
    } else if (this.state.select === "R"){

      if (this.state.bans.includes(name) || this.state.dire_picks.includes(name)){
        alert("Hero already banned or picked by dire")
      } else if (this.state.radiant_picks.includes(name)){
        new_radiant_picks.splice(new_radiant_picks.indexOf(name),1)
      } else if (this.state.radiant_picks.length >= 5){
        alert("Radiant team already has 5 picks")
      } else {
        new_radiant_picks.push(name)
      }
    } else if (this.state.select === "D"){

      if (this.state.bans.includes(name) || this.state.radiant_picks.includes(name)){
        alert("Hero already banned or picked by radiant")
      } else if (this.state.dire_picks.includes(name)){
        new_dire_picks.splice(new_dire_picks.indexOf(name),1)
      } else if (this.state.dire_picks.length >= 5){
        alert("Dire team already has 5 picks")
      } else {
        new_dire_picks.push(name)
      }
    }

    this.setState({
      radiant_picks : new_radiant_picks,
      dire_picks : new_dire_picks,
      bans: new_bans,
      select: this.state.select
    })
  }

  handleSelectModeButtonClick(button) {
    console.log(button + ' was clicked')
    let newSelectState = button[0]
    console.log(newSelectState)

    this.setState({
      radiant_picks: this.state.radiant_picks,
      dire_picks: this.state.dire_picks,
      bans: this.state.bans,
      select: newSelectState
    })
  }

  render() {

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
              onClick = {(name) => this.handleHeroClick(name)}
            />
            <SelectMode
              select = {this.state.select}
              onClick = {(button) => this.handleSelectModeButtonClick(button)}
            />
          </div>
          <div className="game-info">
            <div>Under Construction!</div>
            <GameInfo
              bans = {this.state.bans}
              radiant_picks = {this.state.radiant_picks}
              dire_picks = {this.state.dire_picks}
            />
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
