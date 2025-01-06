"use client"
import Form from 'next/form'
import Image from 'next/image'
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
    useEffect(() => {
        if(!auth.user || auth.user.role != "admin")
            router.push('/');
    }, []);
    
    const [ status, setStatus ] = useState("connected");
    
    const [ action, setAction ] = useState(null);
    const [ routes, setRoutes ] = useState("chat")
    const [ data, setData ] = useState()
    const [ chat, setChat ] = useState()
    const [ user, setUser ] = useState({username: "", role: ""})
    const [ text, setText ] = useState()
    const [ search, setSearch ] = useState()
    const [ loading, setLoading ] = useState(true)
    const [ socket, setSocket ] = useState()
    const messagesEndRef = useRef(null);

    const fetchData = async () => {
        let chats = await fetch('https://karyasejahteraexpress.my.id/api/general/chats')
        chats = await chats.json()
        chats = chats.chats
        let dt = []
        
        
        if(routes == "chat")
        {
            chats.forEach((c) => {
                let unread = 0;
                let ctr = c.chats.messages.length - 1;
                while(ctr >= 0 && c.chats.messages[ctr].read == false && c.chats.messages[ctr].sender == "user")
                {
                    unread++;
                    ctr--;
                }
                
                dt.push({...c, messages: c.chats.messages, unread})
            })
        }
        else if(routes == "contact")
        {
            dt = await fetch('https://karyasejahteraexpress.my.id/api/general/users')
            dt = await dt.json()
            dt = dt.users
        }

        if(search)
        {
            dt = dt.filter((d) => 
                {
                    let temp = `${d.role.substring(0, 4)} - ${d.username}`                    
                    return temp.includes(search)
                })
        }
        
        setData(dt)
    }

    useEffect(() => {
        fetchData();
    }, [routes])
    useEffect(() => {
        fetchData();
    }, [search])

    const fetchChat = async(username, role="user") => {        
        if(user.username != username)
            return
        let res;
        await fetch('https://karyasejahteraexpress.my.id/api/general/chat', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, role}),
        });

        if(user.username)
        {
            res = await fetch('https://karyasejahteraexpress.my.id/api/general/chat/?username=' + user.username)
            res = await res.json()
            setChat(res.chats)
        }
    }

    useEffect(() => {
        if(loading == true || chat)
            setLoading(false)
        else
            setLoading(true)
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat])

    useEffect(() => {
        fetchChat(user.username);
        fetchData();
    }, [user])

    useEffect(() => {
        let socket = io('/admin');
        
        // if(status == "connected")
        // {
            socket.on('connect', () => {
              console.log('Admin connected to server');
            });
        // }

        socket.on('new_user_connected', ({username}) => {
            fetchChat(username, "admin");
        })

        socket.emit('admin_connect', {username: user.username});

        socket.on('new_user_message', ({ username, message }) => {
            fetchChat(username);
            fetchData();
        });

        setSocket(socket)
        // if(status == "disconnected")
            // socket.disconnect();
    
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
            socket.emit('admin_message', { username: user.username, message: text });
        // console.log(action);
        
        if(action)
        {
            await fetch('https://karyasejahteraexpress.my.id/api/general/chat', {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: user.username, id: action.id})
            });
        }
        if(action && action.act == "retry")
        {
            await fetch('https://karyasejahteraexpress.my.id/api/general/chat', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: user.username, role: "admin", message: action.message, delivered})
            });

        }
        else if(!action)
        {
            await fetch('https://karyasejahteraexpress.my.id/api/general/chat', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: user.username, role: "admin", message: text, delivered})
            });
        }
        fetchData()
        fetchChat(user.username)
        setText("")
    }

    useEffect(() => {
        addChat();
        setAction(null);
    }, [action])

    // const changeStatus = () => {
    //     if(status == "connected")
    //         setStatus("disconnected")
    //     else
    //         setStatus("connected")
    // }

    // console.log("data");
    // console.log(data);
    

    return (
        <>
            <div className="relative">
                <div className="w-80 border-r-2 fixed">
                    <div className="flex p-2 px-4">
                        <div className="my-auto" onClick={() => router.back()}>
                            <ArrowBackIosNew className="h-full me-4" />
                        </div>
                        <Image
                            src="/logo/KSXpress.png"
                            width={120}
                            height={120}
                            alt="Picture of the author"
                        />
                    </div>
                    <div className="flex text-center">
                        <div className={`w-full pb-2 ${routes == "chat" && "border-b-2 border-black"}`} onClick={() => {
                            setData()
                            setRoutes("chat")
                        }}>Chat</div>
                        <div className={`w-full pb-2 ${routes == "contact" && "border-b-2 border-black"}`} onClick={() => {
                            setData()
                            setRoutes("contact")
                        }}>Contact</div>
                    </div>
                    <div className="p-3">
                        <input type="text" placeholder="Search" className="bg-orange-secondary w-full p-2 px-4 rounded-md" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="h-screen">
                        {routes == "chat" && data &&
                            data.map((d) => {
                                let date = new Date(d.messages[d.messages.length-1].timestamp)
                                let role = "Cust"
                                if(d.role == "distributor")
                                    role = "Dist"
                                return (
                                    <>
                                        <div key={d.username} className="border-t border-gray-300 p-4 flex" onClick={() => setUser({username: d.username, role, profpic: d.profile.profpic})}>
                                            <Image
                                                src={d.profile.profpic}
                                                width={50}
                                                height={50}
                                                alt="Picture of the author"
                                                className="rounded-full me-3"
                                            />
                                            <div>
                                                <p className="my-auto">{`${role} - ${d.username}`}</p>
                                                <p className="truncate">{d.messages[d.messages.length-1].message}</p>
                                            </div>
                                            <div className="text-right ms-auto">
                                                <p className="text-gray-500 text-xs mb-3">{`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`}</p>
                                                {d.unread > 0 && 
                                                    <p className="bg-orange-primary text-white rounded-full text-center text-sm ms-auto" style={{height: 23, width: 23}}>{d.unread}</p>
                                                }
                                            </div>
                                        </div>
                                    </>
                                )
                            }) 
                        }
                        {routes == "contact" && data && 
                            data.map((d) => {
                                let role = "Cust"
                                if(d.role == "distributor")
                                    role = "Dist"
                                return (
                                    <>
                                        <div key={d.username} className="border-t border-gray-300 p-4 flex" onClick={() => setUser({username: d.username, role, profpic: d.profile.profpic})}>
                                            <Image
                                                src={d.profile.profpic}
                                                width={50}
                                                height={50}
                                                alt="Picture of the author"
                                                className="rounded-full me-3"
                                            />
                                            <p className="my-auto">{`${role} - ${d.username}`}</p>
                                        </div>
                                    </>
                                )
                            }) 
                        }
                    </div>
                </div>
                {!chat && loading == false && 
                    <div className="absolute left-80 right-0 text-center text-5xl text-gray-400 my-auto h-screen">
                        <p className="mt-80">Start a new chat!</p>
                    </div>
                }
                {!chat && loading == true && 
                    <div className="absolute left-80 right-0 text-center text-5xl text-gray-400 my-auto h-screen">
                        <p className="mt-80">Loading...</p>
                    </div>
                }
                {loading == false && chat && 
                    <div className="absolute left-80 right-0 overflow-y-auto">
                        <div className="fixed top-0 w-full bg-blue-primary px-7 py-3 z-40 drop-shadow-lg">
                            <div className="texl-xl flex justify-center">
                                <Avatar alt="Guest" src="" sx={{ width: 50, height: 50 }} className="me-4" />
                                <Typography component="div" variant="h6" className="h-full pt-2 w-full">{user.role} - {user.username}</Typography>
                            </div>
                        </div>
                        <div className="mt-10 p-14 py-20 overflow-auto">
                            {/* <button className='bg-blue-secondary' onClick={changeStatus}>{status}</button> */}
                            {chat && chat.messages.map((c, idx) => {
                                    let profpic = c.sender == "admin" ? null : user.profpic;
                                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
                                    let date1 = "";
                                    let date2 = new Date(c.timestamp);
                                    let changeDate = false;

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
                                            {changeDate == true &&
                                                <p className="bg-gray-200 w-fit mx-auto p-1 px-3 rounded-full text-sm">{date2.getDate()} {months[date2.getMonth()]} {date2.getFullYear()}</p> 
                                            }
                                            <BubbleChat key={idx} profpic={profpic} id={c._id} sender={c.sender == "admin" ? "user" : "admin"} message={c.message} read={c.read} time={c.timestamp} delivered={c.delivered} setAction={setAction} />
                                        </>
                                    )
                                })}
                            <div ref={messagesEndRef} />
                        </div>
                        <Form action={addChat} className="fixed bottom-0 left-80 right-0 p-3 bg-blue-secondary px-14 flex">
                            <InputEmoji placeholder="Type a message" className="rounded-full w-full me-3" value={text} onChange={setText} cleanOnEnter onEnter={addChat} />
                            <button className="bg-orange-primary rounded-full ps-2 pe-1 h-10 my-auto"><Send sx={{ width: 28, height: 25 }} /></button>
                        </Form>
                    </div>
                }
            </div>
        </>
    )
}