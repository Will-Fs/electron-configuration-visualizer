
export const orbtialLetters = {
    0: "s",
    1: "p",
    2: "d",
    3: "f"
}

const orbitalFillOrder = [
    '1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p', '8s'
];

const createEnergyLevel = (n) => {
    const orbitals = {}
    for (let l = 0; l < n; l++) {
        let orientations = [];
        for (let m = -l; m <= l; m++) { 
            orientations.push(m === -0? 0 : m);
        }
        orbitals[l] = orientations;
    }
    return orbitals;
}

export const createConfiguration = (numLevels) => {
    const levels = [];
    for (let level = 1; level <= numLevels; level++) {
        levels.push(createEnergyLevel(level));
    }
    return {
        levels: levels,
        numLevels: numLevels
    };
}



const fillOrbital = (numElectrons, configurations) => {
    const _fillOrbital = (numElectrons, symbol) => {
        for (const configuration in configurations) {
            configurations[configuration].innerHTML += symbol;
            numElectrons--;
            if (numElectrons === 0)
                return 0;
        }
        return numElectrons;
    }

    numElectrons =  _fillOrbital(numElectrons, "↑");
    if (numElectrons === 0)
        return 0;
    return _fillOrbital(numElectrons, "↓");
}

const clearConfigurations = (configurations) => {
    configurations.forEach(configuration => {
        configuration.innerHTML = "";
    })
}

export const fillOrbitals = (numElectrons) => {
    for (let orbital in orbitalFillOrder) {
        orbital = orbitalFillOrder[orbital];
        const configurations = Array.from(document.querySelectorAll(`.${orbital[1]}${orbital[0]}`));
        clearConfigurations(configurations);
        numElectrons = fillOrbital(numElectrons, configurations);
        if (numElectrons === 0)
            return;
    }
}