export class recipe{
    public name:string;
    public description:string;
    public shortDescription:string;
    public image:string;

    constructor(name:string,description:string,image:string,shortDescription:string){

        this.name=name;
        this.description=description;
        this.shortDescription=shortDescription;
        this.image=image;
    }
}