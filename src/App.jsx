import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        {this.props.users && <p className="navbar-users">{this.props.users} users online</p>}
      </nav>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      users: null,
      color: null
    }
    this.addMessage = this.addMessage.bind(this);
    this.addUsername = this.addUsername.bind(this);
  }
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')

    this.socket.onmessage = event => {
      let data = JSON.parse(event.data)
      let messages = [];

      switch (data.type) {
        case 'incomingMessage':
          messages = this.state.messages.concat(data);
          this.setState({messages})
          break;
        case 'incomingNotification':
          messages = this.state.messages.concat(data);
          this.setState({messages})
          break;
        case 'incomingUsers':
          this.setState({users: data.users});
          break;
        case 'incomingColor':
          this.setState({color: data.color});
          break;
        default:
          throw new Error('Unknown event type: ' + data.type);
      }
    }
  }
  addUsername(name) {
    if(name === this.state.currentUser.name) {
      return;
    }
    let user = {type: 'postNotification', oldUsername: this.state.currentUser.name, newUsername: name}
    this.setState({currentUser: {name}})
    this.socket.send(JSON.stringify(user))
  }
  addMessage(content) {
    let newMessage = {type: 'postMessage', username: this.state.currentUser.name, content, color: this.state.color}
    this.socket.send(JSON.stringify(newMessage))
  }
  render() {
    return (
      <div>
        <NavBar users={this.state.users}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar
          addMessage={this.addMessage}
          addUsername={this.addUsername}
          currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
