"use client";

import React, { SyntheticEvent, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Button,
} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { CSVLink } from "react-csv";
import HeaderComponent from "../components/header/Header";

function PlaygroundPage() {
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<any>([]);


  const downloadCSVFile = ({ data, fileName, fileType }: any) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType })
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

  const exportToJson = (data: any) => {
    downloadCSVFile({
      data: JSON.stringify(data),
      fileName: 'users.csv',
      fileType: 'text/csv',
    })
  }

  const handleDownload = async () => {
    let res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({})
    })
    let res1 = await res.json()
    setData(res1.data)
  }
  return (
    <div>
      <HeaderComponent />
      <div>
        <p>Welome to </p>
        <p>Zestgen Playground</p>
      </div>
      <div>
        <p>Click on Add Colum button below to get started</p>
      </div>


      <div>
      </div>

      <div>
        <Button onClick={handleDownload}>Hello World</Button>
      </div>

      <CSVLink data={data}>
        Download me
      </CSVLink>;

    </div>
  );
}

export default PlaygroundPage;
