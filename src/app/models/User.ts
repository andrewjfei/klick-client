export default class User {
    private _connectionId: string;
    private _name: string;

    constructor(connectionId: string, name: string) {
        this._connectionId = connectionId;
        this._name = name;
    }

    public get connectionId(): string {
        return this._connectionId;
    }

    public get name(): string {
        return this._name;
    }
}
