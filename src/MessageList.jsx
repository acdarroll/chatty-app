import React from 'react';
import {Message, MessageSystem} from './Message.jsx';

// Messages and Notifications functional component
function MessageList({messages}){
  const newMessages = messages.map(message =>
    message.type === 'incomingMessage' ?
      <Message username={message.username} urls={message.urls} color={message.color} content={message.content} key={message.id}/> :
      <MessageSystem oldUsername={message.oldUsername} newUsername={message.newUsername} key={message.id}/>
  )
  return (
    <main className="messages">
      {newMessages}
    </main>
  )
}

export default MessageList;