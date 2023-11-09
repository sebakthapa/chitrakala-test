import dbConnect from "@/lib/dbConnect";
import Users from "@/models/useraccounts/users";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

export const PATCH = async (request) => {
    const saltRounds = 10;
    const hashPassword = (password) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) reject(err)
                resolve(hash)
            })
        })
    }

    try {
        console.log("t")
        const { userId, currentPassword, newPassword, confirmNewPassword } = await request.json();
        console.log("pt")

        if (!newPassword || !currentPassword || !confirmNewPassword) {
            return new NextResponse(JSON.stringify({field:"multiple", message: "One or more field data is missing." }), { status: 400, statusText: "bad request" })
        }

        if (newPassword != confirmNewPassword) {
            return new NextResponse(JSON.stringify({field:"confirmnewpassword", message: "Confirm Password didn't match." }), { status: 400, statusText: "bad request" })
        }

        await dbConnect();

        const existingUser = await Users.findById(userId, {password:1});

        if (!existingUser) {
            return new NextResponse(JSON.stringify({ message: "User doesn't exist to perform the desired action." }), { status: 400, statusText: "bad request" })
        }

        if (!existingUser.password) {
            return new NextResponse(JSON.stringify({field:"multiple", message: "You can change password only via email link." }), { status: 400, statusText: "bad request" })
        }

        console.log({currentPassword, newPassword, confirmNewPassword, existingUser})

        const isPwCorrect = await bcrypt.compare(currentPassword, existingUser.password)
        if (!isPwCorrect) {
            return new NextResponse(JSON.stringify({ field: "currentpassword", message: "Incorrect password." }), { status: 401, statusText: "unauthorized" })
        }

        const hash = await hashPassword(newPassword);

        existingUser.password = hash;
        await existingUser.save()

        return new NextResponse(JSON.stringify({message:"Password change successful!", status:200, statusText:"ok"}))

    } catch (error) {
        console.log("ERROR while changing password for user \n" + error);
    }
}