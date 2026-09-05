export const state = {
  records: [],
  trial: 0,

  currentDirection: null,
  cueAt: 0,

  timer: null,

  active: false,
  waiting: false
};

export function resetState() {
  state.records = [];
  state.trial = 0;

  state.currentDirection = null;
  state.cueAt = 0;

  state.timer = null;

  state.active = false;
  state.waiting = false;
}
