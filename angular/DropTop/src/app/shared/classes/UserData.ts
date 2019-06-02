class UserData {
    private name: string;
    private data: string;

    public constructor (name: string, data: string) {
        this.name = name;
        this.data = data;
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