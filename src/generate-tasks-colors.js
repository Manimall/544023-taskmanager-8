import {Colors} from './tasks-data';

const returnColorsTemplate = (color) => {
  const getAllColors = Object.keys(Colors).reduce((acc, key) => {
    return (
      acc +=
      `<input type="radio"
              id="color-${key}-1"
              class="card__color-input card__color-input--${key} visually-hidden"
              name="color"
              value="${key}"
              ${color === key && `checked`}>
      <label for="color-${key}-1" class="card__color card__color--${key}">
            ${key}
      </label>`
    );
  }, ``);

  return `
    <div class="card__colors-wrap">
      ${getAllColors}
    </div>
  `;
};

export {returnColorsTemplate};
