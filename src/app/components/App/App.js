import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Login from '../Login/Login';
import RightPanel from '../RightPanel/RightPanel';

class App extends Component {

  componentDidMount() {
    let nameExists = localStorage.getItem('name');
    if (nameExists) {
      this.props.saveUser(nameExists);
    }
    this.props.fetchRooms();
    this.props.selectCurrentRoom(0);
    setInterval(() => {
      this.props.fetchMessages(this.props.currentRoom.id);
    }, 3000);
  }

  render() {
    return (
        <div className="app-container">
        {!this.props.name ? 
          <Login /> :
          <div className="app-container">
            <RightPanel 
              currentRoom={this.props.currentRoom}
              messages={this.props.messages}
              name={this.props.name}
              sendMessage={this.props.sendMessage}
              name={this.props.name}
              changeReaction={this.props.changeReaction} />
          </div>
        }
        </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    rooms: state.rooms,
    currentRoom: state.currentRoom,
    messages: state.messages,
    name: state.name,
    timeOnline: state.timeOnline
  }
}

export default connect(mapStateToProps, actions)(App);