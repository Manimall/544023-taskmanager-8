// Импорт относительно текущего модуля
import {getRandomNumber} from './helpers.js';
import {filters} from './filters-data.js';
import {card} from './cards-data.js';
import {renderSingleFilter} from './generate-filter.js';
import {generateSingleCard} from './generate-task.js';

const filterSection = document.querySelector(`.main__filter`); // секция, куда нужно вставить сгенерированные фильтры
const cardsSection = document.querySelector(`.board__tasks`); // секция для вставки сгенерированных карточек

const START_CARDS_COUNT = 7; // изначальное кол-во карточек

/**
 * Вставляем разметку фильтров в нужный блок на страницу
 * @param {HTMLElement} filterBlock - элемент для вставки массива фильтров
 */
const insertFiltersBlock = (filterBlock) => {
  const renderedFilter = filters.map(renderSingleFilter).join(``); // делаем из массива строку
  filterBlock.insertAdjacentHTML(`afterbegin`, renderedFilter);
};

/**
 * Вставляем отрисованные карточки в разметку в нужный блок на странице
 * @param {HTMLElement} cardsBlock - элемент, в который мы поместим все карточки
 * @param {number} cardsAmount - кол-во карточек, которые надо отрисовать
 */
const insertCardsBlock = (cardsBlock, cardsAmount) => {
  const renderedCards = new Array(parseInt(cardsAmount, 10)) // создаем пустой массив из необходимого кол-ва объектов
    .fill() // заполняем этот массив 7 undefined
    .map(generateSingleCard(card)) // создаем новый массив, выполнив функцию generateSingleCard на каждом элементе массива
    .join(``); // превращаем массив в строку

  cardsBlock.innerHTML = renderedCards;
};

/**
 * Функция - обработчик события клика на фильтр;
 * она очищает контейнер карточек от ранее созданных задач и добавляет случайное количество новых задач
 * @param {evt} evt - событие, на котором зафиксирован клик
 */
const filterClickHandler = (evt) => {
  const clickedFilter = evt.target.closest(`.filter__label`);
  if (clickedFilter) {
    let clickedFilterAmount = clickedFilter.querySelector(`span`);
    const randomNewTasksNumber = getRandomNumber();
    clickedFilterAmount.textContent = randomNewTasksNumber;
    insertCardsBlock(cardsSection, clickedFilterAmount.textContent);
  }
};

// вставляем карточки с тасками и фильтры на страницу
insertFiltersBlock(filterSection);
insertCardsBlock(cardsSection, START_CARDS_COUNT);

// добавляем обработчик события click для отрисованных фильтров
filterSection.addEventListener(`click`, filterClickHandler);
