import { parse } from 'papaparse';
import React, { useContext } from 'react';
import { CSVLink } from 'react-csv';
import { getSampleDocument, getSampleDocumentNoCoords, getTemplate } from '../home/testData';
import { UploadedDataContext } from '../results/UploadedDataContextProvider';

const Upload = () => {
    const { setUploadedData } = useContext(UploadedDataContext);
    const templateData = getTemplate();
    const sampleData = getSampleDocument();
    const sampleDataNoCoor = getSampleDocumentNoCoords();

    const handleChange = e => {
        const file = e.target.files[0]
        parse(file, {
            complete: updateData,
            header: true
        });
    }
    const updateData = result => {
        const resultsWithId = result.data.map(d => {
            d.id = crypto.randomUUID(); return d;
        })
        setUploadedData(resultsWithId);
    }
    return (
        <div>
            <div><CSVLink data={templateData} filename={"template.csv"}>Download Template</CSVLink></div>
            <div><CSVLink data={sampleData} filename={"sample.csv"}>Download Sample Doc</CSVLink></div>
            <div><CSVLink data={sampleDataNoCoor} filename={"sampleNoCoor.csv"}>Download Sample Doc No Coords</CSVLink></div>

            <input
                className="csv-input"
                type="file"
                name="file"
                placeholder={null}
                onChange={handleChange}
            />
        </div>
    )
}

export default Upload