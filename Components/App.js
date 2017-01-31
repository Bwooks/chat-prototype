
class App extends React.Component{
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
            <div className="chat-app">
            <h1>React Chat</h1>
                <List messages = {this.state.messages}/>
            <UserInput socket={this.state.socket}/>
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
        if(event.target.value === "") return;
        let message = this.state.message;
        this.props.socket.emit("new-message",message);
        this.setState({
            message:""
        });
    }

    render(){
        return( <form className="message-form" onSubmit={this.sendMessage.bind(this)}>
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

const Message = (props) =>{
    if(props.id % 2 === 0){
        return (<li style={{backgroundColor:"#CAEADB"}}>{props.children}</li>)
    }else{
        return (<li style={{backgroundColor:"#E3E3E5"}}>{props.children}</li>)
    }

}

const List = (props) =>{
    let messageList = props.messages.map((message,index)=>{
        return <Message key={index} id={index}>{message}</Message>
    });
    return (<div className="messages"><ul>{messageList}</ul></div>)
}



ReactDOM.render(<App/>,document.getElementById("chat"));