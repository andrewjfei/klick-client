import { useContext } from "react";
import { SignalRContext } from "@/app/contexts";
import type { SignalRContextProps } from "@/app/contexts";

export default function useSignalR(): SignalRContextProps | null {
    return useContext(SignalRContext);
}
