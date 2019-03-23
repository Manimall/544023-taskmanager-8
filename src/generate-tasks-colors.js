const returnColorsTemplate = (colors, color) => {
  const getAllColors = Object.keys(colors).map((key) => {
    return (
      `<input type="radio"
              id="color-${key}-1"
              class="card__color-input card__color-input--${key} visually-hidden"
              name="color"
              value="${key}"
              ${color === key && `checked`}>
      <label for="color-${key}-1" class="card__color card__color--${key}">
            ${key}
      </label>`
    ).trim();
  }).join(``);

  return `
    <div class="card__colors-wrap">
      ${getAllColors}
    </div>
  `;
};

export {returnColorsTemplate};
