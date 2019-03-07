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
