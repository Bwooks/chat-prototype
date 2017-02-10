/**
 * Created by Owner on 2/9/2017.
 */
import React from 'react';
export default class UserInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            message:"",
            username:undefined,
            prompt:"show"
        }
    }

    update(event){
        this.setState({
            message:event.target.value
        });
    }

    sendMessage(event){
        event.preventDefault();
        if(this.refs.message.value === "" && this.refs.username.value === "") return;
        const username = this.refs.username.value;
        if(this.refs.message.value === ""){
            this.setState({
                username:username,
                prompt:"hide"
            });
            return;
        }
        const message = {
            body:this.state.message,
            username:username || this.state.username
        };
        this.props.socket.emit("new-message",message);
        if(this.state.username || message.username) {
            this.setState({
                message: "",
                prompt: "hide"
            })
        }else if(!this.state.username){
            this.setState({
                message:"",
                username:message.username
            });
        }
    }

    render(){
        return(
            <form className="chat-form" onSubmit={this.sendMessage.bind(this)}>
                <div className="form-wrapper">
                    <div className={"username-form-container " + this.state.prompt}>
                        <div className="username-form">
                            <input ref="username" type="text" className="username"
                                   placeholder="Please enter a username"/>
                            <input type="submit"
                                   value = "Submit"
                                   className={"submit-button username-submit " + this.state.prompt}
                            />
                        </div>
                    </div>
                    <div className="message-form-container">
                        <div className="message-form">
                            <input type="text"
                                   className="message"
                                   value={this.state.message}
                                   onChange={this.update.bind(this)}
                                   ref="message"
                                   placeholder={this.state.username ? `Say something, ${this.state.username}` : ""}
                            />

                            <input type="submit"
                                   value = "Send"
                                   className="submit-button message-submit"
                            />
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
