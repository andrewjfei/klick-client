"use client";

import { ReactNode } from "react";
import { useSignalR } from "@/app/hooks";
import { User } from "@/app/models";
import { Tag } from "@/app/components";

export default function Host(): ReactNode {
    const { users } = useSignalR();

    return (
        <div>
            <div className={"bg-red-100 p-16"}>
                {users.map((user: User) => (
                    <Tag key={user.connectionId} text={user.name} />
                ))}
            </div>
        </div>
    );
}
