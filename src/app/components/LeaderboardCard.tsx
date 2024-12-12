import { ReactNode } from "react";

interface LeaderboardCardProps {
    className?: string;
    rank: number;
    name: string;
    text?: string;
}

export default function LeaderboardCard({
    className = "",
    rank,
    name,
    text = ""
}: LeaderboardCardProps): ReactNode {
    let backgroundColour: string = "";
    
    switch(rank) {
        case 1:
            backgroundColour = "from-amber-300 to-amber-200";
            break;
        case 2:
            backgroundColour = "from-zinc-300 to-zinc-200";
            break;
        case 3:
            backgroundColour = "from-orange-300 to-orange-200";
            break;
        default:
            backgroundColour = "from-stone-100 to-stone-100";
    }

    return (
        <div className={`px-6 py-4 flex flex-row justify-between items-center rounded-3xl bg-gradient-to-r ${backgroundColour} ${className}`}>
            <div className="flex flex-row items-center">
                <h1 className="text-3xl font-bold text-black">{rank}</h1>
                <div>
                    <h2 className="ms-6 text-sm font-semibold text-black">{name}</h2>
                </div>
            </div>
            <div className="flex flex-row items-end">
                <p className="text-4xl font-bold">{text}</p>  
                <p className="text-xs font-bold">{"PTS"}</p>  
            </div>
        </div>
    );
}