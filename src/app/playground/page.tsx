"use client";

import React, { useState } from "react";
import HeaderComponent from "../components/header/Header";
import type { ColumnsType } from 'antd/es/table';
import { Button, Checkbox, Form, Dropdown, Modal, Select, Space, Table, message, Input, MenuProps } from 'antd';
import { moduleOptions } from "../options/Module";
import { getSubmoduleByModule } from "../options/SubModule";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";


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
  const [count, setCount] = useState<any>(0);
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

  const postPayloadData = async (data: any) => {
    let res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let genRes = await res.json()
    setIsGenerating(false);
    return genRes
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

  const startGenerating = async () => {
    if (count <= 0) {
      messageApi.open({
        type: 'error',
        content: 'Count must be greater than zero',
      });
    } else {
      setIsGenerating(true);
      let k: any = {}
      columnsData.map((item: any) => {
        k[item.columnName] = "faker" + "." + item["moduleName"] + "." + item["submoduleName"]
      })
      let payloadObj = { data: k, count }
      return await postPayloadData(payloadObj)
    }
  }

  const items = [
    {
      key: 'csv',
      label: 'Save as CSV',
    },
    {
      key: 'xlsx',
      label: 'Save as XLSX',
    },
    {
      key: 'json',
      label: 'Save as JSON',
    }
  ];

  const downloadAsCSV = (data: any) => {
    const columns = Object.keys(data.data[0]);
    const sanitizeValue = (value: any) => {
      if (typeof value === 'string' && value.includes(',')) {
        return `"${value}"`;
      }
      return value;
    };
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      columns.map(sanitizeValue).join(',') +
      '\n' +
      data.data.map((row: any) => columns.map(col => sanitizeValue(row[col])).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'download.csv');
    document.body.appendChild(link);
    link.click();
  }

  const downloadAsExcel = (data: any) => {

  }

  const downloadAsJSON = (data: any) => {
    const jsonContent = JSON.stringify(data.data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'download.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const onMenuClick: MenuProps['onClick'] = async (e: any) => {
    let sg = await startGenerating();
    if(sg.success){
      if (e.key == "csv") {
        downloadAsCSV(sg);
      } else if (e.key == "xlsx") {
        downloadAsExcel(sg)
      } else if (e.key == "json") {
        downloadAsJSON(sg)
      }
    }
  };
  return (
    <div>
      {contextHolder}
      <HeaderComponent />
      <div>
        <center>
          <p className="text-xl">Welome to </p>
          <p className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-violet-800 from-sky-400">Zestgen Playground</p>
          <p className="text-sm m-10">Click on the Add Column button below to get Started.Then Choose Actions at bottom right to download generated data.</p>
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
            <div className="flex items-center gap-1">
              <div>
                <Input
                  placeholder="Count" style={{ width: '120px' }}
                  maxLength={5}
                  prefix="Count: "
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  inputMode="numeric"
                  onChange={(ev: any) => {
                    setCount(isNaN(parseInt(ev.target.value)) ? null : parseInt(ev.target.value))
                  }}
                  value={count}
                />
              </div>
              <div>
                <Dropdown.Button loading={isGenerating} menu={{ items, onClick: onMenuClick }}>Actions</Dropdown.Button>
              </div>
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
