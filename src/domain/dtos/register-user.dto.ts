import { REGEX } from "../../shared";




export class RegisterUserDto{


    constructor(
        public readonly fullName: string,
        public readonly email: string,
        public readonly password: string,
        public readonly phone: string,
    ){}


    static create(props: {[key: string]: any}): [string?, RegisterUserDto?]{

        const {fullName, email, password, phone} = props;

        if(!fullName) return ['Missing full name'];
        if(!email) return ['Missing email'];
        if(!REGEX.EMAIL.test(email)) return ['Invalid email'];
        if(!password) return ['Missing password'];
        if(!REGEX.PASSWORD.test(password)) return ['Invalid password'];
        if(!phone) return ['Missing phone'];
        if(!REGEX.PHONE.test(phone)) return ['Invalid phone'];

        return ['', new RegisterUserDto(fullName, email, password, phone)];

    }

}