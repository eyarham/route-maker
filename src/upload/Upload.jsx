import React from 'react';
import { CSVLink } from 'react-csv';
import { getSampleDocument, getSampleDocumentNoCoords, getTemplate } from '../home/testData';

const Upload = ({ onChange }) => {
    const templateData = getTemplate();
    const sampleData = getSampleDocument();
    const sampleDataNoCoor = getSampleDocumentNoCoords();

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
                onChange={onChange}
            />
        </div>
    )
}

export default Upload