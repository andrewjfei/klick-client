import { Scoring } from "../enums";

export default class Team {
    private _id: string;
    private _name: string;
    private _score: number;
    private _state: Scoring;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this._score = 0;
        this._state = Scoring.NotStarted;
    }
    
    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get score(): number {
        return this._score;
    }

    public get state(): Scoring {
        return this._state;
    }

    public set score(score: number) {
        this._score = score;
    }

    public set state(state: Scoring) {
        this._state = state;
    }
}
