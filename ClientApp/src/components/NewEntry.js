import React, { useEffect } from 'react';

export const NewEntry = ({ entryDate, setEntryDate, weight, setWeight, description, setDescription, onSave }) => {
  useEffect(() => {
    const today = new Date();
    const localDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    setEntryDate(localDate);
  }, [setEntryDate]);

  const onEntryDateChange = e => {
    setEntryDate(e.target.value);
  }

  const onWeightChange = e => {
    setWeight(e.target.value);
  }

  const onDescriptionChange = e => {
    setDescription(e.target.value);
  }

  return (
  <form onSubmit={onSave}>
    <div className='create-entry'>
      <div>
        <label htmlFor='txtEntryDate'>Date</label>
      </div>
      <div>
        <input type='date' id='txtEntryDate' value={entryDate} required onChange={onEntryDateChange}></input>
      </div>
      <div>
        <label htmlFor='txtWeight'>Weight</label>
      </div>
      <div>
        <input type='decimal' id='txtWeight' value={weight} required onChange={onWeightChange}></input>
      </div>
      <div>
        <label htmlFor='txtDescription'>Notes</label>
      </div>
      <div>
        <input type='text' id='txtDescription' value={description} onChange={onDescriptionChange}></input>
      </div>
      <button id='btnAdd' type='submit' className='mt-2'>Save</button>
    </div>
  </form>
);
}