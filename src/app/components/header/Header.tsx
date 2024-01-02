import React from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { GoVersions } from "react-icons/go";
import Link from "next/link";
import { Button } from "antd";


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
                        <Button
                            type="default"
                            icon={<GoVersions />}
                        >
                            Releases
                        </Button>
                    </Link>
                    <Link href={"https://github.com/Santhoshlm10/ZestGen"} rel="noopener noreferrer" target="_blank">
                        <Button
                            type="default"
                            icon={<FaGithub />}
                        >
                            Github
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
};

export default HeaderComponent;