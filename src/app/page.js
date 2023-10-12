"use client"
import React from "react";
import Landing from "@/components/Landing";
import Carousel from "@/components/Carousel";
import { motion } from "framer-motion";
import Image from "next/image";
const page = () => {
  return (
    <>
      <Landing />




      <div className="bg-[#e5eee9] card-collection z-200 flex flex-wrap w-full min-h-[40rem] gap-1 justify-center">
        <div className="shadow-xl  gap-5 m-5 flex flex-col flex-1 min-w-[300px] max-w-[500px] min-h-[6rem]  justify-center items-center p-10 bg-[#daebf1]">
        <motion.img
                key={"oil"}
                src={"/landing/oil.jpg"}
                whileHover={{ scale: 1.1}}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                />
        <span className=" text-xl font-bold text-gray-700" >Oil</span>

        </div>
        <div className="shadow-xl gap-5 m-5 flex flex-col flex-1 min-w-[300px]  max-w-[500px] min-h-[6rem]  justify-center items-center p-10 bg-[#ecd0e7]">
        <motion.img
                key={"oil"}
                src={"/landing/water.jpg"}
                whileHover={{ scale: 1.1}}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                />
        <span className=" text-xl font-bold text-gray-700" >Water</span>
        </div>

        <div className="shadow-xl gap-5 m-5 flex flex-col flex-1 min-w-[300px]  max-w-[500px]  min-h-[6rem] justify-center items-center p-10 bg-[#d5d0ed]">
        <motion.img
                key={"oil"}
                src={"/landing/digital.jpg"}
                whileHover={{ scale: 1.1}}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                />
        <span className=" text-xl font-bold text-gray-700" >Digital</span>

        </div>
        <div className="shadow-xl gap-5 m-5 flex flex-col flex-1 min-w-[300px]  max-w-[500px]  min-h-[6rem] justify-center items-center p-10 bg-[#efefef]">
        <motion.img
                key={"oil"}
                src={"/landing/sketch.jpg"}
                whileHover={{ scale: 1.1}}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                />
          <span className=" text-xl font-bold text-gray-700" >Sketch</span>
        </div>
        <div className="shadow-xl gap-5 m-5 flex flex-col flex-[1] min-w-[300px]  max-w-[full]  min-h-[6rem] justify-center items-center p-10 bg-[#daebf1]">
          <Carousel/>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#e5eee9"
          fillOpacity="1"
          d="M0,224L48,240C96,256,192,288,288,256C384,224,480,128,576,117.3C672,107,768,181,864,197.3C960,213,1056,171,1152,176C1248,181,1344,235,1392,261.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <div className="flex flex-wrap w-full h-[40rem] gap-1 justify-center bg-[#e5eee9]">
        <div className=" border-2 border-[#556f5f]   rounded-lg m-5 flex flex-wrap-reverse flex-1 min-w-[300px] max-w-[700px] max-h-[30rem] justify-evenly items-center p-10 bg-[#e5eee9]">
          <div className="flex flex-col gap-5 border-[1px] border-[#556f5f9c]  p-5 rounded-lg">
            <span className="text-3xl font-extrabold">Top Artist</span>
            <span>Details</span>
            <span>Details</span>
            <span>Details</span>
            <button className="border text-[#556f5f] border-[#556f5f] hover:bg-[#556f5f] hover:text-white py-2 px-6 rounded-full">
              Checkout
            </button>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="bg-white w-[200px] h-[200px] flex items-center justify-center border rounded-full">
              Photo
            </div>
            <div className="flex flex-col gap-3 p-5">
              <span>Joined on ___/___/___</span>
              <span>Tag:</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
