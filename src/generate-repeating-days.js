/**
 * Генерируем разметку - Итерируемся по объекту; вставляем ключи и значения в разметку (строку)
 * @param {Object} repeatingDays - Объетк (ключ: сокращенное название дня недели (строка), значение: повторяется ли задача (boolean))
 * @return {String} - разметку с заполненными данными о том, повторяется ли задача в любой день недели
 */
export const generateRepeatingDays = (repeatingDays) => {
  const repeatingDaysLayout = Object.keys(repeatingDays).map((key) => `
    <input class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-${key}-1"
            name="repeat"
            value="${key}"
            ${repeatingDays[key] ? `checked` : ``}
    >
    <label class="card__repeat-day" for="repeat-${key}-1">
      ${key}
    </label>
    `).join(``);

  return (
    `<div class="card__repeat-days-inner">
      ${repeatingDaysLayout}
    </div>`
  );
};
