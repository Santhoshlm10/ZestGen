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
            <span className="text-2xl font-bold">Zestgen</span>
          </div>
          <div className="flex items-center gap-5">
            <Button className="text-white bg-violet-500">About</Button>
            <Button className="text-white bg-violet-500">
              <span className="">
              <FaGithub/>
              <span>Github</span>
              </span>
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
            <p>
              Explore endless creativity at ZestGen virtual playground! Dive
              into a world of randomized values, perfect for developers craving
              unpredictability or data enthusiasts seeking diversity. Join us to
              sculpt, experiment, and bring your datasets to life! 🚀✨{" "}
            </p>
          </div>
          <br />
          <div>
            <Link href="/playground">
              <Button
                style={{
                  backgroundColor: "#664b8c",
                  color: "white",
                  margin: "10px",
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
