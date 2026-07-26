class HpIndicator {
  static render(currentHp, maxHp) {
    const PROCENT = (currentHp * 100) / maxHp;

    return `
      <div class="hp_indicator__container">
        <div class="hp_indicator__indicator" style="width: ${PROCENT}%;"></div>
      </div>
      <div class="hp_value__container">
        ${currentHp} / ${maxHp}
      </div>
    `;
  }
}
