import React, { useState } from 'react';
import "./surveyType.css"

function MultiSelectDropdown() {
    const options = ['SILS', 'HELMA', 'BRIEF', 'OHLI']; // Options for the dropdown
    const [selectedOptions, setSelectedOptions] = useState([]); // State to store selected options

    // Function to handle selection/deselection of options
    const handleOptionToggle = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedOptions(selectedValues);
        console.log(selectedValues);
    };

    return (
        <div className='headText'>
            Select the Type of Survey
                            <span style={{fontSize:"11px"}}>For selecting multiple hold Ctrl/cmd</span>
                            
        <div className="multi-select-dropdown">
            <select
                multiple  // This attribute enables multiple selection
                value={selectedOptions}
                onChange={handleOptionToggle}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <div className="selected-options">
                <p>Selected Options:</p>
                <ul>
                    {selectedOptions.map((option) => (
                        <li key={option}>{option}</li>
                    ))}
                </ul>
            </div>
        </div>
        </div>
    );
}

export default MultiSelectDropdown;
