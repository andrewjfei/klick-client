"use client";

import { Context, createContext } from "react";
import { User } from "@/app/models";

export interface SignalRContextProps {
    roomCode: string;
    name: string;
    users: User[];
    createRoom: () => Promise<string | void>;
    joinRoom: (roomCode: string) => Promise<void>;
    chooseName: (name: string) => Promise<void>;
}

export const SignalRContext: Context<SignalRContextProps | null> =
    createContext<SignalRContextProps | null>(null);
