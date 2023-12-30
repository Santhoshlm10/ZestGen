"use client";

import { Button } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <main>
      <header>
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Image
              src={require("./../app/assets/applogo.png")}
              alt=""
              height={55}
              width={55}
            />
            <span className="text-2xl font-extrabold">Zestgen</span>
          </div>
          <div className="flex items-center gap-5">
            <Button className="text-white bg-violet-500">About</Button>
            <Button className="text-white bg-violet-500">
              <FaGithub />
              &nbsp; Github
            </Button>
          </div>
        </div>
      </header>
      <div>
        <div className="p-20">
          <p className="text-center mb-4 text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-800 from-sky-400">
              The Dynamic Data Playground for Creative Minds
            </span>
          </p>
          <div>
            <p className="text-center p-3 text-xl">
              Explore endless creativity at ZestGen virtual playground! Dive
              into a world of randomized values, perfect for developers craving
              unpredictability or data enthusiasts seeking diversity. Sculpt, experiment, and bring datasets to life! 🚀✨{" "}
            </p>
          </div>
          <br />
          <div  style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Link href="/playground">
              <Button
                style={{
                  backgroundColor: "#8764b8",
                  color: "white",
                  margin: "10px",
                  fontSize:'20px',
                  padding:'25px',
                  fontWeight: "normal",
                }}
              >
                Visit Playground
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
