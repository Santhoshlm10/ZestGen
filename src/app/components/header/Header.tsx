import React from "react";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { GoVersions } from "react-icons/go";


function HeaderComponent(){
    return (
        <header>
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Image
              src={require("./../../../app/assets/applogo.png")}
              alt=""
              height={55}
              width={55}
            />
            <span className="text-2xl font-extrabold">Zestgen</span>
          </div>
          <div className="flex items-center gap-5">
            <Button className="text-white bg-violet-500">
            <GoVersions />
              &nbsp;
              Releases</Button>
            <Button className="text-white bg-violet-500">
              <FaGithub />
              &nbsp; Github
            </Button>
          </div>
        </div>
      </header>
    )
};

export default HeaderComponent;