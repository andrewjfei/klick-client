"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { useSignalR } from "@/app/hooks";
import { Button, TextInput, ToggleButton, ToggleButtonGroup } from "@/app/components";

export default function Score(): ReactNode {
    const { team, criteria, giveScore } = useSignalR();

    const scores = [1, 2, 3, 4, 5];

    const [message, setMessage] = useState<string>("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
    const [criterionScore, setCriterionScore] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        if (criteria.length > 0) {
            setIsSubmitDisabled(Object.values(criterionScore).length !== criteria.length);
        }
    }, [criterionScore]);

    function handleCriterionScore(criterion: string, score: number): void {
        const updatedCriterionScore = { ...criterionScore };
        updatedCriterionScore[criterion] = score;

        setCriterionScore(updatedCriterionScore);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        const score = Object.values(criterionScore).reduce((agg, value) => agg + value, 0);
        await giveScore(score);
        setCriterionScore({});
    }

    return (
        <div className="p-4 flex-grow flex">
            {
                team === null ?
                (
                    <div className="flex-grow flex flex-col justify-between">
                        <div className="flex-grow flex flex-col justify-center items-center">
                            Waiting on host to start scoring...
                        </div>
                        <form className="flex flex-row justify-between">
                            <TextInput type={"text"} placeholder={"Message"} value={message} onChange={(e) => setMessage(e.target.value)} />
                            <Button type={"submit"} variant={"solid"} text="Send" />
                        </form>
                    </div>
                ) :
                (
                    <form 
                        className="flex-grow flex flex-col bg-green-100"
                        onSubmit={handleSubmit}
                    >
                        <div className="py-10 flex flex-row justify-center">
                            <h1 className="font-bold text-4xl">{team.name}</h1>
                        </div>
                        <div>
                            {
                                criteria.map((criterion: string) => {
                                    return (
                                        <div key={criterion}>
                                            <h2>{criterion.toUpperCase()}</h2>
                                            <ToggleButtonGroup values={scores.map((score: number) => score.toString())} onToggle={(value: string) => handleCriterionScore(criterion, Number(value))} />
                                        </div>
                                    );
                                })
                            }    
                        </div>
                        <div className="my-10 flex-grow flex flex-col justify-between bg-blue-100">
                            <Button type="submit" disabled={isSubmitDisabled} text={"Submit"} />
                        </div>
                    </form>
                )
            }
        </div>
    );
}