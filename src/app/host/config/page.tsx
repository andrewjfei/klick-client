"use client";

import { Button, Modal, Tag, TextInput } from "@/app/components";
import { useSignalR } from "@/app/hooks";
import { Team } from "@/app/models";
import { useRouter } from "next/navigation";
import { FormEvent, Fragment, ReactNode, useState } from "react";

export default function Config(): ReactNode {
    const router = useRouter();
    const { criteria, teams, addCriterion, addTeam } = useSignalR();

    const [criterion, setCriterion] = useState<string>("");
    const [teamName, setTeamName] = useState<string>("");
    const [isCriterionModalOpen, setIsCriterionModalOpen] = useState<boolean>(false);
    const [isTeamModalOpen, setIsTeamModalOpen] = useState<boolean>(false);

    function closeTeamModal(): void {
        setIsTeamModalOpen(false);
        setTeamName("");
    }

    function closeCriterionModal(): void {
        setIsCriterionModalOpen(false);
        setCriterion("");
    }

    async function handleAddCriterion(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        await addCriterion(criterion);
        closeCriterionModal();
    }

    async function handleAddTeam(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        await addTeam(teamName);
        closeTeamModal();
    }

    function handleReadyButton(): void {
        router.push("/host/dashboard");
    }

    return (
        <Fragment>
            <Modal isModalOpen={isCriterionModalOpen} onSubmit={handleAddCriterion} onBackgroundClick={closeCriterionModal}>
                <TextInput type="text" placeholder="Criterion" value={criterion} onChange={(e) => setCriterion(e.target.value)} />
                <Button className={"mt-4"} type="submit" text="Add" />
            </Modal>

            <Modal isModalOpen={isTeamModalOpen} onSubmit={handleAddTeam} onBackgroundClick={closeTeamModal}>
                <TextInput type="text" placeholder="Add Team" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                <Button className={"mt-4"} type="submit" text="Add" />
            </Modal>

            <div className="p-6 w-dvw h-dvh flex flex-col">
                <div className="p-4 flex-grow flex flex-col rounded-md bg-orange-100">
                    <div className="flex flex-row justify-center">
                        <h1 className="text-xl font-bold">{"Criteria".toUpperCase()}</h1>
                    </div>
                    <div className="flex-grow flex flex-row justify-center items-center">
                        {criteria.map((value: string) => {
                            return (
                                <Tag className="ms-2 first:ms-0" key={value} size={"lg"} text={value} />
                            );
                        })}
                    </div>
                </div>

                <div className="mt-6 p-4 flex-grow flex flex-col rounded-md bg-orange-100">
                    <div className="flex flex-row justify-center">
                            <h1 className="text-xl font-bold">{"Teams".toUpperCase()}</h1>
                    </div>
                    <div className="flex-grow flex flex-row justify-center items-center">
                        {teams.map((value: Team) => {
                            return (
                                <Tag className="ms-2 first:ms-0" key={value.id} text={value.name} />
                            );
                        })}
                    </div>
                </div>

                <div className="mt-6 flex flex-row justify-between">
                    <Button 
                        type="button" 
                        text="Add Criterion" 
                        onClick={() => setIsCriterionModalOpen(true)}  
                    />
                    <Button 
                        type="button" 
                        text="Add Team" 
                        onClick={() => setIsTeamModalOpen(true)}  
                    />
                    <Button 
                        type="button" 
                        text="Ready" 
                        onClick={handleReadyButton}  
                    />
                </div>
            </div>
        </Fragment>
    );
}