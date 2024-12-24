"use client";

import { FormEvent, Fragment, ReactNode, useEffect, useState } from "react";
import { useSignalR } from "@/app/hooks";
import { Alert, Button, IconButton, TextInput, ToggleButton, ToggleButtonGroup, Typography } from "@/app/components";
import { IconSend } from "@tabler/icons-react";

export default function Score(): ReactNode {
    const { team, criteria, giveScore, sendMessage } = useSignalR();

    const scores = [1, 2, 3, 4, 5];

    const [isAlertActive, setIsAlertActive] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
    const [criterionScore, setCriterionScore] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        if (criteria.length > 0) {
            setIsSubmitDisabled(Object.values(criterionScore).length !== criteria.length);
        }
    }, [criterionScore]);

    async function handleSendMessage(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        await sendMessage(message);
        setMessage("");
        setAlertMessage("Messenge Sent")
        setIsAlertActive(true);
    }

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
        setAlertMessage("Score Submitted");
        setIsAlertActive(true);
    }

    return (
        <Fragment>
            <Alert variant="success" active={isAlertActive} message={alertMessage} onClear={() => setIsAlertActive(false)} />
            <div className="flex-grow flex">
                {
                    team === null ?
                    (
                        <div className="flex-grow flex flex-col justify-between">
                            <div className="flex-grow flex flex-col justify-center items-center">
                                <Typography variant="h4" text="Waiting on host to start scoring..." />
                            </div>
                            <form 
                                className="flex flex-row justify-between"                             
                                onSubmit={handleSendMessage}
                            >
                                <TextInput className="flex-grow me-4" type={"text"} placeholder={"Message"} value={message} onChange={(e) => setMessage(e.target.value)} />
                                <IconButton
                                    variant="solid"
                                    type="submit"
                                    icon={IconSend}
                                />
                            </form>
                        </div>
                    ) :
                    (
                        <form 
                            className="flex-grow flex flex-col"
                            onSubmit={handleSubmit}
                        >
                            <div className="py-10 flex flex-row justify-center">
                                <h1 className="font-bold text-4xl text-stone-900">{team.name}</h1>
                            </div>
                            <div className="flex-grow overflow-y-scroll no-scrollbar">
                                {
                                    criteria.map((criterion: string) => {
                                        return (
                                            <div key={criterion}>
                                                <Typography variant={"h3"} text={criterion} />
                                                <div  className="p-3 border-2 rounded-2xl bg-white border-white">
                                                    <ToggleButtonGroup values={scores.map((score: number) => score.toString())} onToggle={(value: string) => handleCriterionScore(criterion, Number(value))} />
                                                </div>
                                            </div>
                                        );
                                    })
                                }    
                            </div>
                            <div className="mt-4 flex flex-row justify-between">
                                <div className="px-4 py-2.5 min-w-10 bg-white rounded-xl flex flex-row items-end">
                                    <Typography className="font-bold text-xl text-orange-400" variant={"p"} text={Object.values(criterionScore).reduce((agg, value) => agg + value, 0).toString()} />
                                    <Typography className="mx-1 text-xl font-bold text-stone-900" variant="p" text="/" />
                                    <Typography className="text-xl font-medium text-stone-900" variant="p" text={`${criteria.length * scores.length}`} />
                                </div>
                                <Button className="flex-grow ms-4" type="submit" disabled={isSubmitDisabled} text={"Submit"} />
                            </div>
                        </form>
                    )
                }
            </div>
        </Fragment>
    );
}