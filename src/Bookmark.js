export const getDefaultState = () => {
    if (window.location.search) {
        try {
            const input = decodeURI(window.location.search.substring(1));
            const base = JSON.parse(input);
            return expand(base);
        } catch (e) {
            console.log(e);
        }
    }
    return {
        ssType: 'Interceptor',
        superstructure: '20',
        capacitor: null,
        engine: null,
        shield: null,
        shipsim: null,
        sensor: null,
        modules: [],
        weapons: [],
        mods: [],
    };
};

export const expand = ({
    t,
    ss,
    cap,
    eng,
    shd,
    sim,
    sen,
    mdl,
    wep,
    mod,
}) => ({
    ssType: t,
    superstructure: ss,
    capacitor: cap,
    engine: eng,
    shield: shd,
    shipsim: sim,
    sensor: sen,
    modules: mdl.map((id) => ({ id, disabled: false, ammo: 'kinetic' })),
    weapons: wep.map(([id, disabled, ammo]) => ({ id, disabled, ammo })),
    mods: mod.map(([id, level]) => ({ id, level })),
});

export const simplify = ({
    ssType,
    superstructure,
    capacitor,
    engine,
    shield,
    shipsim,
    sensor,
    modules,
    weapons,
    mods,
}) => ({
    t: ssType,
    ss: superstructure,
    cap: capacitor,
    eng: engine,
    shd: shield,
    sim: shipsim,
    sen: sensor,
    mdl: modules.map(({ id }) => id),
    wep: weapons.map(({ id, disabled, ammo }) => [id, disabled, ammo]),
    mod: mods.map(({ id, level }) => [id, level]),
});