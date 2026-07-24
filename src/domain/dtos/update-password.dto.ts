import { REGEX } from "../../shared";


export class UpdatePasswordDto{

    constructor(
        public readonly email: string,
        public readonly newPassword: string,
    ){}

    static update(props: {[key:string]: any}): [string?, UpdatePasswordDto?]{

        const {email, newPassword} = props;

        if(!email) return ['Missing email'];
        if(!newPassword) return ['Missing new password'];

        if(!REGEX.PASSWORD.test(newPassword)) return ['Invalid password'];

        return ['', new UpdatePasswordDto(email, newPassword)];

    }
}