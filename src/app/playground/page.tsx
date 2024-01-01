"use client";

import React, { SyntheticEvent, useCallback, useMemo, useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { CSVLink } from "react-csv";
import HeaderComponent from "../components/header/Header";
import type { ColumnsType } from 'antd/es/table';
import { Button, Checkbox, Form, Input, Modal, Select, Space, Table, message } from 'antd';
import { moduleOptions } from "../options/Module";
import { getSubmoduleByModule } from "../options/SubModule";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { MdGeneratingTokens } from "react-icons/md";

const { Search } = Input;



interface IColumnProps {
  key: number;
  columnName: string;
  moduleName: string;
  subModuleName: string;
}
function PlaygroundPage() {

  const [columnsData, setColumnsData] = useState<IColumnProps[]>([]);
  console.log("columnsData", columnsData)
  const [isACMOpen, setIsACMOpen] = useState<boolean>(false);
  const [selectedModule, setSelectedModule] = useState<string>("");

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  console.log("dataCount", count)

  //selected column for edit
  const [selectedColumnEdit, setSelectedColumnEdit] = useState<any>({});

  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

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

  const postPayloadData = async (data:any) => {
    let res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let res1 = await res.json()
    setIsGenerating(false);
    // setData(res1.data)
  }

  const handleDeleteColumn = (item: any) => {
    let res = columnsData.filter((fitem: any) => fitem.id != item.id);
    setColumnsData(res);
  }

  const handleEditColumn = (data: any) => {
    setSelectedColumnEdit(data);
    form.setFieldsValue(data);
    setIsACMOpen(true);
  }

  const columnsView = [
    {
      title: 'Column Name',
      dataIndex: 'columnName',
      key: 'columnName',
      render: (text: string) => <b>{text}</b>,
    },
    {
      title: 'Module Name',
      dataIndex: 'moduleName',
      key: 'moduleName',
    },
    {
      title: 'Submodule Name',
      dataIndex: 'submoduleName',
      key: 'submoduleName',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: 100,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="text" icon={<MdEdit />} onClick={() => handleEditColumn(record)}>
            Edit
          </Button>
          <Button type="text" icon={<MdDelete />} onClick={() => handleDeleteColumn(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  const launchACModal = () => {
    setSelectedColumnEdit({});
    setIsACMOpen(true);
  }
  const handleACModalSubmit = (data: any) => {
    console.log("data1", data)
    if (Object.keys(selectedColumnEdit).length == 0) {
      let tmp = { ...data, ...{ id: Date.now() } }
      setColumnsData(prevColumnsData => [...prevColumnsData, tmp]);
    } else {
      let temp = columnsData.map((item: any) => {
        if (item.id == data.id) {
          return data;
        } else {
          return item;
        }
      })
      setColumnsData(temp);
    }
    form.resetFields();
    setIsACMOpen(false);
  }
  const handleACModalClose = () => {
    setIsACMOpen(false);
    form.resetFields();
  }

  const filterModule = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const filterSubModule = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const startGenerating = () => {
    if (count <= 0) {
      messageApi.open({
        type: 'error',
        content: 'Count must be greater than zero',
      });
    } else {
      setIsGenerating(true);
      let obj = columnsData.map((item:any) => {
        let k:any  = {}
        k[item.columnName] = "framer" + "." + item["moduleName"] +"."+item["submoduleName"]
        return k;
      })
      let payloadObj = {data:obj,count}
      postPayloadData(payloadObj)
    }
  }
  return (
    <div>
      {contextHolder}
      <HeaderComponent />
      <div>
        <center>
          <p className="text-xl">Welome to </p>
          <p className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-violet-800 from-sky-400">Zestgen Playground</p>

          <p className="text-lg m-10">Click on the Add Column button below to get Started.</p>

        </center>
      </div>
      <div className="pl-20 pr-20">
        {
          columnsData.length != 0 &&
          <>
            <Table
              pagination={false}
              columns={columnsView}
              dataSource={columnsData} />
          </>
        }
      </div>
      <div className="flex mt-3 pb-10 gap-5 pl-20 pr-20 justify-between items-center">
        <div>
          {
            columnsData.length != 0 &&
            <p className="text-sm">Total Columns: {columnsData.length}</p>
          }
        </div>
        <div>
          <Button
            style={{ backgroundColor: '#8764b8' }}
            type="primary" onClick={launchACModal}>Add Column</Button>
        </div>
        <div>
          {
            columnsData.length != 0 &&
            <div>
              <Input
                placeholder="Count" style={{ width: '200px' }}
                maxLength={5}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                  }
              }}
                inputMode="numeric"
                onChange={(ev: any) => {
                  setCount(parseInt(ev.target.value))
                }}
                value={count}
                suffix={<Button
                  type="primary"
                  onClick={startGenerating}
                  style={{ backgroundColor: '#8764b8' }}
                  loading={isGenerating}
                >Generate</Button>} />
            </div>
          }
        </div>
      </div>
      <Modal
        title={Object.keys(selectedColumnEdit).length == 0 ? "Add Column" : "Edit Column"}
        open={isACMOpen}
        onCancel={handleACModalClose}
        footer={null}
      >
        <Form
          name="colForm"
          form={form}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={handleACModalSubmit}
          onFinishFailed={() => console.log("form validation failed")}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Column Name"
            name="columnName"
            rules={[{ required: true, message: 'Column name is required!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Module Name"
            name="moduleName"
            rules={[{ required: true, message: 'Module name is required!' }]}
          >
            <Select
              showSearch
              placeholder="Select Module"
              onChange={(value) => setSelectedModule(value)}
              optionFilterProp="children"
              options={moduleOptions()}
              filterOption={filterModule}
            />
          </Form.Item>
          <Form.Item
            label="Submodule Name"
            name="submoduleName"
            rules={[{ required: true, message: 'Submodule name is required!' }]}
          >
            <Select
              showSearch
              placeholder="Select Submodule"
              optionFilterProp="children"
              options={getSubmoduleByModule(selectedModule)}
              filterOption={filterSubModule}
            />
          </Form.Item>
          <Form.Item
            label="ID"
            name="id"
            hidden={true}
          >
          </Form.Item>
          <Space>
            <Button style={{ backgroundColor: '#8764b8' }} key="submit" htmlType="submit" type="primary">
              Submit
            </Button>
            <Button key="close" type="default" onClick={handleACModalClose}>
              Close
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
}

export default PlaygroundPage;
