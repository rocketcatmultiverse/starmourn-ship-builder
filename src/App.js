import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SUPERSTRUCTURES, CAPACITORS, ENGINES, SHIELDS, SHIPSIMS, SENSORS, WEAPONS, MODULES, getComponent, getModules, getWeapons, getPointsUsed, shipStats } from './Forge';

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
		<option className="shield" value={id}>
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

const Label = ({ text }) => (<span className="label">{text}:</span>);

const SuperstructureSelection = ({ ssType, setSsType, selected, setSelected }) => {
	const sublist = SUPERSTRUCTURES.filter(ss => ss.ss_type === ssType);
	return (
		<div className="superstructures">
			<Label text="Class" />
			<select className="superstructures__class" defaultValue={ssType} onChange={(evt) => setSsType(evt.target.value) || setSelected(SHIP_DEFAULT[evt.target.value])} >
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

const ComponentSelection = ({ selected, setSelected, masterList, ss_type, comp_name, comp_type }) => {
	const sublist = masterList
		.filter(component => component.ss_type === ss_type);
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
	console.log(sublist, masterList);
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

const ModulesSelection = ({ selected, setSelected, masterList, superstructure, name }) => {
	const counts = getComponent(superstructure, SUPERSTRUCTURES, superstructure)[name];
	const pointsUsed = getPointsUsed(selected, masterList);
	return (
		<div className={name}>
			<Label text={`${name}: ${pointsUsed}/${counts.points}`} />
			<ModuleList selected={selected} setSelected={setSelected} masterList={masterList.filter(({ size_points }) => size_points <= counts.points)} points={counts.points} pointsUsed={pointsUsed} name={name} />
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
		weaponPoints: getPointsUsed(weapons, WEAPONS),
		modulePoints: getPointsUsed(modules, MODULES),
	};
	const { maxPower, massUsed, powerLeft, thrustRatio, cyclesLeft, maxCycles, dps, totalPrice, overModules, overWeapons } = shipStats(ship);
	return (<div className="ship">
		<span className="power">Power: <span className="power_left">{powerLeft}</span>/<span className="max_power">{maxPower}</span></span>
		<span className="cycles">Cycles: <span className="cycles_left">{cyclesLeft}</span>/<span className="max_cycles">{maxCycles}</span></span>
		<span className="dps">DPS: <span className="dps">{dps}</span></span>
		<span className="mass">Mass: <span className="mass_used">{massUsed}</span></span>
		<span className="thrust">Thrust Over Mass: <span className="thrust_ratio">{thrustRatio}</span></span>
		<span className="price">Price: <span className="total_price">{totalPrice}</span></span>
		{overModules && <span className="over_modules">TOO MANY MODULES / MODULES TOO LARGE</span>}
		{overWeapons && <span className="over_weapons">TOO MANY WEAPONS / WEAPONS TOO LARGE</span>}
	</div>);
};

function App() {
	const [ssType, setSsType] = useState('Interceptor');
	const [superstructure, setSuperstructure] = useState('20');
	const [capacitor, setCapacitor] = useState();
	const [engine, setEngine] = useState();
	const [shield, setShield] = useState();
	const [shipsim, setShipsim] = useState();
	const [sensor, setSensor] = useState();
	const [modules, setModules] = useState([]);
	const [weapons, setWeapons] = useState([]);
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
			<SuperstructureSelection ssType={ssType} setSsType={setSsType} selected={superstructure} setSelected={setSuperstructure} />
			<ComponentSelection selected={capacitor} setSelected={setCapacitor} masterList={CAPACITORS} ss_type={ssType} comp_name="capacitors" comp_type={Capacitor} />
			<ComponentSelection selected={engine} setSelected={setEngine} masterList={ENGINES} ss_type={ssType} comp_name="engines" comp_type={Engine} />
			<ComponentSelection selected={shield} setSelected={setShield} masterList={SHIELDS} ss_type={ssType} comp_name="shields" comp_type={Shield} />
			<ComponentSelection selected={shipsim} setSelected={setShipsim} masterList={SHIPSIMS} ss_type={ssType} comp_name="shipsims" comp_type={Shipsim} />
			<ComponentSelection selected={sensor} setSelected={setSensor} masterList={SENSORS} ss_type={ssType} comp_name="sensors" comp_type={Sensor} />
			<ModulesSelection selected={modules} setSelected={setModules} superstructure={superstructure} masterList={MODULES} name="modules" />
			<ModulesSelection selected={weapons} setSelected={setWeapons} superstructure={superstructure} masterList={WEAPONS} name="weapons" />
			<ShipDisplay {...ship} />
		</div>
	);
}

export default App;
