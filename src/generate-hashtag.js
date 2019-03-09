/**
 * Генерируем Хэштеги для таска
 * @param {Set} hashTagsSet - Сет допустимых хэштегов
 * @return {String} - заполненную строку (разметку) с переданными хэштегами
 */
export const generateTags = (hashTagsSet) => {
  return [...hashTagsSet]
  .map((item) => `
  <span class="card__hashtag-inner">
    <input type="hidden"
       name="hashtag"
       value="${item}"
       class="card__hashtag-hidden-input"
    />
    <button type="button" class="card__hashtag-name">
      #${item}
    </button>
    <button type="button" class="card__hashtag-delete">
      delete
    </button>
  </span>`)
  .join(``);
};
