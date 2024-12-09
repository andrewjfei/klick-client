"use client";

import { SignalRContext } from "@/app/contexts";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { ReactNode, useEffect, useState } from "react";

interface SignalRProviderProps {
    children: ReactNode;
}

export default function SignalRProvider({ children } : SignalRProviderProps): ReactNode {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [roomCode, setRoomCode] = useState<string>("");
    const [name, setName] = useState<string>("");
    
    useEffect(() => {
        const hubConnection = new HubConnectionBuilder()
           .withUrl("http://localhost:5038/roomHub")
           .withAutomaticReconnect()
           .build();

        setConnection(hubConnection);

        hubConnection.on("RecieveMessage", (message: string) => {
            console.log("Recieved message: ", message);
        });

        hubConnection.start()
           .then(() => {
                console.log("Connected to server.");
            })
           .catch((err) => {
                console.error("Error connecting to server: ", err);
            });
        
        return () => {
            hubConnection.stop();
        };
    }, []);

    async function createRoom(): Promise<string | void> {
        if (connection) {
            const roomCode = await connection.invoke("CreateRoom");
            setRoomCode(roomCode);
            return roomCode;
        }
    }

    async function joinRoom(roomCode: string): Promise<void> {
        if (connection) {
            await connection.invoke("JoinRoom", roomCode);
            setRoomCode(roomCode); 
        }
    };

    async function chooseName(name: string): Promise<void> {
        if (connection && roomCode) {
            await connection.invoke("ChooseName", name);
            setName(name);
        }
    };

    return (
        <SignalRContext.Provider value={{ roomCode, name, createRoom, joinRoom, chooseName }}>
            { children }
        </SignalRContext.Provider>
    );
}