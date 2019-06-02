class UserData {
    private _id: string;
    private name: string;
    private data: string;

    public constructor (_id: string, name: string, data: string) {
        this._id = _id;
        this.name = name;
        this.data = data;
    }

    public get_id (): string {
        return this._id;
    }

    public getName (): string {
        return this.name;
    }

    public setName (newName: string): void {
        this.name = newName;
    }

    public getData (): string {
        return this.data;
    }
    public setData (newData: string): void {
        this.data = newData;
    }

    public getPostData () {
        var postData = {};
        postData['name'] = this.name;
        postData['data'] = this.data;
    }
}