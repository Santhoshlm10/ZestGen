import React from "react";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { GoVersions } from "react-icons/go";
import Link from "next/link";


function HeaderComponent() {
    return (
        <header>
            <div className="p-5 flex items-center justify-between">
                <Link href={"/"}>
                    <div className="flex items-center gap-1">
                        <Image
                            src={require("./../../../app/assets/applogo.png")}
                            alt=""
                            height={55}
                            width={55}
                        />

                        <span className="text-2xl font-extrabold">Zestgen</span>
                    </div>
                </Link>
                <div className="flex items-center gap-5">
                    <Link href={"/releases"}>
                        <Button className="text-white bg-violet-500">
                            <GoVersions />
                            &nbsp;
                            Releases</Button>
                    </Link>
                    <Link href={"https://github.com/Santhoshlm10/ZestGen"} rel="noopener noreferrer" target="_blank">
                        <Button className="text-white bg-violet-500">
                            <FaGithub />
                            &nbsp; Github
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
};

export default HeaderComponent;