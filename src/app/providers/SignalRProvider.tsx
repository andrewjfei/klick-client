"use client";

import { Team, User } from "@/app/models";
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
    const [teams, setTeams] = useState<Team[]>([]);

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
            setUsers((users) =>
                users.filter((user) => user.connectionId !== connectionId)
            );

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

    async function addTeam(teamName: string): Promise<void> {
        if (connection) {
            const teamId: string | null = await connection.invoke("AddTeam");

            if (teamId !== null) {
                const team: Team = new Team(teamId, teamName);
                setTeams((teams) => [...teams, team]);
            }
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
            value={{
                roomCode,
                name,
                users,
                teams,
                createRoom,
                addTeam,
                joinRoom,
                chooseName
            }}
        >
            {children}
        </SignalRContext.Provider>
    );
}
