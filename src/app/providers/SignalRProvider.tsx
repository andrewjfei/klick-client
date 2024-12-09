"use client";

import { User } from "@/app/models";
import { SignalRContext } from "@/app/contexts";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { ReactNode, useEffect, useState } from "react";

interface SignalRProviderProps {
    children: ReactNode;
}

export default function SignalRProvider({
    children
}: SignalRProviderProps): ReactNode {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [roomCode, setRoomCode] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const hubConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:5038/roomHub")
            .withAutomaticReconnect()
            .build();

        setConnection(hubConnection);

        hubConnection.on("JoinedRoom", (connectionId: string, name: string) => {
            const user: User = new User(connectionId, name);
            
            // Add new user to room users array.
            setUsers((users) => [...users, user]);

            console.log(`${name} has joined the room.`);
        });

        hubConnection.on("LeftRoom", (connectionId: string, name: string) => {
            // Remove user from room users array.
            setUsers((users) => users.filter((user) => user.connectionId !== connectionId));

            console.log(`${name} has left the room.`);
        });

        hubConnection
            .start()
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
    }

    async function chooseName(name: string): Promise<void> {
        if (connection && roomCode) {
            await connection.invoke("ChooseName", name);
            setName(name);
        }
    }

    return (
        <SignalRContext.Provider
            value={{ roomCode, name, users, createRoom, joinRoom, chooseName }}
        >
            {children}
        </SignalRContext.Provider>
    );
}
