import {
  directions,
  totalTrials,
  WAIT_MIN,
  WAIT_MAX
} from '../data.js';

import { state } from '../state.js';

import {
  Arena,
  setArena
} from './Arena.js';

import {
  updateStats
} from './Stats.js';

import {
  renderHistory
} from './History.js';


export function Experiment() {

  return `
    <section
      class="panel experiment"
      aria-label="반응속도 실험"
    >

      <div class="experiment-head">

        <div>

          <div class="label">
            Live test
          </div>

          <div
            style="
              margin-top:6px;
              font-size:13px;
              color:var(--muted)
            "
          >
            화면의 화살표 방향에 맞춰 키를 누르세요
          </div>

        </div>

        <div class="trial-count">

          <span id="trialNow">
            0
          </span>

          /

          <span>
            ${totalTrials}
          </span>

          <small>
            TRIALS
          </small>

        </div>

      </div>

      ${Arena()}

      <div class="controls">

        <button
          id="startBtn"
          class="primary"
        >
          실험 시작
        </button>

        <button
          id="resetBtn"
          class="secondary"
        >
          기록 초기화
        </button>

      </div>

    </section>
  `;
}


export function initExperiment() {

  const startBtn =
    document.getElementById(
      'startBtn'
    );

  const resetBtn =
    document.getElementById(
      'resetBtn'
    );

  startBtn.addEventListener(
    'click',
    start
  );

  resetBtn.addEventListener(
    'click',
    reset
  );
}


function start() {

  clearTimeout(state.timer);

  state.records = [];
  state.trial = 0;
  state.active = true;

  document.getElementById(
    'startBtn'
  ).textContent = '측정 중...';

  updateStats(
    state.records
  );

  renderHistory(
    state.records
  );

  nextTrial();
}


function nextTrial() {

  if (state.trial >= totalTrials) {
    finish();
    return;
  }

  state.trial += 1;

  document.getElementById(
    'trialNow'
  ).textContent =
    state.trial;

  state.currentDirection =
    directions[
      Math.floor(
        Math.random() *
        directions.length
      )
    ];

  state.waiting = true;

  setArena(
    'waiting',
    '·',
    '집중하세요',
    '초록색 화면과 방향 신호를 기다리세요'
  );

  const delay =
    WAIT_MIN +
    Math.random() *
    (WAIT_MAX - WAIT_MIN);

  state.timer = setTimeout(
    () => {

      state.waiting = false;

      state.cueAt =
        performance.now();

      setArena(
        'ready',
        state.currentDirection.symbol,
        state.currentDirection.label,
        '지금! 방향키를 누르세요'
      );

    },
    delay
  );
}


export function registerInput(key) {

  if (!state.active) {
    return;
  }


  // 너무 빨리 누른 경우

  if (state.waiting) {

    clearTimeout(
      state.timer
    );

    state.records.push({
      trial: state.trial,
      direction: state.currentDirection,
      valid: false
    });

    setArena(
      'early',
      '!',
      '너무 빨라요',
      '신호가 나타난 뒤에 방향키를 누르세요'
    );

    updateStats(
      state.records
    );

    renderHistory(
      state.records
    );

    state.timer =
      setTimeout(
        nextTrial,
        650
      );

    return;
  }


  if (!state.currentDirection) {
    return;
  }


  const time = Math.round(
    performance.now() -
    state.cueAt
  );

  const valid =
    key ===
    state.currentDirection.key;


  state.records.push({
    trial: state.trial,
    direction: state.currentDirection,
    time,
    valid
  });


  updateStats(
    state.records
  );

  renderHistory(
    state.records
  );


  if (valid) {

    setArena(
      'success',
      '✓',
      `${time} ms`,
      '좋아요. 다음 방향을 준비하세요'
    );

  } else {

    setArena(
      'miss',
      '×',
      '방향 오류',
      `정답은 ${state.currentDirection.label}입니다`
    );

  }


  state.timer =
    setTimeout(
      nextTrial,
      650
    );
}


function finish() {

  state.active = false;
  state.waiting = false;

  clearTimeout(
    state.timer
  );

  document.getElementById(
    'startBtn'
  ).textContent =
    '다시 실험하기';


  const values =
    state.records
      .filter(record => record.valid)
      .map(record => record.time);


  const average = values.length
    ? Math.round(
        values.reduce(
          (a, b) => a + b,
          0
        ) / values.length
      )
    : 0;


  setArena(
    'success',
    '✓',
    '측정 완료',
    `${values.length}회 유효 반응 · 평균 ${average} ms`
  );
}


function reset() {

  clearTimeout(
    state.timer
  );

  state.records = [];
  state.trial = 0;

  state.active = false;
  state.waiting = false;

  state.currentDirection =
    null;


  document.getElementById(
    'trialNow'
  ).textContent = '0';


  document.getElementById(
    'startBtn'
  ).textContent =
    '실험 시작';


  updateStats(
    state.records
  );

  renderHistory(
    state.records
  );


  setArena(
    'waiting',
    '+',
    '테스트를 시작하세요',
    '화면이 초록색이 되고 방향이 나타나면 즉시 반응합니다.'
  );
}
