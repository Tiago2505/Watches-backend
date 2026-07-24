


export class VerifyCodeDto{

    constructor(
        public readonly email: string,
        public readonly code: string
    ){}

    static verify(props: {[key: string]: any}): [string?, VerifyCodeDto?]{

        const {email, code} = props;

        if(!email) return ['Missing email'];
        if(!code) return ['Missing code'];

        if(isNaN(code)) return ['Invalid code'];

        if(code < 0 ) return ['The code cannot be less than zero'];

        return ['', new VerifyCodeDto(email, code)];

    }

}