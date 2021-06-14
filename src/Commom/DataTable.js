import React, { useEffect, useState } from 'react';
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import 'react-table-hoc-fixed-columns/lib/styles.css' 
/*
David Note: please instal this package: npm install react-table-hoc-fixed-columns --save
*/
const DataTableComp = ({
    data = () => { },
    columns = () => { },
    IsLoad = false,
    sizePage = 10
}) => {

    const ReactTableFixedColumns = withFixedColumns(ReactTable);

    useEffect(() => {
       
    }, []);
    
    return (
        <ReactTableFixedColumns
            data={data}
            columns={columns}
            defaultPageSize={sizePage}
            className="-striped -highlight"
            // SubComponent={row => {
            //     return(
            //         <input type="button" value="Edit"/>
            //     )
            //     }} 
            filterable={true}           
        />

    )
}


export const DataTable = React.memo(DataTableComp)