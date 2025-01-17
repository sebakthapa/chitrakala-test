import sendNotification from "../../../../services/sendNotification.service";
import dbConnect from "../../../../services/dbConnect.service";
import Products from "@/models/users/products";
import UsersDetails from "@/models/users/usersDetail";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// GET => get all products
export const GET = async () => {
  try {
    await dbConnect();

    const res = await Products.find();
    return new NextResponse(JSON.stringify(res));
  } catch (error) {
    console.log("ERROR fetching products \n" + error);
  }
};

export const PATCH = async (request) => {
  try {
    const token = await getToken({ req: request });
    if (!token?.user.id) {
      return NextResponse.json(
        { message: "You must be logged in to interact!" },
        { status: 401 },
      );
    }
    const { productId, userId } = await request.json();
    let status = false;
    let count = 0;

    if (!userId || !productId) {
      return new NextResponse(JSON.stringify({ error: "Bad Request" }), {
        status: 400,
      });
    }

    // Get product
    const product = await Products.findById(productId);
    const userdetails = await UsersDetails.findById(userId);

    // Check if userdetails already liked
    const userHasLiked = product.likes.includes(userId);
    const productIsLiked = userdetails.likeProducts.includes(productId);

    let updatedLikes = [...product.likes];
    let updatedLikesUser = [...userdetails.likeProducts];

    // Update likes array for users
    if (productIsLiked) {
      updatedLikesUser = updatedLikesUser.filter((id) => !id.equals(productId));
    } else {
      updatedLikesUser.push(productId);
    }

    // Update likes array for products

    if (userHasLiked) {
      // already liked remove userid form likes array
      updatedLikes = updatedLikes.filter((id) => !id.equals(userId));
      status = "unliked";
    } else {
      // not liked add userid in likes array
      updatedLikes.push(userId);
      status = "liked";
    }

    // Update the database

    // now update add the updated likes data to db
    const updatedProduct = await Products.findByIdAndUpdate(productId, {
      likes: updatedLikes,
    }).populate("artist");
    const userDetails = await UsersDetails.findByIdAndUpdate(userId, {
      likeProducts: updatedLikesUser,
    });

    //update notification
    const notificationMessage =
      status === "liked"
        ? `${userDetails?.name} liked your product ${updatedProduct?.name}`
        : `${userDetails?.name} unliked your product ${updatedProduct?.name}`;

    const updatedNotification = {
      title: status === "liked" ? "You got a liked" : "Someone unliked",
      body: notificationMessage,
      image: userDetails?.image,
      redirect: `/product/${productId}`,
    };

    try {
      if (token?.user.id !== userDetails.user.toString()) {
        const res = await sendNotification(
          updatedProduct.artist.user,
          updatedNotification,
        );
      }
    } catch (error) {
      console.error(error.message);
    }

    // Update product with new data
    return new NextResponse(JSON.stringify(updatedProduct));
  } catch (error) {
    console.log("Error occured while updating likes: ");
    throw error;
    // return new NextResponse(JSON.stringify({ error: "Error updating likes" }))
  }
};
