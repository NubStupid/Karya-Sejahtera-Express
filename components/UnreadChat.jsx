"use client"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function UnreadChat({username, setUnread})
{
    const [ socket, setSocket ] = useState()
    const fetchChat = async() => {
        
        let messages;
        messages = await fetch('http://localhost:3000/api/general/chat/?username=' + username)
        messages = await messages.json()
        messages = messages.chats[0].messages
        if(messages.length > 0)
        {
            let unread = 0;
            let ctr = messages.length - 1;
            while(ctr >= 0 && messages[ctr].read == false && messages[ctr].sender == "admin")
            {
                unread++;
                ctr--;
            }
            setUnread(unread)
        }
    }

    useEffect(() => {
        fetchChat();
    }, [])

    useEffect(() => {
        let socket = io();
        
        socket.on('connect', () => {
            console.log(username + ' connected to server');
        });
        
        socket.emit('join_room', (username));

        socket.on('admin_reply', (msg) => {
            fetchChat();
        });
        
        setSocket(socket)
    
        return () => {
          socket.disconnect();
        };
    }, []);
}