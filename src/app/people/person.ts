import { Gender } from './gender';

export class Person {
    public image: string;
    public name: string;
    public id: number;
    public birthdate: Date;
    public gender: Gender;
    public userRank: number;
    public isAdmin: boolean;

    constructor(image: string, name: string, id: number,
        birthdate: Date, gender: Gender, userRank: number,
        isAdmin: boolean) {

        this.image = image;
        this.name = name;
        this.id = id;
        this.birthdate = birthdate;
        this.gender = gender;
        this.userRank = userRank;
        this.isAdmin = isAdmin;
    }

    get genderName(): string {
        return Gender[this.gender];
    }
}
