export function Arena() {
  return `
    <div
      id="arena"
      class="arena waiting"
      role="status"
      aria-live="polite"
    >
      <div>

        <div
          id="arenaIcon"
          class="arena-icon"
        >
          +
        </div>

        <h2 id="arenaTitle">
          테스트를 시작하세요
        </h2>

        <p id="arenaText">
          화면이 초록색이 되고 방향이 나타나면 즉시 반응합니다.
        </p>

      </div>
    </div>
  `;
}

export function setArena(
  state,
  icon,
  title,
  text
) {
  const arena =
    document.getElementById('arena');

  const arenaIcon =
    document.getElementById('arenaIcon');

  const arenaTitle =
    document.getElementById('arenaTitle');

  const arenaText =
    document.getElementById('arenaText');

  arena.className = `arena ${state}`;

  arenaIcon.textContent = icon;
  arenaTitle.textContent = title;
  arenaText.textContent = text;
}
