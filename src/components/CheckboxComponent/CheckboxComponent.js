import React from 'react';
import "./CheckboxComponent.css"

function CheckboxComponent({ list, onChange }) {
    return (
        <>
            {list.map(option => (
                <div className='form-check' key={option.id}>
                    <input className='form-check-input' type='checkbox' id={option.id} checked={option.isChecked} onChange={e => {onChange(option.id, e.target.checked)}} />
                    {/* <input className='form-check-input' type='checkbox' name='reasons' id={option.id} value={option.id} checked={option.isChecked} onChange={(e) => onChange(e, option)} /> */}
                    <label className='form-check-label' htmlFor={option.id}>
                        {option.name}
                    </label>
                </div>
            ))}
        </>
    );
}

export default CheckboxComponent;