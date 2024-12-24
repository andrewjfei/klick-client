"use client";

import {
    Button,
    IconButton,
    Modal,
    Tag,
    TextInput,
    Typography
} from "@/app/components";
import { righteous } from "@/app/fonts";
import { useSignalR } from "@/app/hooks";
import { Team } from "@/app/models";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FormEvent, Fragment, ReactNode, useState } from "react";

export default function Config(): ReactNode {
    const router = useRouter();
    const { criteria, teams, addCriterion, addTeam } = useSignalR();

    const [criterion, setCriterion] = useState<string>("");
    const [teamName, setTeamName] = useState<string>("");
    const [isCriterionModalOpen, setIsCriterionModalOpen] =
        useState<boolean>(false);
    const [isTeamModalOpen, setIsTeamModalOpen] = useState<boolean>(false);

    function closeTeamModal(): void {
        setIsTeamModalOpen(false);
        setTeamName("");
    }

    function closeCriterionModal(): void {
        setIsCriterionModalOpen(false);
        setCriterion("");
    }

    async function handleAddCriterion(
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();
        await addCriterion(criterion);
        closeCriterionModal();
    }

    async function handleAddTeam(
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();
        await addTeam(teamName);
        closeTeamModal();
    }

    function handleReadyButton(): void {
        router.push("/host/dashboard");
    }

    return (
        <Fragment>
            <Modal
                isModalOpen={isCriterionModalOpen}
                onSubmit={handleAddCriterion}
                onBackgroundClick={closeCriterionModal}
            >
                <TextInput
                    type="text"
                    placeholder="Criterion"
                    value={criterion}
                    onChange={(e) => setCriterion(e.target.value)}
                />
                <Button className={"mt-4"} type="submit" text="Add" />
            </Modal>

            <Modal
                isModalOpen={isTeamModalOpen}
                onSubmit={handleAddTeam}
                onBackgroundClick={closeTeamModal}
            >
                <TextInput
                    type="text"
                    placeholder="Add Team"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                />
                <Button className={"mt-4"} type="submit" text="Add" />
            </Modal>

            <div className="flex-grow flex flex-col">
                <div className="flex flex-row justify-between">
                    <Typography
                        className={`${righteous.className} font-bold text-3xl text-stone-900`}
                        variant="p"
                        text="klick"
                    />
                    <Button
                        type="button"
                        text="Ready"
                        onClick={handleReadyButton}
                    />
                </div>
                <div className="flex-grow grid grid-cols-2 gap-8">
                    <div className="flex-grow flex flex-col">
                        <div className="flex flex-row justify-between items-center">
                            <Typography variant={"h2"} text={"Criteria"} />
                            <IconButton
                                variant="outline"
                                icon={IconPlus}
                                onClick={() => setIsCriterionModalOpen(true)}
                            />
                        </div>
                        <div className="flex-grow p-4 flex rounded-3xl border-2 border-white bg-white">
                            <div className="flex-grow flex flex-col justify-center items-center">
                                {criteria.map((value: string) => {
                                    return (
                                        <Tag
                                            className="my-1"
                                            key={value}
                                            size={"lg"}
                                            text={value}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow flex flex-col">
                        <div className="flex flex-row justify-between items-center">
                            <Typography variant={"h2"} text={"Teams"} />
                            <IconButton
                                variant="outline"
                                icon={IconPlus}
                                onClick={() => setIsTeamModalOpen(true)}
                            />
                        </div>
                        <div className="flex-grow p-4 flex rounded-3xl border-2 border-white bg-white">
                            <div className="flex-grow flex flex-col justify-center items-center">
                                {teams.map((value: Team) => {
                                    return (
                                        <Tag
                                            className="my-1"
                                            key={value.id}
                                            text={value.name}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
