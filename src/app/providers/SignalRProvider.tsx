"use client";

import { Team, User } from "@/app/models";
import { SignalRContext } from "@/app/contexts";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { ReactNode, useEffect, useState } from "react";
import { Scoring } from "@/app/enums";

interface SignalRProviderProps {
    children: ReactNode;
}

export default function SignalRProvider({
    children
}: SignalRProviderProps): ReactNode {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [roomCode, setRoomCode] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [team, setTeam] = useState<Team | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [criteria, setCriteria] = useState<string[]>([]);
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

        hubConnection.on("StartScoring", (criteria: string[], teamId: string, teamName: string) => {
            console.log(criteria);
            setCriteria(criteria);

            const team: Team = new Team(teamId, teamName);

            // Set reference team for users to score for.
            setTeam(team);

            console.log(`Begin scoring for team ${teamName}.`);
        });

        hubConnection.on("UpdateScore", (connectionId: string, teamId: string, teamScore: number) => {
            let isScoringComplete: boolean;

            // Update socring state of user to complete (i.e. submitted vote for this round).
            setUsers((users) => {
                const updatedUsers: User[] = users.map((user: User) => {
                    if (user.connectionId === connectionId) {
                        user.state = Scoring.Completed;
                    }
    
                    return user;
                });

                isScoringComplete = updatedUsers.every((user: User) => user.state === Scoring.Completed);

                return updatedUsers;
            });

            // Update team score.
            setTeams((teams) => teams.map((team: Team) => {
                if (team.id === teamId) {
                    team.score = teamScore;

                    if (isScoringComplete) team.state = Scoring.Completed;
                }

                return team;
            }));

            console.log(`Updated team ${teamId} to ${teamScore}.`);
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

    async function addCriterion(value: string): Promise<void> {
        if (connection) {
            const criterion: string | null = await connection.invoke("AddCriterion", value);

            if (criterion !== null) {
                setCriteria((criteria) => [...criteria, criterion]);
            }
        }
    }

    async function addTeam(teamName: string): Promise<void> {
        if (connection) {
            const teamId: string | null = await connection.invoke("AddTeam", teamName);

            if (teamId !== null) {
                const team: Team = new Team(teamId, teamName);
                setTeams((teams) => [...teams, team]);
            }
        }
    }

    async function startScoring(teamId: string): Promise<void> {
        if (connection) {
            await connection.invoke("StartScoring", teamId);

            // Set scoring state of selected team to in progress.
            setTeams((teams) => teams.map((team: Team) => {
                if (team.id === teamId) {
                    team.state = Scoring.InProgress;
                }

                return team;
            }));

            // Set scoring state for all users to in progress (i.e. has not submitted a score).
            setUsers((users) => users.map((user: User) => {
                user.state = Scoring.InProgress;
                return user;
            }));
        }
    }

    async function joinRoom(roomCode: string): Promise<boolean> {
        if (connection) {
            const joinedRoom: boolean = await connection.invoke("JoinRoom", roomCode);
            setRoomCode(roomCode);
            return joinedRoom;
        }
        
        return false;
    }

    async function chooseName(name: string): Promise<void> {
        if (connection && roomCode) {
            await connection.invoke("ChooseName", name);
            setName(name);
        }
    }

    async function giveScore(score: number): Promise<void> {
        if (connection && roomCode && team) {
            await connection.invoke("GiveScore", team.id, score);
            setTeam(null);
        }
    }

    return (
        <SignalRContext.Provider
            value={{
                roomCode,
                name,
                team,
                users,
                criteria,
                teams,
                createRoom,
                addCriterion,
                addTeam,
                startScoring,
                joinRoom,
                chooseName,
                giveScore
            }}
        >
            {children}
        </SignalRContext.Provider>
    );
}
