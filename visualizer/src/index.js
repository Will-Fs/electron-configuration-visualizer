import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './orbitalConfigurations'
import { createConfiguration, orbtialLetters, fillOrbitals, orbitalConfigs } from './orbitalConfigurations';
import { v4 as uuidv4 } from 'uuid';

class Config extends React.Component {
  render(configuration) {
    this.props = configuration

    let energyLevels = [];

    let n = 1;
    configuration.levels.forEach(level => {
      let orbitals = [];
      for (const [configNum, configs] of Object.entries(level)) {
        let allConfigs = [];
        const configID = `${orbtialLetters[configNum]}${n}`
        const classes = `config ${configID}`;
        for (let l = 0; l < configs.length; l++) {
          allConfigs.push(<div key={uuidv4()} className={classes}></div>);
        }
        orbitals.push(<div key={uuidv4()} className="configurations-container"><p className="config-label">{n}{orbtialLetters[configNum]}</p>{allConfigs}</div> );
      }

      energyLevels.push(
        <div key={uuidv4()} className="level">
          <p key={uuidv4()} className="level-label">Level { n }</p>
          { orbitals }
        </div>
      )
      n++;
    })
    return (
      <div className="TEST">
       { energyLevels }
      </div>
    )
  }
}

const configRoot = ReactDOM.createRoot(
  document.querySelector(".content-container")
);

const renderOrbitals = () => {
  const energyLevel = Math.max(document.querySelector("#energy-level").value, 1);
  const config = createConfiguration(energyLevel);
  const div = new Config().render(config);
  configRoot.render(div);
}

renderOrbitals();

document.querySelector("#energy-level").onchange = (e) => {
  e.target.value = Math.min(Math.max(e.target.value, 1), 8);
  renderOrbitals();
}

document.querySelector("#num-electrons").onchange = (event) => {
  event.target.value = Math.min(Math.max(event.target.value, 1), 118);
  renderOrbitals()
  setTimeout(() => {
    fillOrbitals(document.querySelector("#num-electrons").value);
    const configP = document.querySelector("#configuration");
    configP.innerHTML = "Configuration: ";
    for (const [orbital, number] of Object.entries(orbitalConfigs)) {
      configP.innerHTML += `${orbital}<sup>${number}</sup>`;
    }
  }, 0);
}