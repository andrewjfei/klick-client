"use client"

import { FormEvent, useState } from "react";
import { useSignalR } from "@/app/hooks";
import { Button } from "@/app/components";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const { chooseName } = useSignalR();

    const [name, setName] = useState<string>("");

    const submitText: string = "Next";

    async function handleChooseName(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        await chooseName(name);
    }

    return (
        <div className="bg-stone-100 flex flex-col p-6">
            <form onSubmit={handleChooseName} className="flex flex-col">
                <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Button
                    className={"mt-6"} 
                    type={"submit"} 
                    text={submitText} 
                />
            </form>
            <Button 
                className={"mt-6"}
                type={"button"} 
                text={"Back"} 
                onClick={() => router.back()}
            />
        </div>
    );
}
