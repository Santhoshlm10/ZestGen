import * as XLSX from 'xlsx';
import { json2xml } from 'xml-js';
import yaml from 'js-yaml';

class DownloadManagerClass {

    saveAsExcel(data:Array<any>,filename:string){
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${filename}.xlsx`);
    }

    saveAsCSV(data:any,fileName:string){
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
        link.setAttribute('download', `${fileName}.csv`);
        document.body.appendChild(link);
        link.click();
    }

    saveAsJSON(data:any,fileName:string){
        const jsonContent = JSON.stringify(data.data, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    saveAsXML(data:any,fileName:string){
        const json = JSON.stringify(data.data);
        const xml = json2xml(json, { compact: true, spaces: 4 });
        const blob = new Blob([xml], { type: 'application/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.xml`
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    saveAsSQLInsert(data:any,fileName:string){
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
        link.download = `${fileName}.sql`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    saveAsYAML(data:any,fileName:string){
        const yamlData = yaml.dump(data.data);
        const blob = new Blob([yamlData], { type: 'application/yaml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'download.yaml';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

let DownloadManager = new DownloadManagerClass()
export default DownloadManager;