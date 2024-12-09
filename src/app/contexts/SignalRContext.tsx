"use client";

import { Context, createContext } from "react";
import { Team, User } from "@/app/models";

export interface SignalRContextProps {
    roomCode: string;
    name: string;
    users: User[];
    teams: Team[];
    createRoom: () => Promise<string | void>;
    addTeam: (teamName: string) => Promise<void>;
    joinRoom: (roomCode: string) => Promise<void>;
    chooseName: (name: string) => Promise<void>;
}

export const SignalRContext: Context<SignalRContextProps | null> =
    createContext<SignalRContextProps | null>(null);
