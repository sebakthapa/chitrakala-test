import dbConnect,{closeConnection} from "@/lib/dbConnect";
import BuyerDetails from "@/models/seller/usersDetail";
import { NextResponse } from "next/server";



// GET => GET userdetail

export const GET = async (request) => {

    try {
        await dbConnect("buyer");
        const params = request.url.split('/');
        const userId = params[params.length-1];
        const res = await BuyerDetails.findOne({
            'user': userId
        }).populate('user');
        

        closeConnection("buyer");
        return new NextResponse(JSON.stringify(res))
        
    } catch (error) {
        console.log("ERROR fetching user detail \n" + error)
        return new NextResponse(error);
    }
}

// UPDATE => UPDATE a product

export const PATCH = async (request) => {

    try {
        const userDetailData = await request.json();
      
        await dbConnect("buyer");
        const params = request.url.split('/');
        const userId = params[params.length-1];
        
        const res = await BuyerDetails.findOneAndUpdate(
            {'user': userId},
            userDetailData,
            {new: true}
        )

        closeConnection("buyer");
        return new NextResponse(JSON.stringify(res))
        
    } catch (error) {
        console.log("ERROR while creating product \n" + error )
    }

}