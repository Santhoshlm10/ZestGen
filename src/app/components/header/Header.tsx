import React from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { GoVersions } from "react-icons/go";
import Link from "next/link";
import { Button } from "antd";
import { usePathname } from "next/navigation";


function HeaderComponent() {
    const pathname = usePathname();
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
                        <span className="text-2xl font-bold">Zestgen {pathname == "/playgroundv2" ?  <span className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-violet-800 from-sky-400">Playground</span> : ''}</span>
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