/**
 * Created by Owner on 2/9/2017.
 */
import React from 'react';
import Message from './Message';

export const List = (props)=>{
    let messageList = props.messages.map((message,index)=>{
        return <Message key={index} id={index} username={message.username}>{message.body}</Message>
    });
    return (<div className="messages"><ul>{messageList}</ul></div>)
};