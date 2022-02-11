import React from 'react';
import { modify, MOD_PART_TYPES, getValidMods } from '../Mods';
import { Label } from './Common';

export const Capacitor = ({ id, mass, power, kear }) => {
    return (
        <option className="capacitor" value={id}>
            {id} - {kear} Kear - {mass}t/{power}h
        </option>
    );
};

export const Engine = ({ id, mass, power, thrust }) => {
    return (
        <option className="engine" value={id}>
            {id} - {thrust}h Thrust - {mass}t/{power}h
        </option>
    );
};

export const Sensor = ({ id, mass, power, strength }) => {
    return (
        <option className="sensor" value={id}>
            {id} - {strength} - {mass}t/{power}h
        </option>
    );
};

export const Shipsim = ({ id, mass, power, cycles }) => {
    return (
        <option className="shipsim" value={id}>
            {id} - {cycles} - {mass}t/{power}h
        </option>
    );
};

export const Shield = ({ id, mass, power, strength, recharge_time }) => {
    return (
        <option className="shield" value={id}>
            {id} - {strength}@{recharge_time} - {mass}t/{power}h
        </option>
    );
};

export const ComponentSelection = ({ selected, setSelected, masterList, ss_type, comp_name, comp_type, mods }) => {
    const sublist = masterList
        .filter(component => component.ss_type === ss_type)
        .map(component => modify(component, masterList, mods));
    sublist.sort((a, b) => a.price - b.price);
    let value = selected;
    if (!sublist.find(component => component.id === selected)) {
        value = sublist[0].id;
    }
    return (
        <div className={comp_name}>
            <Label text={comp_name} />
            <select className={`${comp_name}__select`} defaultValue={value} onChange={(evt) => setSelected(evt.target.value)}>
                {sublist.map(comp_type)}
            </select>
        </div>
    );
};