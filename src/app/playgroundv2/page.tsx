"use client";

import React, { useState } from "react";
import HeaderComponent from "../components/header/Header";
import { Button, Form, Dropdown, Modal, Select, Space, Table, message, Input, MenuProps, Pagination } from 'antd';
import { moduleOptions } from "../options/Module";
import { getSubmoduleByModule } from "../options/SubModule";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { json2xml } from "xml-js";
import * as XLSX from 'xlsx';
import yaml from 'js-yaml';
import { IoSearchSharp } from "react-icons/io5";
import { GrSelect } from "react-icons/gr";
import CustomIconRenderer from "../components/ui/CustomIconRenderer";
import { GrUserWorker } from "react-icons/gr";

interface IColumnProps {
    key: number;
    columnName: string;
    moduleName: string;
    subModuleName: string;
}
interface IPreviewData {
    modal: boolean;
    data: any
}
function PlaygroundPageV2() {

    const [columnsData, setColumnsData] = useState<IColumnProps[]>([]);
    const [isACMOpen, setIsACMOpen] = useState<boolean>(false);
    const [selectedModule, setSelectedModule] = useState<string>("");

    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [count, setCount] = useState<any>(0);
    const [preViewModalOpen, setPreviewModalOpen] = useState<IPreviewData>({
        data: [],
        modal: false
    });

    //selected column for edit
    const [selectedColumnEdit, setSelectedColumnEdit] = useState<any>({});
    const [currentPage, setCurrentPage] = useState(1);

    const [form] = Form.useForm();

    const downloadCSVFile = ({ data, fileName, fileType }: any) => {
        const blob = new Blob([data], { type: fileType })
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
            alert('Count must be greater than zero',
            );
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
            key: 'preview',
            label: 'Show Preview',
        },
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
        },
        {
            key: 'xml',
            label: 'Save as XML',
        },
        {
            key: 'yaml',
            label: 'Save as YAML',
        },
        {
            key: 'sql',
            label: 'Save as SQL (Insert)',
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

    const downloadAsExcel = ({ data }: any) => {

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `download.xlsx`);

    }

    const downloadAsXML = (data: any) => {
        const json = JSON.stringify(data.data);
        const xml = json2xml(json, { compact: true, spaces: 4 });
        const blob = new Blob([xml], { type: 'application/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'download.xml';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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

    const downloadAsSQL = ({ data }: any) => {
        const getColumns = (data: any) => {
            let col0 = Object.keys(data[0])
            return col0.join()
        }
        function getValues(data: any) {
            let res1 = '';
            data.forEach((item: any, j: number) => {
                let value = '("' + Object.values(item).join('","') + '")';
                res1 += value + (j + 1 == data.length ? ';' : ',');
            });
            return res1;
        }
        let res_data = `INSERT into TABLE_NAME (${getColumns(data)}) VALUES ${getValues(data)}`;
        const blob = new Blob([res_data], { type: 'application/sql' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'download.sql';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const downloadAsYAML = (data: any) => {
        const yamlData = yaml.dump(data.data);
        const blob = new Blob([yamlData], { type: 'application/yaml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'download.yaml';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const onMenuClick: MenuProps['onClick'] = async (e: any) => {
        let sg = await startGenerating();
        if (sg.success) {
            if (e.key == "csv") {
                downloadAsCSV(sg);
            } else if (e.key == "xlsx") {
                downloadAsExcel(sg)
            } else if (e.key == "json") {
                downloadAsJSON(sg)
            } else if (e.key == "xml") {
                downloadAsXML(sg)
            } else if (e.key == "sql") {
                downloadAsSQL(sg)
            } else if (e.key == "yaml") {
                downloadAsYAML(sg)
            }
            else if (e.key == 'preview') {
                setPreviewModalOpen({
                    modal: true,
                    data: sg.data
                })
            }
        }
    };

    const onPageChange = (page: any) => {
        setCurrentPage(page);
    };


    return (
        <div>
            <HeaderComponent />
            <div style={{ marginTop: "-15px", borderRadius: "10px", width: "calc(100vw - 40px)", backgroundColor: "white", height: 'calc(100vh - 100px)', margin: '0 auto' }}>
                <div className="flex gap-2 h-full">
                    <div style={{ width: '70%', height: '100%', backgroundColor: "white" }}>
                        <div className="flex items-center justify-center h-screen">
                            <div className="text-center">
                                <GrSelect class='text-gray-400 text-4xl mx-auto' />
                                <p className='text-gray-450'>Select the required items from the Select Parameters Section to get started.</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '1px', height: '100%', backgroundColor: "#E6E6E6" }}></div>
                    <div style={{ width: '30%', height: '100%' }}>
                        <div className="m-2 flex flex-col gap-2">
                            <p>Search Parameters</p>
                            <Input placeholder="Search Parameters" prefix={<IoSearchSharp />} />
                        </div>
                        <div>
                            <CustomIconRenderer content="He"/> 
                            <GrUserWorker className='bg-gray-200 p-2 rounded-full text-4xl text-gray-700'/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaygroundPageV2;
