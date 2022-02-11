import React from "react";
import { getModPointsUsed } from "../Forge";
import { getValidMods } from "../Mods";
import { Label } from "./Common";

const ModLevelSelection = ({ mod, level, setLevel }) => {
    return (
        <select value={level} onChange={(evt) => setLevel(evt.target.value)}>
            {new Array(15).fill(null).map((_, idx) => (<option value={idx + 1}>Level {idx + 1}</option>))}
        </select>
    );
};

const ModSelection = ({ selected, setSelected, masterList, selectedIds }) => {
    return (
        <div>
            <select value={selected && selected.id} onChange={(evt) => setSelected({
                id: evt.target.value,
                level: (selected && selected.level) || 1,
            })}>
                <option value="">None</option>
                {selected && selected.id && <option value={selected.id}>
                    {selected.id} - {masterList.find((mod) => mod.id === selected.id).name}
                </option>}
                {getValidMods(masterList, selectedIds)
                    .map(mod => (<option value={mod.id}>
                        {mod.id} - {mod.name}
                    </option>))}
            </select>
            {selected && selected.id && <ModLevelSelection
                mod={masterList.find((mod) => mod.id == selected.id)}
                level={selected.level}
                setLevel={level => setSelected({
                    id: selected.id,
                    level: parseInt(level),
                })}
            />}
        </div>
    );
};

const ModList = ({ selected, setSelected, masterList }) => {
    const setMod = (idx) => ({ id, level }) => {
        const updated = [
            ...selected,
        ];
        if (id) {
            updated[idx] = {
                id,
                level,
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
            setSelected: setMod(i),
            masterList,
            selectedIds: selected.map(select => select.id),
        });
    }
    return (<div className="mod_list">
        {list.map((item, idx) => (<ModSelection
            {...item}
            key={`${item.selected && item.selected.id}_${idx}`}
        />))}
    </div>);
};

export const MAX_MOD_POINTS = 60;

export const ModsSelection = ({ selected, setSelected, masterList }) => {
    const pointsUsed = getModPointsUsed(selected);
    return (
        <div className="mods">
            <Label text={`Mods: ${pointsUsed}/${MAX_MOD_POINTS}`} />
            <ModList selected={selected} setSelected={setSelected} masterList={masterList} />
        </div>
    );
};