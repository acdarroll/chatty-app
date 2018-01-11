import React from 'react';

// Messages functional component
function Message({color, username, content, urls}){
  return (
    <div className="message">
      <span className="message-username" style={{color: color}}>{username}</span>
      <div className="message-format">
        {content && <span className="message-content">{content}</span>}
        {urls && urls.map((url, i) => <img key={i} className="message-image" src={url}/>)}
      </div>
    </div>
  );
}

// Notifications functional component
function MessageSystem({oldUsername, newUsername}){
  return (
    <div className="message system">
      {oldUsername} changed their name to {newUsername}.
    </div>
  );
}

export {Message, MessageSystem};