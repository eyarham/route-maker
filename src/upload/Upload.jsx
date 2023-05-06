import { parse } from 'papaparse';
import React, { useContext } from 'react';
import { UploadedDataContext } from '../results/UploadedDataContextProvider';

const Upload = () => {
    const { setUploadedData } = useContext(UploadedDataContext);

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
            <div></div>
            <div>you can drag and drop your file to the button below</div>
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