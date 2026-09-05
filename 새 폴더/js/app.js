import { Header } from './components/Header.js';

import {
  Experiment,
  initExperiment,
  registerInput
} from './components/Experiment.js';

import { Stats } from './components/Stats.js';

import { History } from './components/History.js';

import { Footer } from './components/Footer.js';


const app =
  document.getElementById('app');


app.innerHTML = `

  ${Header()}

  <div class="layout">

    <div>
      ${Experiment()}
    </div>

    <aside class="side">

      ${Stats()}

      ${History()}

    </aside>

  </div>

  ${Footer()}

`;


initExperiment();


document.addEventListener(
  'keydown',
  event => {

    const allowedKeys = [
      'ArrowLeft',
      'ArrowUp',
      'ArrowDown',
      'ArrowRight'
    ];

    if (
      !allowedKeys.includes(
        event.key
      )
    ) {
      return;
    }

    event.preventDefault();

    registerInput(
      event.key
    );
  }
);
