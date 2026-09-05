export function History() {
  return `
    <section class="panel history">

      <div class="history-head">

        <h2 class="section-title">
          시도별 기록
        </h2>

        <span class="hint">
          최근 순
        </span>

      </div>

      <div class="table-wrap">

        <table>

          <thead>
            <tr>
              <th>#</th>
              <th>방향</th>
              <th>결과</th>
            </tr>
          </thead>

          <tbody id="historyBody">

            <tr>
              <td
                colspan="3"
                class="empty"
              >
                아직 측정값이 없습니다.
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </section>
  `;
}

export function renderHistory(records) {

  const historyBody =
    document.getElementById(
      'historyBody'
    );

  if (!records.length) {

    historyBody.innerHTML = `
      <tr>
        <td
          colspan="3"
          class="empty"
        >
          아직 측정값이 없습니다.
        </td>
      </tr>
    `;

    return;
  }

  historyBody.innerHTML =
    records
      .slice()
      .reverse()
      .map(record => `
        <tr>

          <td>
            ${record.trial}
          </td>

          <td>
            <span class="direction-pill">
              ${record.direction.symbol}
            </span>
          </td>

          <td>
            ${
              record.valid
                ? `${record.time} ms`
                : '<span style="color:var(--coral)">오입력</span>'
            }
          </td>

        </tr>
      `)
      .join('');
}
