import React from "react";
import {List} from "./List";
import UserInput from "./UserInput";

export default class App extends React.Component{
    constructor(props){
        super(props);
        const PORT = process.env.PORT || 8080;
        console.log(PORT)
        const server = `${window.location.protocol}//${window.location.hostname}:${PORT}`;
        this.state = {
            messages:[],
            users:[],
            socket:window.io()
        };
    }

    componentDidMount(){
        this.state.socket.on("broadcast",function(message){
            this.addMessage(message);
            this.addUser(message.username)
        }.bind(this));
    }

    componentDidUpdate(){
        window.scrollTo(0, document.body.scrollHeight);
    }

    addMessage(message){
        let newMessages = this.state.messages.slice();
        newMessages.push(message);
        this.setState({
            messages:newMessages
        });
    }

    addUser(user){
        if(user){
            let newUsers = this.state.users.slice();
            if(newUsers.indexOf(user) >= 0 ) return;
            newUsers.push(user);
            this.setState({
                users:newUsers
            });
        }
    }

    render(){
        return (
            <div className="chat-app">
                <div className="chat-banner"><h1>Welcome to React Chat App</h1></div>
                <List messages = {this.state.messages}/>
                <UserInput socket={this.state.socket}/>
            </div>
        )
    }
}