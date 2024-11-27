"use client"
import Form from 'next/form'
import BubbleChat from "../../components/BubbleChat"
import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
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

    const [ status, setStatus ] = useState("connected");
    
    const [ action, setAction ] = useState(null);
    const [ authenticate, setAuthenticate ] = useState(false);
    const [ user, setUser ] = useState({username: null, role: null, profpic: null});
    
    useEffect(() => {
        if(!auth.user)
            router.push('/login');
        else if(auth.user.role == "admin")
            router.push('/admin/chat');
        else
        {
            setAuthenticate(true);
            setUser({...auth.user})
        }
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
    }, [user])

    useEffect(() => {        
        let socket = io();
        
        // if(status == "connected")
        // {
            socket.on('connect', () => {
                console.log(user.username + ' connected to server');
            });
        // }

        socket.emit('register_username', user.username);

        socket.on('admin_reply', (msg) => {
            fetchChat("admin");
        });
        
        socket.on('admin_read', (msg) => {
            fetchChat();
        })

        setSocket(socket)
        // if(status == "disconnected")
        // {
        //     socket.disconnect();
        //     // console.log(u/ser.username + " disconnected");
        // }
    
        return () => {
            socket.disconnect();
        };
      }, [user, status]);

    const addChat = async () => {
        let delivered = true;
        if(socket.disconnected)
        {
            console.log("chat tidak terkirim");
            delivered = false;
        }
        else
            socket.emit('user_message', text);
        // console.log(action);
        
        if(action)
        {
            await fetch('http://localhost:3000/api/general/chat', {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: user.username, id: action.id})
            });
        }
        if(action && action.act == "retry")
        {
            await fetch('http://localhost:3000/api/general/chat', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: user.username, role: user.role, message: action.message, delivered})
            });

        }
        else if(!action)
        {
            await fetch('http://localhost:3000/api/general/chat', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: user.username, role: user.role, message: text, delivered})
            });
        }
        
        fetchChat("admin")
        setText("")
    }

    useEffect(() => {
        addChat();
        setAction(null);
    }, [action])
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);

    if(user && !chat)
        fetchChat("admin")

    // const changeStatus = () => {
    //     if(status == "connected")
    //         setStatus("disconnected")
    //     else
    //         setStatus("connected")
    // }
    
    return (
        <>
            {authenticate == true &&
                <div>
                    <div className="fixed top-0 bg-blue-primary w-[100vw] p-5 z-40">
                        <div className="texl-xl flex">
                            <div className="my-auto" onClick={() => router.back()}>
                                <ArrowBackIosNew className="h-full me-4" />
                            </div>
                            <Avatar alt="Guest" sx={{ width: 50, height: 50 }} className="me-4" />
                            <Typography component="div" variant="h6" className="h-full pt-2">Admin</Typography>
                        </div>
                    </div>
                    <div className="mt-10 p-14 py-20 overflow-y-auto">
                    {/* <button className='bg-blue-secondary' onClick={changeStatus}>{status}</button> */}
                        {chat && chat.messages.map((c, idx) => {
                            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
                            let date1 = "";
                            let date2 = new Date(c.timestamp);
                            let changeDate = false;
                            let profpic = c.sender == "admin" ? null : user.profpic;

                            if(idx > 0)
                            {
                                date1 = new Date(chat.messages[idx-1].timestamp)

                                if(date1.getFullYear() < date2.getFullYear())
                                    changeDate = true;
                                else if(date1.getMonth() < date2.getMonth())
                                    changeDate = true;
                                else if(date1.getDate() < date2.getDate())
                                    changeDate = true;
                            }
                            return (
                                <>
                                    {idx == 0 &&
                                        <p className="bg-gray-200 w-fit mx-auto p-1 px-3 rounded-full text-sm">{date2.getDate()} {months[date2.getMonth()]} {date2.getFullYear()}</p> 
                                    }
                                    {c.delivered == true && changeDate == true &&
                                        <p className="bg-gray-200 w-fit mx-auto p-1 px-3 rounded-full text-sm">{date2.getDate()} {months[date2.getMonth()]} {date2.getFullYear()}</p> 
                                    }
                                    
                                    <BubbleChat key={idx} profpic={profpic} id={c._id} sender={c.sender} message={c.message} read={c.read} time={c.timestamp} delivered={c.delivered} setAction={setAction} />
                                </>
                            )
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                    <Form action={addChat} className="fixed bottom-0 right-0 p-3 bg-blue-secondary w-full px-14 flex">
                        <InputEmoji placeholder="Type a message" className="rounded-full w-full me-3" value={text} onChange={setText} cleanOnEnter onEnter={addChat} />
                        <button className="bg-orange-primary rounded-full ps-2 pe-1 h-10 my-auto"><Send sx={{ width: 28, height: 25 }} /></button>
                    </Form>
                </div>
            }
            {authenticate == false &&
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                    <CircularProgress />
                </Box>
            }
        </>
    )
}