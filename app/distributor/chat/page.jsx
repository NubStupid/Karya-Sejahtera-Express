"use client"
import Link from "next/link";
import Form from 'next/form'
import BubbleChat from "../../../components/BubbleChat"
import { Avatar, Typography } from "@mui/material";
import { ArrowBackIosNew, Send } from '@mui/icons-material';
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import InputEmoji from "react-input-emoji";
import useAuth from "@/stores/store";
import { useRouter } from "next/navigation";

export default function Chat()
{
    const router = useRouter();
    const auth = useAuth();
    const user = {username: auth.user.username, role: auth.user.role};
    useEffect(() => {
        if(auth.user.role != "distributor")
            router.push('/');
    }, []);
    const [ chat, setChat ] = useState()
    const [ socket, setSocket ] = useState()
    const [ text, setText ] = useState()
    const messagesEndRef = useRef(null);

    const fetchChat = async(role="user") => {
        
        let res;

        await fetch('http://localhost:3000/api/general/chat', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: user.username, role}),
        });

        res = await fetch('http://localhost:3000/api/general/chat/?username=' + user.username)
        res = await res.json()
        setChat(res.chats[0])
    }

    useEffect(() => {
        fetchChat("admin");
    }, [])

    useEffect(() => {
        let socket = io();
        
        socket.on('connect', () => {
            console.log(user.username + ' connected to server');
        });

        socket.emit('register_username', user.username);

        socket.on('admin_reply', (msg) => {
            fetchChat("admin");
        });
        
        socket.on('admin_read', (msg) => {
            fetchChat();
        })

        setSocket(socket)
    
        return () => {
          socket.disconnect();
        };
      }, []);

    const addChat = async () => {
        socket.emit('user_message', text);
        await fetch('http://localhost:3000/api/general/chat', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: user.username, role: user.role, message: text}),
        });
        fetchChat("admin")
        setText("")
    }
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);

    // console.log(user);
    
    
    return (
        <>
            {/* <div className="overflow-auto"> */}
            <div className="fixed top-0 bg-blue-primary w-[100vw] p-5 z-40">
                <div className="texl-xl flex">
                    <Link href="/distributor">
                        <ArrowBackIosNew className="h-full me-4" />
                    </Link>
                    <Avatar alt="Guest" src="" sx={{ width: 50, height: 50 }} />
                    <Typography component="div" variant="h6" className="h-full ms-4 pt-2">Admin</Typography>
                </div>
            </div>
            <div className="mt-10 p-14 py-20 overflow-y-auto">
                {/* {chat && console.log(chat.messages)} */}
                {chat && chat.messages.map((c, idx) => <BubbleChat key={idx} sender={c.sender} message={c.message} read={c.read} time={c.timestamp} />)}
                <div ref={messagesEndRef} />
            </div>
            <Form action={addChat} className="fixed bottom-0 right-0 p-3 bg-blue-secondary w-full px-14 flex">
                {/* <input type="text" name="message" placeholder="Type a message" className="p-2 px-5 rounded-full w-full me-3" /> */}
                <InputEmoji placeholder="Type a message" className="rounded-full w-full me-3" value={text} onChange={setText} cleanOnEnter onEnter={addChat} />
                <button className="bg-orange-primary rounded-full ps-2 pe-1 h-10 my-auto"><Send sx={{ width: 28, height: 25 }} /></button>
            </Form>
            {/* </div> */}
            
        </>
    )
}