import { Context, createContext } from "react";

export interface SignalRContextProps {
    roomCode: string;
    name: string;
    createRoom: () => Promise<string | void>;
    joinRoom: (roomCode: string) => Promise<void>;
    chooseName: (name: string) => Promise<void>;
}
export const SignalRContext: Context<SignalRContextProps | null> = createContext<SignalRContextProps | null>(null);