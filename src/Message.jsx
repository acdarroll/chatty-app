import React, {Component} from "react";

class Message extends Component {
  render() {
    console.log("Urls:", this.props.urls)
    return (
      <div className="message">
        <span className="message-username" style={{color: this.props.color}}>{this.props.username}</span>
        <div className="message-format">
          {this.props.content && <span className="message-content">{this.props.content}</span>}
          {this.props.urls && this.props.urls.map((url, i) => <img key={i} className="message-image" src={url}/>)}
        </div>
      </div>
    );
  }
}

export default Message;