export class User{
    constructor (
        public first_name: string = "",
        public last_name: string = "",
        public email: String = "",
        public password: String= "",
        public bicycles = []
    ){}
}