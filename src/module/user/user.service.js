import { userModel } from "../../database/model/index.js";



export const signup = async (data) => {
    let { name, email, password } = data
    const existingCheck = await userModel.findOne({ where: { email } });
    if (existingCheck) {
        throw new Error("Email already exists.", { cause: 409 });
    }
    // console.log("existingCheck",existingCheck)
    const newUser = userModel.build({ name, email, password });
    await newUser.save();
};


export const update = async ({ id }, data) => {

    const check = await userModel.findOne({
        where: { id }
    });

    //To prevent the entry of null fields
    if (!check) {
        const requiredFields = ["name", "email", "password"];
        const missing = requiredFields.filter(
            field => !data[field]
        );

        if (missing.length > 0) {
            throw new Error(
                `User not found, To create a new user, send: ${missing.join(",")}`,{ cause: 400 }
            );
        }
    }

    console.log("ID FROM URL:", id);
console.log("DATA:", data);
console.log("CHECK:", check);

    const [record, created] = await userModel.upsert({id: id, ...data });

    return { record, created };
};



export const getByEmail =async (data)=>{
    const user = await userModel.findAll({
        where : data,
        attributes : {
            exclude : ["password"]
        }
    })
    return user
}

export const getByPk =async (data)=>{
    const user = await userModel.findAll({
        where : data,
        attributes : {
            exclude : ["role" , "password"]
        }
    })
    return user
}

