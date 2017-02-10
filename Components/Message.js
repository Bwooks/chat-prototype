/**
 * Created by Owner on 2/9/2017.
 */
import React from 'react';
export default class Message extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            time:"",
            message:"",
            username:""
        }
    }

    componentWillMount(){
        const now = new Date();
        const hour = now.getHours() % 12 < 10 ? "0" + now.getHours() % 12 : now.getHours() % 12;
        const minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
        const seconds = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

        const time = `${hour}:${minutes}:${seconds}`;
        const username = this.props.username || "Guest";
        this.setState({
            time:time,
            username:username,
            message:this.props.children
        })
    }


    render(){
        return (
            <li>
                <p className="user-display">{this.state.username + " "} <span className="time-stamp">{`At ${this.state.time}`}</span></p>
                <p className="message-display">{this.props.children}</p>
            </li>
        )
    }

};