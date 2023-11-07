"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ArtDetails from "@/components/ArtDetail";
import { BsBack, BsBackspaceFill } from "react-icons/bs";
import Link from "next/link";
import { BiSolidLeftArrow, BiSolidLeftArrowCircle } from "react-icons/bi";
const Individual = () => {
    const { artId: productId } = useParams()


    const [artData, setArtData] = useState("");

    async function fetchData() {
        try {
            const res = await fetch(`/api/products/${productId}`);

            if (res.status == 200) {
                const data = await res.json();
                setArtData(data);
            }
        } catch (error) {
            throw error;
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
         <div className="text-center ">
                <Link href="/gallery" passHref>
                    <span className="text-blue-500 absolute left-0  m-5"><BiSolidLeftArrowCircle   fontSize={"2rem"}/></span>
                </Link>
            </div>

            <div className="flex justify-center items-center h-1/2">
                <ArtDetails artdata={artData} />
            </div>


        </>
    )
}

export default Individual