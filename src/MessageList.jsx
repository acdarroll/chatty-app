import React, {Component} from "react";
import Message from "./Message.jsx"

const random = function () {
  let letters = "abcdefghijklmnopqrstuvwxyz"
  let allLetters = letters.concat(letters.toUppercase());
  let id = "";
  while(id.length < 6) {
    id += allLetters[Math.random * allLetters.length]
  }
  return id;
}

class MessageSystem extends Component {
  render() {
    return (
      <div className="message system">
        {this.props.oldUsername} changed their name to {this.props.newUsername}.
      </div>
    );
  }
}

class MessageList extends Component {
  render () {
    console.log(this.props.messages)
    const messages = this.props.messages.map(message => {
      let formattedMessage = message.type === "incomingMessage" ?
        <Message username={message.username} content={message.content} key={message.id}/> :
        <MessageSystem oldUsername={message.oldUsername} newUsername={message.newUsername} key={message.id}/>
      return formattedMessage;
    })
    return (
      <main className="messages">
        {messages}
      </main>
    )
  }
}

export default MessageList;