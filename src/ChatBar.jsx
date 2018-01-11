import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      username: this.props.currentUser.name
    };
  }
  // Change username or add message depending on the input the event handler is on
  sendValue(type) {
    if(type === 'input') {
      if(this.state.input === '') {
        return;
      }
      this.props.addMessage(this.state.input);
      this.setState({input: ''});
    } else {
      if(this.state.username === '') {
        this.setState({username: 'Anonymous'});
        this.props.addUsername('Anonymous');
      } else {
        this.props.addUsername(this.state.username);
      }
    }
  }
  render() {
    const onChange = type => e => {
      this.setState({[type]: e.target.value});
    };
    const onKeypress = type => e => {
      if(e.key === 'Enter') {
        this.sendValue(type);
      }
    };
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          onChange={onChange('username')}
          onKeyPress={onKeypress('username')}
          value={this.state.username}
          placeholder="Your Name (Optional)" />
        <input
          className="chatbar-message"
          value={this.state.input}
          onKeyPress={onKeypress('input')}
          onChange={onChange('input')}
          placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;