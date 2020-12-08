const SUPERSTRUCTURES_STRING = `20,Akari Yards,Corsair,Interceptor,7,1400,704,0.40s,2.60k,1.80k,2,1,0,0,1,0,0,17527
21,Kurovani Defense,Assassin,Interceptor,10,1950,1.58k,0.65s,3.00k,1.58k,3,2,0,0,1,0,0,25039
25,Tiravoa Shipworks,Defiant,Interceptor,13,2870,950,0.85s,3.30k,1.45k,3,3,0,0,0,0,0,32551
24,Relian Shipyards,Squall,Interceptor,17,3650,1.75k,0.80s,3.30k,1.81k,4,1,1,0,1,0,0,42567
6,Kurovani Defense,Stalker,Corvette,21,4170,2.14k,0.82s,12.50k,3.27k,5,2,1,0,2,1,0,52583
5,Akari Yards,Marauder,Corvette,25,4870,2.32k,1.00s,13.00k,2.71k,6,1,0,1,1,2,0,62599
9,Tiravoa Shipworks,Intrepid,Corvette,29,5550,3.22k,0.98s,13.00k,2.67k,6,2,2,0,2,1,0,72615
7,Thill Conglomerate,Scimitar,Corvette,33,5770,2.81k,0.88s,12.80k,2.93k,7,1,2,0,3,2,0,82631
8,Sinseel Systems,Sunderer,Corvette,38,7100,3.53k,1.15s,13.50k,2.19k,8,2,3,0,2,0,0,95151
29,Tiravoa Shipworks,Venture,Freighter,55,6270,3.13k,2.28s,14.30k,17.70k,12,0,1,0,3,2,0,137718
28,Sinseel Systems,Traveller,Freighter,57,6970,4.00k,2.00s,15.00k,16.80k,12,0,1,0,3,3,0,142726
22,Wayland Astrotech,Constellation,Freighter,66,12300,5.97k,2.61s,15.00k,23.81k,14,0,1,0,3,2,1,165262
19,Thill Conglomerate,Ouran,Freighter,74,14700,7.46k,2.57s,15.00k,25.29k,15,0,1,0,3,3,1,185294
15,Akari Yards,Ravager,Destroyer,42,8250,4.36k,1.00s,23.50k,4.12k,9,4,1,1,2,1,1,105167
18,Tiravoa Shipworks,Valor,Destroyer,46,9750,4.77k,1.10s,25.00k,4.64k,10,4,2,1,2,1,1,115183
16,Kurovani Defense,Predator,Destroyer,50,11250,5.11k,1.12s,25.00k,5.56k,11,4,2,1,2,2,1,125198
17,Relian Shipyards,Cyclone,Destroyer,56,13500,6.81k,1.40s,25.50k,6.27k,12,4,1,2,2,1,1,140222
14,Thill Conglomerate,Battleaxe,Cruiser,61,15000,7.17k,1.79s,36.50k,10.58k,13,2,3,1,1,2,2,152742
13,Wayland Astrotech,Nova,Cruiser,64,17250,8.75k,1.88s,38.00k,8.75k,13,2,2,2,1,2,2,160254
12,Sinseel Systems,Conqueror,Cruiser,68,19500,10.20k,2.01s,38.00k,8.62k,14,2,3,2,1,2,2,170270
11,Relian Shipyards,Hurricane,Cruiser,72,22500,11.30k,2.00s,40.00k,11.25k,15,2,3,3,1,2,1,180286
10,Ixodon Industries,Twilight,Cruiser,77,27000,14.43k,2.40s,38.00k,9.45k,16,2,2,3,1,2,2,192806
32,Sinseel Systems,Progenitor,Superhauler,115,56000,12.63k,5.41s,38.00k,50.78k,24,1,0,1,2,3,4,237565
33,Ixodon Industries,Maw,Superhauler,110,64000,15.00k,5.00s,36.50k,46.91k,23,1,0,2,2,3,3,227236
35,Wayland Astrotech,Galaxy,Superhauler,125,68200,14.17k,6.50s,37.00k,55.97k,26,1,0,0,2,4,5,258222
4,Wayland Astrotech,Quasar,Battleship,83,34500,17.42k,3.50s,53.00k,15.87k,17,1,4,3,1,4,2,207830
3,Sinseel Systems,Architect,Battleship,89,43500,21.53k,3.80s,57.00k,23.87k,18,1,2,4,1,3,2,222854
2,Relian Shipyards,Typhoon,Battleship,94,49250,23.90k,4.00s,55.00k,17.86k,19,1,3,4,1,3,3,235374
1,Ixodon Industries,Singularity,Battleship,99,63500,28.74k,4.32s,55.00k,15.49k,20,1,2,5,1,3,3,247894`;

const parseKilo = value => {
    if (value.endsWith('k')) {
	return Math.round(1000 * parseFloat(value.substr(0, value.length - 1)));
    } else if (value.endsWith('s')) {
	return parseFloat(value.substr(0, value.length - 1));
    } else if (value.endsWith('%')) {
	return parseFloat(value.substr(0, value.length - 1)) / 100;
    }
    return parseFloat(value);
};

const superstructureFromLine = (line) => {
    const elements = line.split(',');
    console.log(elements);
    return {
	id: elements[0],
	make: elements[1],
	model: elements[2],
	ss_type: elements[3],
	size: parseInt(elements[4]),
	mass: parseInt(elements[5]),
	strength: parseKilo(elements[6]),
	turn_time: parseKilo(elements[7]),
	power: parseKilo(elements[8]),
	capacity: parseKilo(elements[9]),
	refit_capacity: parseInt(elements[10]),
	weapons: {
	    small: parseInt(elements[11]),
	    medium: parseInt(elements[12]),
	    large: parseInt(elements[13]),
	},
	modules: {
	    small: parseInt(elements[14]),
	    medium: parseInt(elements[15]),
	    large: parseInt(elements[16]),
	},
	price: parseInt(elements[17]),
    };
};

export const SUPERSTRUCTURES = SUPERSTRUCTURES_STRING.split('\n').map(superstructureFromLine);

const MODULES_STRING = `23,Augmented Engine I,Small,Improved reverse thrust allows for faster stops.,0.50% augmented engines (faster SHIP HALT),0,100,0,25000
39,Augmented Engine II,Medium,Improved reverse thrust allows for faster stops.,0.80% augmented engines (faster SHIP HALT),0,300,0,45000
40,Augmented Engine III,Large,Improved reverse thrust allows for faster stops.,1.20% augmented engines (faster SHIP HALT),0,500,0,80000
27,Cargo Hold I,Small,Improved cargo capacity allows for extra cargo space.,100 extra cargo space,0,100,0,50000
41,Cargo Hold II,Medium,Improved cargo capacity allows for extra cargo space.,150 extra cargo space,0,300,0,75000
42,Cargo Hold III,Large,Improved cargo capacity allows for extra cargo space.,200 extra cargo space,0,500,0,11000
20,Damage Boost +20%,Small,Improves damage of a linked weapon by 20%.,20.00% damage,0,100,0,50000
26,Refitter,Medium,Increase ship refit capacity.,2 extra refit space,0,200,0,50000
22,Skipdrive I,Small,Skipdrives allow increase wormhole generation.,A skip drive,0,100,0,10000`;

const moduleFromLine = (line) => {
    const elements = line.split(',');
    return {
	id: elements[0],
	name: elements[1],
	size: elements[2].toLowerCase(),
	description: elements[3],
	effect: elements[4],
	mass: parseKilo(elements[5]),
	power: parseKilo(elements[6]),
	cycles: parseKilo(elements[7]),
	price: parseInt(elements[8]),
    };
};

export const MODULES = MODULES_STRING.split('\n').map(moduleFromLine);

const WEAPONS_STRING = `4,Cannon I,Small,Batters other ships with a blast of energy.,Cannon,1.5,3,400,6,15%,0,100,1.00k,3000
5,Cannon II,Medium,Batters other ships with an intense blast of energy.,Cannon,1.5,4,750,6,15%,0,300,2.50k,7500
6,Cannon III,Medium,Batters other ships with an overwhelming blast of energy.,Cannon,1.5,6,900,6,15%,0,300,2.50k,15000
32,Massive Cannon I,Medium,Batters other ships with a blast of energy.,Cannon,1.5,5,1.10k,7,15%,0,300,2.50k,10000
33,Massive Cannon II,Large,Batters other ships with an intense blast of energy.,Cannon,1.5,7,1.75k,7,15%,0,500,5.00k,15000
34,Massive Cannon III,Large,Batters other ships with an overwhelming blast of energy.,Cannon,1.5,9,2.00k,7,15%,0,500,5.00k,30000
7,Targeted Missile I,Medium,Launch missiles at your foes.,Missile,2.5,2.5,1.80k,8,7%,0,300,2.50k,10000
35,Targeted Missile II,Large,Fire larger and more powerful missiles.,Missile,2.5,3,2.60k,8,7%,0,500,5.00k,15000
36,Targeted Missile III,Large,Fire the most powerful missiles.,Missile,2.5,3,3.00k,8,7%,0,500,5.00k,30000
30,Mine Layer I,Medium,Lay mines behind your ship.,Mine,12,0,2.50k,5,50%,0,300,2.50k,15000
37,Mine Layer II,Large,Lay mines behind your ship.,Mine,12,0,3.50k,5,50%,0,500,5.00k,30000
38,Mine Layer III,Large,Lay mines behind your ship.,Mine,12,0,4.00k,5,50%,0,500,5.00k,45000
31,Mine Destroyer,Medium,Destroys mines in your targeting cone.,Antimine,6,0,1,5,50%,0,300,2.50k,15000
29,Interdictor Beam,Large,Stops movement.,Interdictor,8,0,1.50k,8,30%,0,500,5.00k,15000
21,Tractor Beam,Medium,Stops asteroids.,Tractor,8,0,1.50k,8,30%,0,300,2.50k,6000`;

const weaponFromLine = (line) => {
    const elements = line.split(',');
    const weapon_type = elements[4];
    const firing_speed = parseKilo(elements[5]);
    const reload_speed = parseKilo(elements[6]);
    const weapon_damage = parseKilo(elements[7]);
    let dps = 0;
    if (weapon_type === 'Missile') {
	dps = weapon_damage / reload_speed;
    } else if (weapon_type === 'Cannon') {
	dps = weapon_damage / firing_speed;
    }
    return {
	id: elements[0],
	name: elements[1],
	size: elements[2].toLowerCase(),
	description: elements[3],
	weapon_type,
	firing_speed,
	reload_speed,
	weapon_damage,
	optimal_range: parseInt(elements[8]),
	dps,
	fall_off: parseKilo(elements[9]),
	mass: parseKilo(elements[10]),
	power: parseKilo(elements[11]),
	cycles: parseKilo(elements[12]),
	price: parseInt(elements[13]),
    };
};

export const WEAPONS = WEAPONS_STRING.split('\n').map(weaponFromLine);

const CAPACITORS_STRING = `1,Relian Shipyards,R1000,Interceptor,375,1500,300,962
2,Nakamura Syndicate,SC125,Interceptor,425,1750,400,1302
3,Tiravoa Shipworks,CP7,Interceptor,300,1300,250,516
4,Osesk Lines,D65-25,Corvette,1500,5000,1300,2889
5,Sunwide Omnitech,MP30,Corvette,1800,6000,1500,3872
6,Nakamura Syndicate,SC1800,Corvette,1200,4500,1100,1628
15,Coreward Group,LP30-TR,Freighter,1800,3000,1500,3872
7,Tiravoa Shipworks,CP45,Destroyer,2700,9000,2500,6750
8,Warpring Enterprises,Enercell 55,Destroyer,3500,11000,2800,9527
9,Osesk Lines,D43-350,Destroyer,2200,7000,2200,4352
10,Nakamura Syndicate,SC5000,Destroyer,2800,9000,2600,8171
11,Sunwide Omnitech,MP2000,Cruiser,5250,13000,3800,11423
12,Warpring Enterprises,Enercell 75,Cruiser,5250,15000,4200,14465
13,Thill Conglomerate,Epsilon 5500,Cruiser,5250,12500,3400,8646
14,Sunwide Omnitech,MP6700,Cruiser,5250,13400,4000,11829
16,Warpring Enterprises,Enercell S,Superhauler,9000,6000,3700,9863
17,Thill Conglomerate,Sigma 9000,Battleship,9000,18000,5500,18203
18,Coreward Group,LP11-QV,Battleship,10000,22000,6000,26035
19,Nakamura Syndicate,SC7000,Battleship,8000,16000,5000,11549
20,Thill Conglomerate,Omega 9500,Battleship,9200,19000,5700,19923`;

const capacitorFromLine = (line) => {
    const elements = line.split(',');
    return {
	id: elements[0],
	make: elements[1],
	model: elements[2],
	ss_type: elements[3],
	mass: parseKilo(elements[4]),
	kear: parseKilo(elements[5]),
	power: parseKilo(elements[6]),
	price: parseInt(elements[7]),
    };
};

export const CAPACITORS = CAPACITORS_STRING.split('\n').map(capacitorFromLine);

const ENGINES_STRING = `23,Ostarian Designs,Gamma 50,Interceptor,380,1900,500,3228
22,Ostarian Designs,Gamma 35,Interceptor,350,1950,520,3335
1,Ostarian Designs,Fusion 25,Interceptor,500,2250,600,4133
2,Wayland Astrotech,F35-AST,Interceptor,520,2280,620,4175
54,Coreward Group,CGGR-525,Interceptor,400,2400,650,4518
41,Tiravoa Shipworks,TA-210,Interceptor,650,2530,750,4674
25,Wayland Astrotech,G115-AST,Corvette,1580,4900,2150,10356
24,Sinseel Systems,SSG85,Corvette,1600,4950,2200,10447
3,Ostarian Designs,Fusion 50,Corvette,2000,5550,2600,12081
4,Tiravoa Shipworks,T-80,Corvette,2050,5600,2550,12420
55,Wrega Gravitics,WG-600G,Corvette,1750,5750,2800,12496
42,Sunwide Omnitech,L-Drive 265,Corvette,2500,6050,3000,13365
11,Ostarian Designs,Fusion 480,Freighter,2400,8500,3000,26381
12,Sunwide Omnitech,Flare 600,Freighter,2450,8530,2950,26792
32,Sinseel Systems,SSG670,Freighter,2000,8200,2500,26896
46,Sunwide Omnitech,L-Drive 600,Freighter,2750,8850,3400,26864
33,Osesk Lines,LMG4800,Freighter,2050,8150,2450,26838
59,Coreward Group,CGGR-1225,Freighter,2150,8650,3200,26453
6,Sinseel Systems,SSF140,Destroyer,3650,8300,4950,19583
26,Ostarian Designs,Gamma 150,Destroyer,3100,7650,4400,17645
27,Sunwide Omnitech,Gburst 210,Destroyer,3000,7600,4350,17515
43,Osesk Lines,LMA4300,Destroyer,4200,8700,6600,18633
56,Wayland Astrotech,GR735-AST,Destroyer,3250,8500,5400,19663
5,Ostarian Designs,Fusion 100,Destroyer,3600,8250,5000,19250
7,Sunwide Omnitech,Flare 175,Cruiser,7000,11750,7900,31066
8,Osesk Lines,LMF4230,Cruiser,7080,11850,7850,31698
28,Sinseel Systems,SSG260,Cruiser,6200,10750,6800,28028
29,Wayland Astrotech,G325-AST,Cruiser,6300,10900,6900,28606
44,Tiravoa Shipworks,TA-375,Cruiser,8000,12500,8650,33600
57,Wrega Gravitics,WG-860G,Cruiser,6500,12100,8600,31575
13,Wayland Astrotech,F735-AST,Superhauler,12000,17000,7400,67191
14,Sinseel Systems,SSF840,Superhauler,12100,17100,7350,68214
34,Wayland Astrotech,G975-AST,Superhauler,10000,16000,7000,61195
35,Sunwide Omnitech,G-burst 1100,Superhauler,9900,16100,7030,61830
47,Wrega Gravitics,WG-750A,Superhauler,13000,17600,7700,70600
60,Wrega Gravitics,WG-1540G,Superhauler,10500,17350,7500,69518
9,Wayland Astrotech,F300-AST,Battleship,12000,16000,11000,48817
10,Sinseel Systems,SSF380,Battleship,12100,16050,10950,49234
30,Ostarian Designs,Gamma 450,Battleship,10500,14800,9500,44946
31,Sunwide Omnitech,G-burst 550,Battleship,10600,14950,9650,45503
45,Wrega Gravitics,WG-465A,Battleship,13650,16800,12550,50387
58,Wayland Astrotech,GR1015-AST,Battleship,11000,16450,11700,50034`;

const engineFromLine = (line) => {
    const elements = line.split(',');
    return {
	id: elements[0],
	make: elements[1],
	model: elements[2],
	ss_type: elements[3],
	mass: parseKilo(elements[4]),
	thrust: parseKilo(elements[5]),
	power: parseKilo(elements[6]),
	price: parseInt(elements[7]),
    };
};

export const ENGINES = ENGINES_STRING.split('\n').map(engineFromLine);


const SHIELDS_STRING = `1,Nebulan Yards,Sentinel 20,Interceptor,500,2000,18,600,816,0.00%,0.00%,0.00%
3,Relian Shipyards,Fortress 22,Interceptor,500,2200,17,600,987,-10.00%,10.00%,0.00%
2,Warpring Enterprises,Bulwark 25,Interceptor,550,2500,18,800,1104,0.00%,0.00%,0.00%
4,Nebulan Yards,Sentinel 35,Corvette,2000,3500,18,2600,1201,0.00%,0.00%,0.00%
5,Ixodon Industries,Aegis 137,Corvette,2000,3700,17,2650,1329,-10.00%,10.00%,0.00%
6,Warpring Enterprises,Bulwark 42,Corvette,2400,4200,18,3200,1559,0.00%,0.00%,10.00%
15,Relian Shipyards,Fortress F,Freighter,12000,8500,18,3000,6595,0.00%,0.00%,0.00%
16,Ixodon Industries,Aegis F,Freighter,14000,10000,18,3500,8451,0.00%,0.00%,0.00%
10,Warpring Enterprises,Bulwark 500,Destroyer,4000,5000,13,3500,2112,0.00%,0.00%,0.00%
8,Nebulan Yards,Sentinel 600,Destroyer,3200,6000,18,4500,2683,-15.00%,-15.00%,0.00%
7,Akari Yards,Defender 700,Destroyer,3600,7000,18,5000,3464,0.00%,0.00%,0.00%
9,Relian Shipyards,Fortress 800,Destroyer,3500,8000,18,6500,3969,0.00%,0.00%,0.00%
12,Akari Yards,Defender 15K,Cruiser,6000,15000,18,6500,13953,0.00%,0.00%,0.00%
14,Warpring Enterprises,Bulwark 16K,Cruiser,7000,16500,15,7600,15614,0.00%,0.00%,0.00%
11,Ixodon Industries,Aegis 16K,Cruiser,7000,16500,18,7600,15614,-10.00%,10.00%,0.00%
13,Nebulan Yards,Sentinel 18K,Cruiser,7500,18500,18,8500,18561,0.00%,0.00%,0.00%
17,Nebulan Yards,Sentinel SH,Superhauler,12000,26000,18,7400,39291,0.00%,0.00%,0.00%
20,Relian Shipyards,Fortress 30K,Battleship,10000,30000,16,9500,46169,0.00%,0.00%,0.00%
19,Akari Yards,Defender 38K,Battleship,12000,38000,18,11000,68839,0.00%,0.00%,0.00%
21,Ixodon Industries,Aegis 38K,Battleship,12000,38500,18,11000,70663,-15.00%,15.00%,0.00%
18,Warpring Enterprises,Bulwark 42K,Battleship,14000,42000,21,12500,78888,0.00%,0.00%,10.00%`;

const shieldFromLine = (line) => {
    const elements = line.split(',');
    return {
	id: elements[0],
	make: elements[1],
	model: elements[2],
	ss_type: elements[3],
	mass: parseKilo(elements[4]),
	strength: parseKilo(elements[5]),
	recharge_time: parseKilo(elements[6]),
	power: parseKilo(elements[7]),
	price: parseInt(elements[8]),
	resistances: {
	    kinetic: parseKilo(elements[9]),
	    thermal: parseKilo(elements[10]),
	    EM: parseKilo(elements[11]),
	},
    };
};

export const SHIELDS = SHIELDS_STRING.split('\n').map(shieldFromLine);

const SENSORS_STRING = `1,Coreward Group,Core15,Interceptor,125,12,600,1837
2,Artekeera Detection,SG1,Interceptor,150,18,750,2957
3,Osesk Lines,45Q-D3,Corvette,500,13,2600,3824
4,Artekeera Detection,SG3,Corvette,600,21,2900,7019
9,Coreward Group,Core300,Freighter,600,10,3000,3286
6,Aphador Cooperative,APH55,Destroyer,1150,22,5500,10234
5,Coreward Group,Core85,Destroyer,900,14,5000,5345
7,Osesk Lines,55Q-I3,Cruiser,1750,16,7600,9635
8,Artekeera Detection,SG6,Cruiser,1950,22,8200,14212
10,Ixodon Industries,Revealer,Superhauler,3000,10,7400,10462
11,Aphador Cooperative,APH750,Superhauler,3500,14,7800,16644
12,Ixodon Industries,Voidfinder,Battleship,3000,16,11000,13729
13,Artekeera Detection,SG10,Battleship,3600,22,11750,21919`;

const sensorFromLine = (line) => {
    const elements = line.split(',');
    return {
	id: elements[0],
	make: elements[1],
	model: elements[2],
	ss_type: elements[3],
	mass: parseKilo(elements[4]),
	strength: parseInt(elements[5]),
	power: parseKilo(elements[6]),
	price: parseInt(elements[7]),
    };
};

export const SENSORS = SENSORS_STRING.split('\n').map(sensorFromLine);

const SHIPSIMS_STRING = `3,Aphador Cooperative,MPL10,Interceptor,220,1000,400,500
1,Nebulan Yards,NY20,Interceptor,250,2000,600,1632
2,Bor Rai Cognition,BRC35,Interceptor,280,3500,900,4083
6,Aphador Cooperative,MP60,Corvette,850,6000,2200,7675
4,Sinseel Systems,SS70,Corvette,1000,7000,2600,9609
5,Nebulan Yards,NY95,Corvette,1200,9500,2900,16759
18,Aphador Cooperative,MPL-F,Freighter,1200,2500,3000,1141
9,Sinseel Systems,SS115,Destroyer,1600,11500,4500,19714
7,Bor Rai Cognition,BRC140,Destroyer,1800,14000,5000,27718
8,Nebulan Yards,NY165,Destroyer,2000,16500,5400,37048
12,Nebulan Yards,NY1150,Cruiser,3200,17000,7000,34542
13,Aphador Cooperative,MPL1400,Cruiser,3500,19500,6500,47164
10,Aphador Cooperative,MPL700,Cruiser,3500,19500,7600,43617
11,Bor Rai Cognition,BRC900,Cruiser,4000,24500,8000,67109
19,Nyaza Char'nae,NCN-S,Superhauler,6000,6000,7400,4184
14,Nyaza Char'nae,NCN1700,Battleship,6000,28500,11000,77444
15,Sinseel Systems,SS2100,Battleship,7000,31000,11500,89613
16,Nyaza Char'nae,NCN2500,Battleship,5500,26000,10500,65970
17,Bor Rai Cognition,BRC3000,Battleship,6000,28500,10000,81225`;

const shipsimFromLine = (line) => {
    const elements = line.split(',');
    return {
	id: elements[0],
	make: elements[1],
	model: elements[2],
	ss_type: elements[3],
	mass: parseKilo(elements[4]),
	cycles: parseKilo(elements[5]),
	power: parseKilo(elements[6]),
	price: parseInt(elements[7]),
    };
};

export const SHIPSIMS = SHIPSIMS_STRING.split('\n').map(shipsimFromLine);

export const getComponent = (superstructureId, masterList, componentId) => {
    const ss_type = SUPERSTRUCTURES.find(ss => ss.id === superstructureId).ss_type;
    const sublist = masterList
	  .filter(component => component.ss_type === ss_type);
    sublist.sort((a, b) => a.price - b.price);
    let value = componentId;
	console.log(componentId, sublist);
    if (!sublist.find(component => component.id === componentId)) {
	value = sublist[0].id;
	console.log(componentId, sublist);
    }
    return masterList.find(component => component.id === value);
};

const getModulesFromList = (masterList, count, moduleIds) => {
    const modules = [];
    for (let i = 0; i < count; i++) {
	if (moduleIds[i] && moduleIds[i].id) {
	    console.log(moduleIds, i);
	    const module = masterList.find(module => module.id === moduleIds[i].id);
	    modules.push({
		...moduleIds[i],
		...module,
	    });
	}
    }
    return modules;
};

export const getModules = (superstructureId, moduleIds) => {
    const superstructure = getComponent(superstructureId, SUPERSTRUCTURES, superstructureId);
    const { small, medium, large } = moduleIds;
    return {
	small: getModulesFromList(MODULES, superstructure.modules.small, small),
	medium: getModulesFromList(MODULES, superstructure.modules.medium, medium),
	large: getModulesFromList(MODULES, superstructure.modules.large, large),
    };
};

export const getWeapons = (superstructureId, moduleIds) => {
    const superstructure = getComponent(superstructureId, SUPERSTRUCTURES, superstructureId);
    const { small, medium, large } = moduleIds;
    return {
	small: getModulesFromList(WEAPONS, superstructure.weapons.small, small),
	medium: getModulesFromList(WEAPONS, superstructure.weapons.medium, medium),
	large: getModulesFromList(WEAPONS, superstructure.weapons.large, large),
    };
};

const isEnabled = ({ disabled }) => !disabled;
const sumPower = (acc, weapon) => acc + weapon.power;
const sumCycles = (acc, weapon) => acc + weapon.cycles;
const sumPrice = (acc, item) => acc + item.price;
const sumDps = (acc, item) => acc + item.dps;

export const shipStats = ({ superstructure, capacitor, shield, sensor, engine, shipsim, weapons, modules }) => {
    const massUsed = superstructure.mass + capacitor.mass + shield.mass + sensor.mass + engine.mass + shipsim.mass;
    
    const thrustRatio = engine.thrust / massUsed;

    const weaponsEnabled = [
	...weapons.small.filter(isEnabled),
	...weapons.medium.filter(isEnabled),
	...weapons.large.filter(isEnabled),
    ];
    const modulesEnabled = [
	...modules.small.filter(isEnabled),
	...modules.medium.filter(isEnabled),
	...modules.large.filter(isEnabled),
    ];
    
    const maxPower = superstructure.power;
    const weaponPower = weaponsEnabled.reduce(sumPower, 0);
    const modulePower = modulesEnabled.reduce(sumPower, 0);;
    const dps = weaponsEnabled.reduce(sumDps, 0);
    
    const powerUsed = capacitor.power + shield.power + sensor.power + engine.power + shipsim.power + weaponPower + modulePower;
    const powerLeft = maxPower - powerUsed;

    const maxCycles = shipsim.cycles;
    const weaponCycles = weaponsEnabled.reduce(sumCycles, 0);
    const moduleCycles  = modulesEnabled.reduce(sumCycles, 0);
    const cyclesLeft = maxCycles - weaponCycles - moduleCycles;

    const totalPrice = [
	superstructure,
	capacitor,
	shield,
	sensor,
	engine,
	shipsim,
	...weapons.small,
	...weapons.medium,
	...weapons.large,
	...modules.small,
	...modules.medium,
	...modules.large,
    ].reduce(sumPrice, 0);
    
    return {
	massUsed,
	maxPower,
	powerLeft,
	dps,
	thrustRatio,
	maxCycles,
	cyclesLeft,
	totalPrice,
    };
};
