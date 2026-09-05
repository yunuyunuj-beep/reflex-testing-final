export function Stats() {
  return `
    <section class="panel stats">

      <div class="label">
        Session data
      </div>

      <h2 class="section-title">
        현재 세션 기록
      </h2>

      <div class="stat-grid">

        <div class="stat">

          <div class="label">
            평균 반응시간
          </div>

          <div
            class="number"
            id="average"
          >
            — <span class="unit">ms</span>
          </div>

        </div>

        <div class="stat">

          <div class="label">
            최고 기록
          </div>

          <div
            class="number"
            id="best"
          >
            — <span class="unit">ms</span>
          </div>

        </div>

        <div class="stat">

          <div class="label">
            완료 시도
          </div>

          <div
            class="number"
            id="completed"
          >
            0 <span class="unit">회</span>
          </div>

        </div>

        <div class="stat">

          <div class="label">
            일관성
          </div>

          <div
            class="number"
            id="consistency"
          >
            — <span class="unit">%</span>
          </div>

          <div class="meter">
            <i id="consistencyMeter"></i>
          </div>

        </div>

      </div>

    </section>
  `;
}

export function updateStats(records) {

  const values = records
    .filter(record => record.valid)
    .map(record => record.time);

  const average = values.length
    ? Math.round(
        values.reduce(
          (sum, value) => sum + value,
          0
        ) / values.length
      )
    : null;

  const best = values.length
    ? Math.min(...values)
    : null;

  const spread = values.length > 1
    ? Math.max(...values) -
      Math.min(...values)
    : null;

  const consistency =
    spread === null
      ? null
      : Math.max(
          0,
          Math.round(
            100 -
            (spread / average * 100)
          )
        );

  document.getElementById('average')
    .innerHTML =
      average === null
        ? '— <span class="unit">ms</span>'
        : `${average} <span class="unit">ms</span>`;

  document.getElementById('best')
    .innerHTML =
      best === null
        ? '— <span class="unit">ms</span>'
        : `${best} <span class="unit">ms</span>`;

  document.getElementById('completed')
    .innerHTML =
      `${values.length} <span class="unit">회</span>`;

  document.getElementById('consistency')
    .innerHTML =
      consistency === null
        ? '— <span class="unit">%</span>'
        : `${consistency} <span class="unit">%</span>`;

  document.getElementById(
    'consistencyMeter'
  ).style.width =
    `${consistency || 0}%`;
}
