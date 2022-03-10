import bcrypt from "bcryptjs"
export const users=[
    {
        name:"mithran",
        email:"mithran@gmail.com",
        password:bcrypt.hashSync("12345",10),
        isAdmin:true
    },
    {
        name:"deepa",
        email:"deepa@gmail.com",
        password:bcrypt.hashSync("12345",10),
    },
    {
        name:"abi",
        email:"abi@gmail.com",
        password:bcrypt.hashSync("12345",10),
    }
]