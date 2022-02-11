import React from 'react';
import { Label } from './Common';
import { SUPERSTRUCTURES } from '../Data';

const Superstructure = ({ id, make, model, ss_type }) => {
    return (
        <option className="superstructure" value={id}>
            {ss_type} {id} {make} {model}
        </option>
    );
};

export const SuperstructureSelection = ({ ssType, setSsType, selected, setSelected }) => {
    const sublist = SUPERSTRUCTURES.filter(ss => ss.ss_type === ssType);
    return (
        <div className="superstructures">
            <Label text="Class" />
            <select className="superstructures__class" defaultValue={ssType} onChange={(evt) => setSsType(evt.target.value)} >
                <option value="Interceptor">Interceptor</option>
                <option value="Corvette">Corvette</option>
                <option value="Destroyer">Destroyer</option>
                <option value="Cruiser">Cruiser</option>
                <option value="Battleship">Battleship</option>
                <option value="Freighter">Freighter</option>
                <option value="Superhauler">Superhauler</option>
            </select>
            <Label text="Model" />
            <select className="superstructures__model" defaultValue={selected} onChange={(evt) => setSelected(evt.target.value)} >
                {sublist.map(Superstructure)}
            </select>
        </div>
    );
};