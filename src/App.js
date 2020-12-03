import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SUPERSTRUCTURES, CAPACITORS, ENGINES, SHIELDS, SHIPSIMS, SENSORS, WEAPONS, MODULES, getComponent, getModules, getWeapons, shipStats } from './Forge';

const Superstructure = ({ id, make, model, ss_type }) => {
    return (
	    <option className="superstructure" value={id}>
	    {ss_type} {id} {make} {model}
	</option>
    );
};

const Capacitor = ({ id, mass, power, kear }) => {
    return (
	    <option className="capacitor" value={id}>
	    {id} - {kear} Kear - {mass}t/{power}h
	</option>
    );
};

const Engine = ({ id, mass, power, thrust }) => {
    return (
	    <option className="engine" value={id}>
	    {id} - {thrust}h Thrust - {mass}t/{power}h
	</option>
    );
};

const Sensor = ({ id, mass, power, strength }) => {
    return (
	    <option className="sensor" value={id}>
	    {id} - {strength} - {mass}t/{power}h
	</option>
    );
};

const Shipsim = ({ id, mass, power, cycles }) => {
    return (
	    <option className="shipsim" value={id}>
	    {id} - {cycles} - {mass}t/{power}h
	</option>
    );
};

const Shield = ({ id, mass, power, strength, recharge_time }) => {
    return (
	    <option className="shipsim" value={id}>
	    {id} - {strength}@{recharge_time} - {mass}t/{power}h
	</option>
    );
};

const SHIP_DEFAULT = {
    Interceptor: '20',
    Corvette: '6',
    Destroyer: '15',
    Cruiser: '14',
    Battleship: '4',
    Freighter: '29',
    Superhauler: '32',
};

const SuperstructureSelection = ({ ssType, setSsType, selected, setSelected }) => {
    const sublist = SUPERSTRUCTURES.filter(ss => ss.ss_type === ssType);
    return (
	<div>
	    <select className="superstructures" defaultValue={ssType} onChange={(evt) => setSsType(evt.target.value) || setSelected(SHIP_DEFAULT[evt.target.value])} >
	    <option value="Interceptor">Interceptor</option>
	    <option value="Corvette">Corvette</option>
	    <option value="Destroyer">Destroyer</option>
	    <option value="Cruiser">Cruiser</option>
	    <option value="Battleship">Battleship</option>
	    <option value="Freighter">Freighter</option>
	    <option value="Superhauler">Superhauler</option>
	</select>
	    <select className="superstructures" defaultValue={selected} onChange={(evt) => setSelected(evt.target.value)} >
	    {sublist.map(Superstructure)}
	</select>
	    </div>
    );
};

const ComponentSelection = ({ selected, setSelected, masterList, ss_type, comp_name, comp_type }) => {
    const sublist = masterList
	  .filter(component => component.ss_type === ss_type);
    sublist.sort((a, b) => a.price - b.price);
    let value = selected;
    if (!sublist.find(component => component.id === selected)) {
	value = sublist[0].id;
    }
    return (
	    <select className={comp_name} defaultValue={value} onChange={(evt) => console.log(evt.target.value) || setSelected(evt.target.value)}>
	    {sublist.map(comp_type)}
	    </select>
    );
};

const ActivatedCheck = ({ value, setValue }) => {
    return (<input type="checkbox" checked={value} onChange={(evt) => setValue(evt.target.checked)} />);
};

const AmmoCheck = ({ value, setValue }) => {
    return (<div className={`ammo_${value}`} onClick={() => {
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

const ModuleSelection = ({ selected, setSelected, masterList, size, weapon }) => {
    const sublist = masterList
	  .filter(module => module.size === size);
    sublist.sort((a, b) => a.price - b.price);
    return (
	<div>
	    <select defaultValue={selected && selected.id} onChange={(evt) => setSelected({
		id: evt.target.value,
		disabled: (selected && selected.disabled) || false,
		ammo: (selected && selected.ammo) || 'kinetic',
	    })}>
	    <option value="">None</option>
	    {sublist.map(module => (<option value={module.id}>
				    {module.id} - {module.name}
				    </option>))}
	</select>
	    {weapon && selected && selected.id && <ActivatedCheck value={!selected.disabled} setValue={activated => console.log(activated, selected) || setSelected({
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

const ModuleList = ({ selected, setSelected, masterList, count, size, name }) => {
    const setModule = (idx) => ({ id, disabled, ammo }) => {
	const updated = {
	    ...selected,
	};
	updated[size] = [...updated[size]];
	updated[size][idx] = {
	    id,
	    disabled,
	    ammo,
	};
	console.log(selected, updated);
	setSelected(updated);
    };
    const list = [];
    for (let i = 0; i < count; i++) {
	list.push({
	    selected: selected[size][i],
	    setSelected: setModule(i),
	    masterList,
	    size,
	    weapon: name === 'weapons',
	});
    }
    console.log(count, list);
    return (<div className={`${name}_${size}`}>
	    {list.map(ModuleSelection)}
	    </div>);
};

const ModulesSelection = ({ selected, setSelected, masterList, superstructure, name }) => {
    const counts = getComponent(superstructure, SUPERSTRUCTURES, superstructure)[name];
    console.log(counts);
    return (
	    <div className={name}>
	    <ModuleList selected={selected} setSelected={setSelected} masterList={masterList} count={counts.small} size="small" name={name} />
	    <ModuleList selected={selected} setSelected={setSelected} masterList={masterList} count={counts.medium} size="medium" name={name} />
	    <ModuleList selected={selected} setSelected={setSelected} masterList={masterList} count={counts.large} size="large" name={name} />
	    </div>
    );
};

const ShipDisplay = ({ superstructure, capacitor, engine, shield, shipsim, sensor, weapons, modules }) => {
    const ship = {
	superstructure: getComponent(superstructure, SUPERSTRUCTURES, superstructure),
	capacitor: getComponent(superstructure, CAPACITORS, capacitor),
	engine: getComponent(superstructure, ENGINES, engine),
	shield: getComponent(superstructure, SHIELDS, shield),
	shipsim: getComponent(superstructure, SHIPSIMS, shipsim),
	sensor: getComponent(superstructure, SENSORS, sensor),
	weapons: getWeapons(superstructure, weapons),
	modules: getModules(superstructure, modules),
    };
    const { maxPower, massUsed, powerLeft, thrustRatio, cyclesLeft, maxCycles, totalPrice } = shipStats(ship);
    return (<div className="ship">
	    <span className="power">Power: <span className="power_left">{powerLeft}</span>/<span className="max_power">{maxPower}</span></span>
	    <span className="cycles">Cycles: <span className="cycles_left">{cyclesLeft}</span>/<span className="max_cycles">{maxCycles}</span></span>
	    <span className="mass">Mass: <span className="mass_used">{massUsed}</span></span>
	    <span className="thrust">Thrust: <span className="thrust_ratio">{thrustRatio}</span></span>
	    <span className="price">Price: <span className="total_price">{totalPrice}</span></span>
	    </div>);
};

function App() {
    const [ ssType, setSsType ] = useState('Interceptor');
    const [ superstructure, setSuperstructure ] = useState('20');
    const [ capacitor, setCapacitor ] = useState();
    const [ engine, setEngine ] = useState();
    const [ shield, setShield ] = useState();
    const [ shipsim, setShipsim ] = useState();
    const [ sensor, setSensor ] = useState();
    const [ modules, setModules ] = useState({
	small: [],
	medium: [],
	large: [],
    });
    const [ weapons, setWeapons ] = useState({
	small: [],
	medium: [],
	large: [],
    });
    const ship = {
	superstructure,
	capacitor,
	engine,
	shield,
	shipsim,
	sensor,
	weapons,
	modules,
    };
    return (
	    <div className="App">
	    <SuperstructureSelection ssType={ssType} setSsType={setSsType} selected={superstructure} setSelected={setSuperstructure}/>
	    <ComponentSelection selected={capacitor} setSelected={setCapacitor} masterList={CAPACITORS} ss_type={ssType} comp_name="capacitors" comp_type={Capacitor} />
	    <ComponentSelection selected={engine} setSelected={setEngine} masterList={ENGINES} ss_type={ssType} comp_name="engines" comp_type={Engine} />
	    <ComponentSelection selected={shield} setSelected={setShield} masterList={SHIELDS} ss_type={ssType} comp_name="shields" comp_type={Shield} />
	    <ComponentSelection selected={shipsim} setSelected={setShipsim} masterList={SHIPSIMS} ss_type={ssType} comp_name="shipsim" comp_type={Shipsim} />
	    <ComponentSelection selected={sensor} setSelected={setSensor} masterList={SENSORS} ss_type={ssType} comp_name="sensors" comp_type={Sensor} />
	    <ModulesSelection selected={modules} setSelected={setModules} superstructure={superstructure} masterList={MODULES} name="modules" />
	    <ModulesSelection selected={weapons} setSelected={setWeapons} superstructure={superstructure} masterList={WEAPONS} name="weapons" />
	    <ShipDisplay {...ship}/>
	</div>
  );
}

export default App;
