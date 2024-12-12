"use client";

import { Context, createContext } from "react";
import { Team, User } from "@/app/models";

export interface SignalRContextProps {
    roomCode: string;
    name: string;
    team: Team | null;
    users: User[];
    criteria: string[],
    teams: Team[];
    createRoom: () => Promise<string | void>;
    addCriterion: (value: string) => Promise<void>;
    addTeam: (teamName: string) => Promise<void>;
    startScoring: (teamId: string) => Promise<void>;
    joinRoom: (roomCode: string) => Promise<void>;
    chooseName: (name: string) => Promise<void>;
    giveScore: (core: number) => Promise<void>;
}

export const SignalRContext: Context<SignalRContextProps | null> =
    createContext<SignalRContextProps | null>(null);
