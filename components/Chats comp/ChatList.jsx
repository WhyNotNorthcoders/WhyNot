import { collection, onSnapshot } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { Text } from "react-native"
import tw from "tailwind-rn"

const ChatList = () =>{
    const[matches, setMatches] = useState([])

useEffect(()=>{
    onSnapshot(collection(db, 'users'))
},[])


return (
<View >
    <Text>Chat List</Text>
</View>

)
}

export default ChatList