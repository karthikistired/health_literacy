import React, { useState } from 'react';
import './DynamicTable.css'; // Example CSS for styling
import { Table } from 'react-bootstrap';

export default function DynamicTable ({handleSave,TableData,setCsvContent,csvContent}) {
  const initialTableData = [[{ value: 'A1', rowspan: 1, colspan: 1 }]];

  const [tableData, setTableData] = useState(initialTableData);

  const addRow = () => {
    const newRow = Array(tableData[0].length).fill({ value: '', rowspan: 1, colspan: 1 });
    setTableData([...tableData, newRow]);
  };

  const handleInputChange = (e, rowIndex, fieldName) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][fieldName] = e.target.value;
    setTableData(updatedData);
  };


  const addColumn = () => {
    const updatedTableData = tableData.map(row => [...row, { value: '', rowspan: 1, colspan: 1 }]);
    setTableData(updatedTableData);
  };


  const handleSaveHere=()=>
    {
        tableData.map((row,i) => {if(row.length>=0){
            csvContent.str[i]= row.map(data =>`${data.value}`).join(',')
          }else return ""}).join('\n');
        // setCsvContent(csvContent);
        
        console.log(csvContent);
        handleSave();
    }
;
  const mergeCells = () => {
    const updatedTableData = [...tableData];
    const selectedCells = [{ row: 0, col: 0 }, { row: 1, col: 0 }]; 

    if (selectedCells.length > 1) {
      const firstCell = selectedCells[0];
      const rowspan = selectedCells.length;

      updatedTableData[firstCell.row][firstCell.col] = {
        ...updatedTableData[firstCell.row][firstCell.col],
        rowspan,
      };

      for (let i = 1; i < selectedCells.length; i++) {
        const cell = selectedCells[i];
        updatedTableData[cell.row][cell.col] = null;
      }
    }

    setTableData(updatedTableData);
  };

  return (
    <div className='dynamic-table'>
      <button onClick={addRow}>Add Row</button>
      <button onClick={addColumn}>Add Column</button>
      <button onClick={mergeCells}>Merge Cells</button>
      <table className="dynamic-table">
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                if (!cell) return null; // Skip merged cells
                const { value, rowspan, colspan } = cell;
                return (
                  <td key={colIndex} rowSpan={rowspan} colSpan={colspan}>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => {
                        const updatedTableData = [...tableData];
                        updatedTableData[rowIndex][colIndex].value = e.target.value;
                        setTableData(updatedTableData);
                        
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSaveHere}>Save</button>
    </div>
  );
};