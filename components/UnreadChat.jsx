"use client"
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function UnreadChat({username, setUnread})
{
    const fetchChat = async() => {
        if(username != "admin")
        {
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
        else
        {
            let chats = await fetch('http://localhost:3000/api/general/chats')
            chats = await chats.json()
            chats = chats.chats.map((c) => c.chats)
            chats.forEach((c) => {
                let ctr = c.messages.length - 1;
                while(ctr >= 0 && c.messages[ctr].read == false && c.messages[ctr].sender == "user")
                {
                    setUnread((u) => u+1);
                    ctr--;
                }
            })
        }
    }

    useEffect(() => {
        let socket = io();
        if(username != "admin")
        {
            socket.on('connect', async () => {
                console.log(username + ' connected to server');
                fetchChat()
            });
            
            socket.emit('join_room', (username));
    
            socket.on('admin_reply', (msg) => {
                fetchChat();
            });
        }
        else
        {
            socket = io('/admin');
        
            socket.on('connect', async () => {
                console.log('Admin connected to server');
                fetchChat()
            });

            socket.on('new_user_message', () => {
                setUnread((u) => u+1);
            });
        }
    
        return () => {
          socket.disconnect();
        };
    }, []);
}