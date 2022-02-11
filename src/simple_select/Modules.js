import React from 'react';
import { SUPERSTRUCTURES } from '../Data';
import { getComponent, getPointsUsed } from '../Forge';
import { Label } from './Common';

const ActivatedCheck = ({ value, setValue }) => {
    return (<input type="checkbox" checked={value} onChange={(evt) => setValue(evt.target.checked)} />);
};

const AmmoCheck = ({ value, setValue }) => {
    return (<div className={`ammo ammo_${value}`} onClick={() => {
        if (value === 'kinetic') {
            setValue('em');
        } else if (value === 'em') {
            setValue('thermal');
        } else if (value === 'thermal') {
            setValue('gravitic');
        } else {
            setValue('kinetic');
        }
    }} />);
};

const ModuleSelection = ({ selected, setSelected, masterList, weapon }) => {
    const sublist = [...masterList];
    sublist.sort((a, b) => {
        if (a.size_points > b.size_points) {
            return 1;
        } else if (a.size_points < b.size_points) {
            return -1;
        } else if (a.price > b.price) {
            return 1;
        } else if (a.price < b.price) {
            return -1;
        } else {
            return 0;
        }
    });
    return (
        <div>
            <select value={selected && selected.id} onChange={(evt) => setSelected({
                id: evt.target.value,
                disabled: (selected && selected.disabled) || false,
                ammo: (selected && selected.ammo) || 'kinetic',
            })}>
                <option value="">None</option>
                {sublist.map(module => (<option value={module.id}>
                    ({module.size_points}) {module.id} - {module.name}
                </option>))}
            </select>
            {weapon && selected && selected.id && <ActivatedCheck value={!selected.disabled} setValue={activated => setSelected({
                ...selected,
                disabled: !activated,
            })} />}
            {weapon && selected && selected.id && <AmmoCheck value={selected.ammo} setValue={ammo => setSelected({
                ...selected,
                ammo,
            })} />}
        </div>
    );
};

const ModuleList = ({ selected, setSelected, masterList, points, pointsUsed, name }) => {
    const setModule = (idx) => ({ id, disabled, ammo }) => {
        const updated = [
            ...selected,
        ];
        if (id) {
            updated[idx] = {
                id,
                disabled,
                ammo,
            };
        } else {
            updated.splice(idx, 1);
        }
        setSelected(updated);
    };
    const list = [];
    for (let i = 0; i < selected.length + 1; i++) {
        list.push({
            selected: selected[i],
            setSelected: setModule(i),
            masterList,
            weapon: name === 'weapons',
        });
    }
    return (<div className={`${name}`}>
        {list.map((item, idx) => (<ModuleSelection
            {...item}
            key={`${item.selected && item.selected.id}_${idx}`}
        />))}
    </div>);
};

export const ModulesSelection = ({ selected, setSelected, masterList, superstructure, name, mods }) => {
    const counts = getComponent(superstructure, SUPERSTRUCTURES, superstructure, mods)[name];
    const pointsUsed = getPointsUsed(selected, masterList);
    return (
        <div className={name}>
            <Label text={`${name}: ${pointsUsed}/${counts.points}`} />
            <ModuleList selected={selected} setSelected={setSelected} masterList={masterList.filter(({ size_points }) => size_points <= counts.points)} points={counts.points} pointsUsed={pointsUsed} name={name} />
        </div>
    );
};