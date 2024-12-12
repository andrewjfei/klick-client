import { Scoring } from "@/app/enums";

export default class User {
    private _connectionId: string;
    private _name: string;
    private _state: Scoring;

    constructor(connectionId: string, name: string) {
        this._connectionId = connectionId;
        this._name = name;
        this._state = Scoring.NotStarted;
    }

    public get connectionId(): string {
        return this._connectionId;
    }

    public get name(): string {
        return this._name;
    }

    public get state(): Scoring {
        return this._state;
    }

    public set state(state: Scoring) {
        this._state = state;
    }
}
