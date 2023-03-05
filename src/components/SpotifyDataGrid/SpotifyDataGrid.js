import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'react-data-grid/lib/styles.css';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import './SpotifyDataGrid.css';

const SpotifyDataGrid = ({ gridData }) => {

    const [rowData, setRowData] = useState(gridData); // Set rowData to Array of Objects, one Object per Row
    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Name', field: 'name' },
        { headerName: 'Album', field: 'album' },
        { headerName: 'Artist', field: 'artist' },
        { headerName: 'Tempo', field: 'tempo'}
    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true, 
        resizable: true,
        suppressSizeToFit: true,
    }));

    const navigate = useNavigate();

    const handleReturnButtonClick = (e) => {
        e.preventDefault();
        navigate('/spotify_albums');
    }

    const gridOptions = {
        defaultColDef: defaultColDef,
        columnDefs: columnDefs,
        pagination: true,
        paginationPageSize: 100,
        rowSelection: 'multiple',
        onGridReady: (params) => {
            params.api.sizeColumnsToFit();
        },
    };

    return (
        <div className='container ag-theme-alpine'>
            <button onClick={handleReturnButtonClick}> Return to Collection </button>
            <AgGridReact gridOptions={gridOptions} rowData={rowData} />
        </div>
    );
};

export default SpotifyDataGrid;