"use client";

import React, { useState } from "react";
import HeaderComponent from "../components/header/Header";
import { Button, Form, Dropdown, Modal, Select, Space, Table, message, Input, MenuProps, Pagination, Tooltip } from 'antd';
import { IoSearchSharp } from "react-icons/io5";
import CustomIconRenderer from "../components/ui/CustomIconRenderer";
import * as ReactIcons from 'react-icons/io';
import DownloadManager from "../manager/DownloadManager";
import { postPayloadData } from "../server/APICalls";
import { FaListUl } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaRegClone } from "react-icons/fa";



const SelectOptions: any = [
    {
        parameterName: "Aircraft Type",
        searchQueries: ["airplane", "air", "aircraft type"],
        category: "airline",
        subCategory: "aircraftType",
        description: "Returns a random aircraft type.",
        icon: <ReactIcons.IoIosAirplane className='bg-gray-200 p-2 rounded-full text-4xl text-gray-700' />
    },
    {
        parameterName: "Air Line",
        searchQueries: ["airplane", "air", "aircraft line"],
        category: "airline",
        subCategory: "airline",
        description: "Generates a random airline",
        icon: <ReactIcons.IoMdAirplane className='bg-gray-200 p-2 rounded-full text-4xl text-gray-700' />
    }
]

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

    // search parameter
    const [searchValue, setSearchValue] = useState<string>("");

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


    // selected parametrs
    const [selectedParameters, setSelectedParameters] = useState<Array<any>>([]);
    console.log("SelectedParameters", selectedParameters)
    const [form] = Form.useForm();

    const handleDeleteColumn = (item: any) => {
        let res = columnsData.filter((fitem: any) => fitem.id != item.id);
        setColumnsData(res);
    }

    const handleEditColumn = (data: any) => {
        setSelectedColumnEdit(data);
        form.setFieldsValue(data);
        setIsACMOpen(true);
    }

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

    const items: any = [
        {
            key: 'csv',
            label: 'CSV File',
        },
        {
            key: 'xlsx',
            label: 'XLSX File',
        },
        {
            key: 'json',
            label: 'JSON File',
        },
        {
            key: 'xml',
            label: 'XML File',
        },
        {
            key: 'yaml',
            label: 'YAML File',
        },
        {
            key: 'sql',
            label: 'SQL File',
        }
    ];



    const onMenuClick: MenuProps['onClick'] = async (e: any) => {
        let sg = await startGenerating();
        if (sg.success) {
            if (e.key == "csv") {
                DownloadManager.saveAsCSV(sg, 'hello')
                // } else if (e.key == "xlsx") {
                //     downloadAsExcel(sg)
                // } else if (e.key == "json") {
                //     downloadAsJSON(sg)
                // } else if (e.key == "xml") {
                //     downloadAsXML(sg)
                // } else if (e.key == "sql") {
                //     downloadAsSQL(sg)
                // } else if (e.key == "yaml") {
                //     downloadAsYAML(sg)
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

    const hasSearch = (data: any) => {
        if (searchValue.length == 0) {
            return data;
        } else {
            return data.filter((item: any) => {
                return item.searchQueries.map((item: string) => item.toLowerCase()).includes(searchValue.replaceAll(" ", "").toLowerCase())
            })
        }
    }

    const handleParameterClick = (item: any) => {
        setSelectedParameters((c) => ([...c, item]))
    }


    return (
        <div className="overflow-auto">
            <HeaderComponent />
            <div style={{ marginTop: "-15px", borderRadius: "10px", width: "calc(100vw - 40px)", backgroundColor: "white", height: 'calc(100vh - 100px)', margin: '0 auto' }}>
                <div className="flex gap-2 h-full">
                    <div style={{ width: '70%', height: '100%', backgroundColor: "white", overflowY: 'auto', overflowX: 'hidden' }}>
                        {
                            selectedParameters.length == 0 ?
                                <div className="flex items-center justify-center mt-52">
                                    <div className="text-center">
                                        <FaListUl class='text-gray-400 text-4xl mx-auto' />
                                        <p className='text-gray-450 mt-3'>Select the required items from the Select Parameters Section to get started.</p>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="flex ml-5 mt-3 sticky">
                                        <div>
                                            <p>Selected Parameters</p>
                                        </div>
                                        <div className="ml-auto">
                                            <div className="flex gap-5">
                                                <Input
                                                    placeholder="Count"
                                                    maxLength={6}
                                                    prefix="Count: "
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    onChange={(ev: any) => {
                                                        setCount(isNaN(parseInt(ev.target.value)) ? null : parseInt(ev.target.value))
                                                    }}
                                                    style={{ width: '130px' }}
                                                    value={count}
                                                />
                                                <Dropdown.Button
                                                    type="default"
                                                    loading={false}
                                                    style={{ width:'170px' }}
                                                    menu={{ items }}
                                                    onClick={() => console.log("hello")}
                                                >
                                                    Download As
                                                </Dropdown.Button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="mt-2" />
                                    <div className="grid grid-cols-3 p-5 gap-5">
                                        {
                                            selectedParameters.map((item: any, j: any) => {
                                                return (
                                                    <div  key={j} className="bg-gray-50 hover:bg-violet-50 p-2 rounded-lg">
                                                        <div className="flex gap-2 items-center cursor-pointer">
                                                            <div>
                                                                {item.icon}
                                                            </div>
                                                            <div>
                                                                <div className="w-full flex items-center justify-between ml-2">
                                                                    <p className="text-base text-gray-800">{item.parameterName}</p>
                                                                </div>
                                                                <p className="text-sm text-gray-600 ml-2">{item.description}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex mt-2 ml-9">
                                                            <Button type="text" icon={<FaRegClone className="text-sm" />}>Clone</Button>
                                                            <Button type="text" icon={<MdDelete className="text-sm" />}>Delete</Button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                        }
                    </div>
                    <div style={{ width: '1px', height: '100%', backgroundColor: "#E6E6E6" }}></div>
                    <div style={{ width: '30%', height: '100%' }}>
                        <div className="m-2 flex flex-col gap-2">
                            <p>Select any Parameter</p>
                            <Input value={searchValue} onChange={(value) => setSearchValue(value.target.value)} placeholder="Search Parameters" prefix={<IoSearchSharp />} />
                        </div>
                        <div className="m-2 flex flex-col gap-2 h-5/6 overflow-y-auto overflow-x-hidden">
                            {
                                SelectOptions.map((item: any, j: number) => {
                                    return (
                                        <div key={j} onClick={() => handleParameterClick(item)}>
                                            <div className="flex gap-2 items-center cursor-pointer hover:bg-violet-50 p-2 rounded-lg">
                                                <div>
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <p className="text-base text-gray-800">{item.parameterName}</p>
                                                    <p className="text-sm text-gray-600">{item.description}</p>
                                                </div>
                                            </div>
                                            <hr className="mt-1.5" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaygroundPageV2;
