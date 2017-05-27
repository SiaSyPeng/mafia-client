import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { killPlayer } from '../actions';

class MafiaSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onSelect = this.onSelect.bind(this);
  }

  onKillClick(event) {
    this.props.killPlayer(event.target.key);
  }

  renderSelection() {
    if (!localStorage.getItem('role')) { // this just checks if data has been fetched and mapped to props yet
      return '';
    } else if (localStorage.getItem('role') === 'mafia') {
      return (
       this.props.game.players.map((player) => {
         return (
           <div className="players_container">
             <div className="playerName">{player.name}</div>
             <button key={player._id} onClick={this.onKillClick}> {player.name} </button>
           </div>
         );
       })
      );
    } else {
      return <div className="wait">Waiting for da Mafia to kill someone...</div>;
    }
  }

  render() {
    return (
      <div className="RolesContainer">
        <h2>You Are</h2>
        {this.renderSelection()}
      </div>
    );
  }
}


const mapStateToProps = state => (
  {
    players: state.game.players,
    game: state.game,
  }
);

export default withRouter(connect(mapStateToProps, { killPlayer })(MafiaSelection));
