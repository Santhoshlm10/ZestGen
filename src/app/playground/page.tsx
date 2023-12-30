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

function PlaygroundPage() {
  const [count, setCount] = useState<number>(0);


  const downloadCSVFile = ({ data, fileName, fileType }:any) => {
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

  const exportToJson = (data:any) => {
    downloadCSVFile({
      data: JSON.stringify(data),
      fileName: 'users.csv',
      fileType: 'text/csv',
    })
  }

  const downloadFile = async () => {

    let temp = []
    for (let index = 0; index < count; index++) {
      console.log(temp);
      temp.push({name:faker.animal.cat()})
    }
    exportToJson(temp)
  }
  return (
    <div>
      <NumberInput>
        <NumberInputField
          value={count}
          onChange={(e:any) => setCount(parseInt(e.target.value))}
        />
      </NumberInput>
      <Button onClick={downloadFile}>Download</Button>
      {/* <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer> */}
    </div>
  );
}

export default PlaygroundPage;
