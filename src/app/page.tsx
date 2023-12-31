"use client";

import { Button, Heading } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { Card, CardHeader, CardBody, CardFooter, Text } from '@chakra-ui/react';
import { GoVersions } from "react-icons/go";
import { RiFileExcel2Line } from "react-icons/ri";
import { BsFiletypeCsv } from "react-icons/bs";
import { LuFileJson } from "react-icons/lu";
import { SiMysql } from "react-icons/si";
import { TbFileTypeXml } from "react-icons/tb";
import { CiServer } from "react-icons/ci";
import HeaderComponent from "./components/header/Header";

export default function Home() {
  return (
    <main>
      <HeaderComponent />
      <div>
        <div className="p-20">
          <p className="text-center mb-4 text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-800 from-sky-400">
              The Dynamic Data Playground for Creative Minds
            </span>
          </p>
          <div>
            <p className="text-center p-3 text-xl">

              Discover limitless creativity at {"Zestgen's"} virtual playground! Ideal for developers and data enthusiasts, explore randomized values to sculpt and bring datasets to life! 🚀✨
            </p>
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Link href="/playground">
              <Button
                style={{
                  backgroundColor: "#8764b8",
                  color: "white",
                  margin: "10px",
                  fontSize: '20px',
                  padding: '25px',
                  fontWeight: "normal",
                }}
              >
                Visit Playground
              </Button>
            </Link>
          </div>
          <p className="text-center mt-8">Supported Formats</p>
        </div>
      </div>
      <div className="pl-14 pr-14">
        <div className="grid gap-10 grid-cols-3">
          <div>
            <Card>
              <CardHeader>
                <Heading size='sm' className="flex gap-2 items-center"><RiFileExcel2Line />Excel</Heading>
              </CardHeader>

              <CardBody>
                <Text className="text-sm">Generate random values and seamlessly export them to an Excel spreadsheet for organized and tabular data representation. Ideal for users who prefer working with Microsoft Excel.</Text>
              </CardBody>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <Heading size='sm' className="flex gap-2 items-center"><BsFiletypeCsv />CSV</Heading>
              </CardHeader>

              <CardBody>
                <Text className="text-sm">Save random values in a CSV format, a widely supported text-based format. This allows easy import into various data analysis tools and database systems, ensuring compatibility and flexibility.</Text>
              </CardBody>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <Heading size='sm' className="flex gap-2 items-center"><LuFileJson />JSON</Heading>
              </CardHeader>

              <CardBody>
                <Text className="text-sm">Store random values in JSON format, a lightweight and human-readable data interchange format. JSON is commonly used for data exchange between web services and can be easily parsed by many programming languages.</Text>
              </CardBody>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <Heading size='sm' className="flex gap-2 items-center"><SiMysql />SQL</Heading>
              </CardHeader>

              <CardBody>
                <Text className="text-sm">Save random values directly as SQL statements, facilitating easy integration with relational databases. This option allows users to insert the generated data into a database or use it for testing SQL queries.</Text>
              </CardBody>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <Heading size='sm' className="flex gap-2 items-center"><TbFileTypeXml />XML</Heading>
              </CardHeader>

              <CardBody>
                <Text className="text-sm">Export random values in XML, a versatile markup language suitable for both human-readable and machine-readable data. XML is commonly used for configuration files, data interchange between different platforms, and web services</Text>
              </CardBody>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <Heading size='sm' className="flex gap-2 items-center"><CiServer />HTTP</Heading>
              </CardHeader>

              <CardBody>
                <Text className="text-sm">Obtain random values as an HTTP response, allowing seamless integration with web applications. Users can make API requests to your website and receive the generated data in real-time, enabling dynamic and interactive applications.</Text>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-10 w-auto h-16 bg-gray-200">
        <p className="text-center p-4">Unleash randomness, export possibilities<span className="text-xl">🪐</span></p>
      </div>
    </main>
  );
}
