import React, { useState, useEffect } from 'react';
import { faFloppyDisk, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDeleteRow from 'react-delete-row';
import Fader from 'react-fader';
import { EditableCell } from './EditableCell';
import { NewEntry } from './NewEntry';
import { Chart } from './Chart';

export const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [entryDate, setEntryDate] = useState(new Date());
  const [weight, setWeight] = useState(150);
  const [description, setDescription] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    const populateData = async () => {
      const response = await fetch('/api/weights');
      const data = await response.json();
      setEntries(data);
      setLoading(false);
    };

    populateData();
  }, []);

  const onSave = async e => {
    e.preventDefault();

    const entry = {
      entryDate,
      value: weight,
      description,
    };

    try {
      const response = await fetch('/api/weights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });

      if (response.ok) {
        const newEntry = await response.json();
        setEntries([...entries, newEntry]);
        const today = new Date();
        const localDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
        setEntryDate(localDate);
        setWeight(150);
        setDescription('');
      }
      else {
        throw new Error('Error calling api. ' + response);
      }
    }
    catch (error) {
      console.error('Error: ', error);
    }
  }

  const onDelete = async id => {
    try {
      const response = await fetch(`/api/weights/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error calling api. ' + response);
      }
    }
    catch (error) {
      console.error('Error: ', error);
    }
  }

  const onUpdate = async (entry, e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/weights/${entry.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });

      if (response.ok) {
        const newEntry = await response.json();
        setEntries(entries.map(n => n.id === entry.id ? { ...n, ...newEntry } : n));
        setMessage(`${new Date(newEntry.entryDate).toLocaleDateString()} saved successfully.`);

        setTimeout(() => {
          setMessage('');
        }, 2000);

        console.log(`Entry saved: ${JSON.stringify(entry)}`);

        return newEntry;
      }
      else {
        throw new Error('Error calling api. ' + response);
      }
    }
    catch (error) {
      console.error('Error: ', error);
    }
  }

  const onAnalyze = async () => {
    if (isAnalyzing) {
      return;
    }

    setAnalysis();
    setIsAnalyzing(true);

    try {
      const response = await fetch(`/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({prompt}),
      });

      if (response.ok) {
        setAnalysis(await response.json());
      }
      else {
        throw new Error('Error calling api. ' + response);
      }
    }
    catch (error) {
      console.error('Error: ', error);
    }
    finally {
      setIsAnalyzing(false);
    }
  }

  const onChangePrompt = e => {
    setPrompt(e.target.value);
  }

  const renderTable = () => {
    const sortedEntries = entries.sort((a, b) => new Date(a.entryDate) - new Date(b.entryDate));

    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight</th>
            <th>Notes</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedEntries.map(entry =>
            <ReactDeleteRow
              key={entry.id}
              data={entry}
              iconClassName='text-danger'
              onDelete={ entry => { if (window.confirm(`Are you sure you want to delete the entry for ${new Date(entry.entryDate).toLocaleDateString()}?`)) {
                onDelete(entry.id);
                return true;
              }}}
              onDeleteComplete={ entry =>
                // Remove item from state after row fades out.
                setEntries(entries.filter(n => n.id !== entry.id))
              }>
              <EditableCell className='entry-date' value={new Date(entry.entryDate).toLocaleDateString()} onChange={value => entry.entryDate = new Date(value)} />
              <EditableCell className='entry-weight' value={entry.value} onChange={value => entry.value = value} />
              <EditableCell className='entry-description' value={entry.description} onChange={value => entry.description = value} />
              <td className='save-icon'><FontAwesomeIcon icon={faFloppyDisk} onClick={e => onUpdate(entry, e)}/></td>
            </ReactDeleteRow>
          )}
        </tbody>
      </table>
    );
  }

  const render = loading ? <p><em>Loading...</em></p> : (
  <div>
    <Fader>
      <p id="message">{message}</p>
    </Fader>
    <Chart data={entries} />
    { renderTable(entries) }
    <div>
      <div id='prompt-container'>
        <input id="txtPrompt" type="text" placeholder="Optional custom prompt" title="Example: Make healthy eating recommendations for my diet." value={prompt} onChange={onChangePrompt} />
      </div>
      <div id='btnAnalyze' title='Analyze the weight trend using AI.' className={isAnalyzing ? 'disabled' : ''}>
        <FontAwesomeIcon icon={faWandMagicSparkles} onClick={onAnalyze} />
      </div>
    </div>
    <div id='analysis'>
      {isAnalyzing && <div className='spinner'></div>}
      <Fader>
        {analysis}
      </Fader>
    </div>
    <NewEntry entryDate={entryDate} setEntryDate={setEntryDate} weight={weight} setWeight={setWeight} description={description} setDescription={setDescription} onSave={onSave} />
  </div>
  );

  return (
    <div>
      <h1 id="tabelLabel" >Weight Entries</h1>
      {render}
    </div>
  );
}
