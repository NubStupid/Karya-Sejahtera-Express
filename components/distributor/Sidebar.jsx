"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Sidebar()
{
    const path = usePathname();



    const [ unread, setUnread ] = useState(0)
    const [ user, setUser ] = useState({username: "john_doe", role: "distributor"})
    const [ socket, setSocket ] = useState()
    const fetchChat = async() => {
        
        let messages;
        // if(id)
        // {

        // await fetch('http://localhost:3000/api/general/chat', {
        //     method: 'PUT',
        //     headers: {
        //     'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({username: user.username, role}),
        // });

        messages = await fetch('http://localhost:3000/api/general/chat/?username=' + user.username)
        messages = await messages.json()
        messages = messages.chats[0].messages
        // console.log(messages);

        // setChat(messages.chats[0])

        if(messages.length > 0)
        {
            let unread = 0;
            let ctr = messages.length - 1;
            while(ctr >= 0 && messages[ctr].read == false && messages[ctr].sender == "admin")
            {
                unread++;
                ctr--;
            }
            // console.log("unread: " + unread);
            setUnread(unread)
            // dt.push({...u, messages: messages[u.username], unread})
        }
    }

    useEffect(() => {
        fetchChat();
    }, [])

    useEffect(() => {
        let socket = io();
        
        socket.on('connect', () => {
            console.log(user.username + ' connected to server');
        });
        
        socket.emit('join_room', (user.username));
        // socket.on(unread_msg_username)


        socket.on('admin_reply', (msg) => {
            // console.log('pesan dari admin');
            
            fetchChat();
        });
        
        // socket.on('admin_read', (msg) => {
        //     fetchChat();
        // })

        setSocket(socket)
    
        return () => {
          socket.disconnect();
        };
      }, []);

    return (
        <>
            <div className="bg-sky-300 w-60 p-4 text-white text-xl font-semibold">
                <h3><Link href="/distributor" className={path == "/distributor" ? "text-black" : ""}>Dashboard</Link></h3>
                <h3><Link href="/distributor/products" className={path == "/distributor/products" ? "text-black" : ""}>Products</Link></h3>
                <h3><Link href="/distributor/transaction" className={path.includes("/distributor/transaction") == true ? "text-black" : ""}>Transaction</Link></h3>
                {/* <h3><Link href="/distributor/request" className={path.includes("/distributor/request") == true  ? "text-black":""}>Request</Link></h3> */}
                <h3>
                    <Link href="/distributor/chat" className={path == "/distributor/chat" ? "text-black" : ""}>
                        <div className="flex">
                            <p>Chat</p>
                            {unread > 0 && 
                                <p className="bg-orange-primary text-white rounded-full h-5 w-5 text-center text-sm ms-auto my-auto">{unread}</p>
                            }
                        </div>
                    </Link>
                </h3>
            </div>
        </>
    )
}

