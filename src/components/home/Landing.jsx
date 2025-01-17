"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";

function Landing() {
  return (
    <>
      <div className="landing sm:m-5 flex shrink-0 justify-between items-center overflow-hidden  bg-[#fff] min-h-[50vh] h-[90vh]">
        <div className="flex-[100%] shiny_effect md:-mr-28  relative  max-w-[650px] flex flex-col justify-center md:pl-5 lg:pl-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.7 }}
            className="  text-5xl xxs:text-6xl xs:text-7xl saman  px-5  font-extrabold"
          >
            {/* Chitrakala */}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 1, delay: 0.4 }}
            className=" font-serif text-3xl xxs:text-5xl sm:text-6xl    px-5 pt-3 font-[100] tracking-[5px]"
          >
            Where Imagination Meets Canvas
          </motion.span>
          <motion.p
            className=" text-sm xxs:text-base  sm:text-[1.08rem]  leading-relaxed text-gray-700 antialiased p-5"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeInOut", duration: 1, delay: 1 }}
          >
            Chitrakala is the social marketplace that allows you to discover,
            buy, and sell art. A place for the art-curious and the art-expert,
            for the art gallery and artist. A new way forward for the art world.
          </motion.p>

          <span className="text-xl  text-center  font-extralight"></span>
          <motion.div
            className="flex gap-2 xxs:gap-5 mx-5 mt-2"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeInOut", duration: 1, delay: 1.5 }}
          >
            <Link href="/about">
              <button className="border text-gray-800 border-gray-800 hover:bg-gray-800 hover:text-white py-2 px-6 rounded-full transition duration-300">
                About
              </button>
            </Link>
            <Link href="/arts/popular">
              <button className="group border  border-gray-800 bg-gray-800 text-gray-100 hover:text-white py-2 px-6 pr-5 rounded-full flex items-center gap-2">
                Explore{" "}
                <BsArrowRight
                  className="w-0 transition-all duration-500 ease-in-out group-hover:w-4 h-4"
                  fill="white"
                />
              </button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className=" hidden md:flex h-full  shrink-0 items-center justify-start xl:mr-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1.5 }}
        >
          <div className="a opacity-90   scale-[1.1]  ">
            <Image
              priority
              alt="Painting of an old man"
              src={"/landing/landingE.png"}
              className=" b-red-500 w-[25rem] lg:w-[30rem] xl:w-[35rem]  object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,.5)] lg:drop-shadow-[0_50px_50px_rgba(0,0,0,.8)] "
              width={1000}
              height={1000}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Landing;
