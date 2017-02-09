
class App extends React.Component{
    constructor(props){
        super(props);
        const server = `${window.location.protocol}//${window.location.hostname}:8000`;
        this.state = {
            messages:[],
            users:[],
            socket:window.io(server)
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
            console.log(newUsers);

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

class UserInput extends React.Component{
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

class Message extends React.Component{
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

const List = (props)=>{
        let messageList = props.messages.map((message,index)=>{
            return <Message key={index} id={index} username={message.username}>{message.body}</Message>
        });
        return (<div className="messages"><ul>{messageList}</ul></div>)
};



ReactDOM.render(<App/>,document.getElementById("chat"));