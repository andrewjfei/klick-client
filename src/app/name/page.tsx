"use client"

import { FormEvent, useState } from "react";
import { useSignalR } from "@/app/hooks";
import { Button, TextInput } from "@/app/components";
import { useRouter } from "next/navigation";
import { righteous } from "@/app/fonts";

export default function Home() {
    const router = useRouter();

    const { chooseName } = useSignalR();

    const [name, setName] = useState<string>("");

    const submitText: string = "Next";

    async function handleChooseName(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        await chooseName(name);
        router.push("/score");
    }

    return (
        <div className="flex-grow flex flex-col justify-center items-center">
        <div className="w-96 flex-grow flex flex-col justify-evenly">
            <div className="flex flex-row justify-center">
                <p className={`${righteous.className} text-7xl select-none`}>klick</p>
            </div>
            <div className="flex flex-col">
            <form onSubmit={handleChooseName} className="flex flex-col">
                <TextInput type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
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
                text={"Back"} 
                onClick={() => router.back()}
            />
            </div>
        </div>
    </div>
    );
}
