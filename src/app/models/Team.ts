export default class Team {
    private _id: string;
    private _name: string;
    private _score: number;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this._score = 0;
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

    public set score(score: number) {
        this._score = score;
    }
}
