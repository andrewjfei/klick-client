"use client";

import {
    Button,
    IconButton,
    LeaderboardCard,
    Tag,
    Typography
} from "@/app/components";
import { Scoring } from "@/app/enums";
import { useSignalR } from "@/app/hooks";
import { Team, User } from "@/app/models";
import { ReactNode } from "react";
import { IconTrophy, IconPlayerPlayFilled } from "@tabler/icons-react";

export default function Dashboard(): ReactNode {
    const { roomCode, users, teams, startScoring } = useSignalR();

    function handleStart(teamId: string): void {
        startScoring(teamId);
    }

    return (
        <div className="flex-grow flex flex-col">
            <div className="flex flex-row justify-between">
                <IconTrophy size={24} />
                <Tag text={roomCode} />
            </div>
            <div className="flex-grow flex flex-row">
                {/* <div className="flex flex-col">
                    <div className="flex flex-row justify-start">
                        <Typography variant="h2" text="Leaderboard" />
                    </div>
                    <div className="w-96 me-6 p-4 flex-grow rounded-3xl bg-white overflow-y-scroll no-scrollbar">
                        {teams
                            .sort((a: Team, b: Team) => b.score - a.score)
                            .map((team: Team, index: number) => (
                                <LeaderboardCard
                                    className={`mt-2 first:mt-0`}
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
                </div> */}
                <div className="flex-grow flex flex-col">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between items-center">
                            <Typography variant="h2" text="Users" />
                            <Tag size="xl" text={users.length.toString()} />
                        </div>
                        <div className="p-4 flex flex-row justify-center rounded-3xl bg-orange-100">
                            {users.map((user: User) => (
                                <Tag
                                    className="mx-2"
                                    key={user.connectionId}
                                    text={user.name}
                                    state={user.state}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mt-4 flex-grow flex flex-col">
                        <div className="flex flex-row justify-between">
                            <Typography variant="h2" text="Teams" />
                        </div>
                        <div className="p-4 flex-grow rounded-3xl bg-white overflow-y-scroll no-scrollbar">
                            {teams.map((team: Team) => (
                                <div
                                    className={`mt-2 first:mt-0 px-2 py-3 flex flex-row justify-between items-center rounded-2xl bg-stone-100`}
                                    key={team.id}
                                >
                                    <div className="ms-3 flex flex-col items-start">
                                        <h2 className="text-black font-bold">
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
    );
}
