import React, { useState } from 'react';
import './Steps.css'

interface DistanceData {
  date: Date;
  distance: number;
}

const Steps: React.FC = () => {
  const defaultDistances: DistanceData[] = [
    { date: new Date('2020-07-19'), distance: 5.7 },
    { date: new Date('2019-07-19'), distance: 14.2 },
    { date: new Date('2019-07-18'), distance: 3.4 },
  ];
  const [distances, setDistances] = useState<DistanceData[]>(defaultDistances);
  const [newDate, setNewDate] = useState<Date | null>(null);
  const [newDistance, setNewDistance] = useState<number | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDate(new Date(event.target.value));
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDistance(Number(event.target.value));
  };

  const handleAddDistance = () => {
    if (newDate && newDistance !== null) {
      const existingIndex = distances.findIndex((item) => item.date.toDateString() === newDate.toDateString());

      if (existingIndex !== -1) {
        const updatedDistances = [...distances];
        updatedDistances[existingIndex].distance += newDistance;
        setDistances(updatedDistances);
      } else {
        setDistances([...distances, { date: newDate, distance: newDistance }]);
      }

      setNewDate(null);
      setNewDistance(null);
    }
  };

  const handleRemoveDistance = (index: number) => {
    const updatedDistances = distances.filter((_, i) => i !== index);
    setDistances(updatedDistances);
  };

  const sortedDistances = distances.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <>
      <div className='title'>
        <h4>Дата (ДД.ММ.ГГ.)</h4>
        <h4>Пройдено км</h4>
      </div>
      <form className='input'>
        <input className='input-date' type="date" value={(newDate && newDate.toISOString().slice(0, 10)) || ''} onChange={handleDateChange} />
        <input className='input-distance' type="number" value={newDistance || ''} onChange={handleDistanceChange} placeholder='Дистанция' />
        <button className='btn' type="button" onClick={handleAddDistance}>ОК</button>
      </form>
      <div className='title-result'>
        <p style={{ paddingRight: '10px' }}>Дата (ДД.ММ.ГГ.)</p><p style={{ paddingRight: '10px' }}>Пройдено км</p><p style={{ paddingRight: '10px' }}>Действия</p>
      </div>
      <div className='output'>
        {sortedDistances.map((item, index) => (
          <div key={index}>
            <span style={{ marginRight: '70px' }}>{item.date.toLocaleDateString()}</span>
            <span style={{ marginRight: '70px' }}>{item.distance}</span>
            <span onClick={() => handleRemoveDistance(index)} style={{ cursor: 'pointer' }}>✎ ✘</span>
          </div>
        ))}
      </div>
    </>
  )}
export default Steps;