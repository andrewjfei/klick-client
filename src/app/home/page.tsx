"use client"

import { FormEvent, useState } from "react";
import { useSignalR } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components";

export default function Home() {
    const router = useRouter();

    const { createRoom, joinRoom } = useSignalR();

    const [roomCode, setRoomCode] = useState<string>("");

    const submitText: string = "Join";

    async function handleJoinRoom(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        await joinRoom(roomCode);
        router.push("/name");
    }

    async function handleCreateRoom(): Promise<void> {
        const roomCode = await createRoom();
        console.log(roomCode);
        router.push("/host");
    }

    return (
        <div className="bg-stone-100 flex flex-col p-6">
            <form onSubmit={handleJoinRoom} className="flex flex-col">
                <input type="text" placeholder="Room Code" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
                <Button 
                    className={"mt-6"} 
                    type={"submit"} 
                    text={submitText}
                />
            </form>
            <Button 
                className={"mt-6"}
                type={"button"} 
                text={"Create"} 
                onClick={handleCreateRoom}
            />
        </div>
    ); 
}
