import { REGEX } from "../../shared";



export class CreatePasswordResetDto{

    constructor(
        public readonly email: string
    ){}


    static create(props: {[key: string]:any}):[string?, CreatePasswordResetDto?]{

        const {email} = props;

        if(!email) return ['Missing email'];

        if(!REGEX.EMAIL.test(email)) return ['Invalid email'];

        return ['', new CreatePasswordResetDto(email)];

    }


}