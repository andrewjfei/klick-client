"use client";

import {
    Alert,
    Button,
    IconButton,
    LeaderboardCard,
    Tag,
    Typography
} from "@/app/components";
import { Scoring } from "@/app/enums";
import { useSignalR } from "@/app/hooks";
import { Team, User } from "@/app/models";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { IconTrophy, IconPlayerPlayFilled, IconMessage } from "@tabler/icons-react";
import { righteous } from "@/app/fonts";

export default function Dashboard(): ReactNode {
    const { roomCode, users, teams, startScoring, team: scoringTeam, messages, nextMessage } = useSignalR();

    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        if (messages.length > 0) {
            if (messages[0] !== message) {
                setMessage(messages[0]);

                setTimeout(() => {
                    nextMessage();
                }, 5000);
            }
        } else {
            setMessage(null);
        }
    }, [messages]);

    function handleStart(teamId: string): void {
        startScoring(teamId);
    }

    return (
        <Fragment>
            {
                message &&
                (
                    <div className="absolute left-1/2 -translate-x-1/2 px-4 py-3 rounded-2xl border-2 flex flex-row items-center border-stone-800 bg-stone-200">
                        <IconMessage className={`me-2 text-stone-800`} size={28} />
                        <Typography className="font-medium text-stone-800" variant="p" text={message} />
                    </div>
                )
            }
            <div className="flex-grow flex flex-col">
                <div className="flex flex-row justify-between items-center">
                    <Typography
                        className={`${righteous.className} font-bold text-3xl text-stone-900`}
                        variant="p"
                        text="klick"
                    />
                    {/* <IconTrophy size={24} /> */}
                    <Tag text={roomCode} />
                </div>
                <div className="flex-grow grid grid-cols-12 gap-6 mt-4">
                    <div className="col-span-6 flex flex-col">
                        <div className="flex flex-row justify-start">
                            <Typography variant="h2" text="Leaderboard" />
                        </div>
                        <div className="p-4 h-1 flex-grow rounded-3xl bg-white overflow-y-scroll no-scrollbar">
                            {teams
                                .sort((a: Team, b: Team) => b.score - a.score)
                                .map((team: Team, index: number) => (
                                    <LeaderboardCard
                                        className={`mt-4 first:mt-0`}
                                        key={team.id}
                                        rank={index + 1}
                                        name={team.name}
                                        text={
                                            team.state === Scoring.Completed
                                                ? team.score.toString()
                                                : "?"
                                        }
                                    />
                                ))}
                        </div>
                    </div>

                    <div className="col-span-6 flex flex-col">
                        <div className="flex flex-col">
                            <div className="flex flex-row justify-between items-center">
                                <Typography variant="h2" text="Users" />
                                <Tag size="xl" text={users.length.toString()} />
                            </div>
                            <div className="p-4 h-72 grid grid-cols-5 grid-rows-5 gap-4 rounded-3xl bg-orange-100">

                                {users.map((user: User) => (
                                    <div className="flex justify-center items-center" key={user.connectionId}>
                                        <Tag
                                            className="w-full flex justify-center"
                                            text={user.name}
                                            state={user.state}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-3 flex-grow flex flex-col">
                            <div className="flex flex-row justify-between">
                                <Typography variant="h2" text="Teams" />
                            </div>
                            <div className="p-4 h-1 flex-grow flex flex-col rounded-3xl bg-white overflow-y-scroll no-scrollbar">
                                {teams.map((team: Team) => (
                                    <div
                                        className={`mt-4 first:mt-0 px-4 py-3 flex flex-row justify-between items-center rounded-2xl bg-stone-100`}
                                        key={team.id}
                                    >
                                        <div className="flex flex-col items-start">
                                            <h2 className="text-stone-900 font-bold">
                                                {team.name}
                                            </h2>
                                            <Tag
                                                className="mt-1"
                                                size="xs"
                                                text={
                                                    team.state ===
                                                    Scoring.NotStarted
                                                        ? "Not Started"
                                                        : team.state ===
                                                            Scoring.InProgress
                                                        ? "In Progress"
                                                        : "Completed"
                                                }
                                                state={team.state}
                                            />
                                        </div>
                                        {team.state === Scoring.NotStarted && (
                                            <IconButton
                                                variant="outline"
                                                disabled={scoringTeam !== null}
                                                icon={IconPlayerPlayFilled}
                                                onClick={() => handleStart(team.id)}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
