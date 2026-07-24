


export class LoginUserDto{

    constructor(
        public readonly email: string,
        public readonly password: string 
    ){}


    static login(props: {[key: string]: any}): [string?, LoginUserDto?]{
        const {email, password} = props;

        if(!email) return ['Missing email'];
        if(!password) return ['Missing password'];


        return ['', new LoginUserDto(email, password)];
    }

}