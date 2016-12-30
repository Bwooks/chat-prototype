class ChatApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            messages:[],
            socket:window.io("http://localhost:8000")
        };
    }

    componentDidMount(){
        this.state.socket.on("broadcast",function(message){
            this.addMessage(message);
        }.bind(this));
    }

    addMessage(message){
        let newMessages = this.state.messages.slice();
        newMessages.push(message);
        this.setState({
            messages:newMessages
        });
    }

    render(){
        return (
            <div>
            <h1>React Chat</h1>
            <UserInput socket={this.state.socket}/>
                <List messages = {this.state.messages}/>
            </div>
        )
    }
}

class UserInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            message:""
        }
    }

    update(event){
        this.setState({
            message:event.target.value
        });
    }

    sendMessage(event){
        event.preventDefault();
        let message = this.state.message;
        this.props.socket.emit("new-message",message);
        this.setState({
            message:""
        });
    }

    render(){
        return( <form className="user-input" onSubmit={this.sendMessage.bind(this)}>
                <input type="text"
                       className="text-box"
                       value={this.state.message}
                       onChange={this.update.bind(this)}/>

                <input type="submit"
                       value = "Send"
                       className="submit-button"
                />
            </form>
        )
    }
}



const List = (props) =>{
    let messageList = props.messages.map((message)=>{
        return <Message>{message}</Message>
    });
    return (<ul>{messageList}</ul>)
}

const Message = (props) =>{
    return (
        <li>{props.children}</li>
    )
}


ReactDOM.render(<ChatApp/>,document.getElementById("chat"));