"use client"

import { FormEvent, useState } from "react";
import { useSignalR } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { Button, TextInput } from "@/app/components";
import { righteous } from "@/app/fonts";

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
        router.push("/host/config");
    }

    return (
        <div className="flex-grow flex flex-col justify-center items-center">
            <div className="w-96 flex-grow flex flex-col justify-evenly">
                <div className="flex flex-row justify-center">
                    <p className={`${righteous.className} text-7xl select-none`}>klick</p>
                </div>
                <div className="flex flex-col">
                    <form onSubmit={handleJoinRoom} className=" flex flex-col">
                        <TextInput type="text" uppercase={true} placeholder="Room Code" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
                        <Button 
                            className={"mt-6"} 
                            type={"submit"} 
                            text={submitText}
                        />
                    </form>
                    <Button 
                        className={"mt-16"}
                        variant={"outline"}
                        type={"button"}
                        text={"Create"} 
                        onClick={handleCreateRoom}
                    />
                </div>
            </div>
        </div>
    ); 
}
