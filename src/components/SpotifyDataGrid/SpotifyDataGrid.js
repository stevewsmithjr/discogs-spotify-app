import React, { useState, useMemo, useRef, useCallback } from 'react';
import AudioRenderer from '../AudioRenderer/AudioRenderer';
import { useNavigate } from 'react-router-dom';
import { AgGridReact, agRenderCheckbox } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import './SpotifyDataGrid.css';

const SpotifyDataGrid = ({ gridData }) => {

    const gridApiRef = useRef(null);
    const [rowData, setRowData] = useState(gridData); // Set rowData to Array of Objects, one Object per Row
    const [columnDefs, setColumnDefs] = useState([
        { headerName: '✓', field: 'selected', width: '50px', checkboxSelection: true, cellRenderer: 'agRenderCheckbox' },
        { headerName: 'Name', field: 'name' },
        { headerName: 'Preview', field: 'preview_url', cellRenderer: 'audioRenderer' },
        { headerName: 'Album', field: 'album' },
        { headerName: 'Artist', field: 'artist' },
        { headerName: 'Tempo', field: 'tempo' },
    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true,
        
    }));

    const navigate = useNavigate();

    // const onSelectionChanged = () => {
    //     const selectedNodes = gridApi.getSelectedNodes();
    //     const selectedData = selectedNodes.map((node) => node.data);
    //     console.log(selectedData);
    // };

    const handleReturnButtonClick = (e) => {
        e.preventDefault();
        navigate('/spotify_albums');
    }
    const onGridReady = (params) => {
        console.log(params.columnApi);
        console.log(params.current);
        console.log(params.gridApi);
        console.log(gridApiRef);
        params.api.sizeColumnsToFit();
        console.log("grid ready invoked");
    }

    const gridOptions = {
        defaultColDef: defaultColDef,
        columnDefs: columnDefs,
        pagination: true,
        paginationPageSize: 100,
        rowSelection: 'checkbox',
        suppressRowClickSelection: true
        //onSelectionChanged: onSelectionChanged,
    };
    const components = {
        audioRenderer: AudioRenderer,
    };

    return (
        <div className='container ag-theme-alpine'>
            <button onClick={handleReturnButtonClick}> Return to Collection </button>
            <button onClick={() => console.log(rowData)}> print row data </button>
            <AgGridReact gridOptions={gridOptions} onGridReady={onGridReady} components={components} rowData={rowData} />
        </div>
    );
};

export default SpotifyDataGrid;