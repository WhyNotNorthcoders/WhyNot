import { SafeAreaView } from "react-navigation"
import ChatList from "./ChatList"
import Header2 from "./Header2"




const ChatScreen =()=>{
    return (
        <SafeAreaView>
           <Header2 title="Chat" />
           <ChatList />
        </SafeAreaView>
    )
}

export default ChatScreen