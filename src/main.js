// Импорт относительно текущего модуля
import {getRandomNumber} from './helpers.js';
import {filters} from './filters-data.js';
import {createCard} from './tasks-data.js';
import {renderSingleFilter} from './generate-filter.js';
// import {generateSingleCard} from './generate-task.js';
import {Task} from './task.js';
import {TaskEdit} from './task-edit.js';
import {createTemplate} from './template.js';

const filterSection = document.querySelector(`.main__filter`); // секция, куда нужно вставить сгенерированные фильтры
const taskContainer = document.querySelector(`.board__tasks`); // секция для вставки сгенерированных карточек

const TASKS_COUNT = 7; // изначальное кол-во карточек по ТЗ

/**
 * Вставляем разметку фильтров в нужный блок на страницу
 * @param {HTMLElement} filterBlock - элемент для вставки массива фильтров
 */
const insertFiltersBlock = (filterBlock) => {
  const renderedFilter = filters.map(renderSingleFilter).join(``); // делаем из массива строку
  filterBlock.insertAdjacentHTML(`afterbegin`, renderedFilter);
};

// /**
//  * Вставляем отрисованные карточки в разметку в нужный блок на странице
//  * @param {HTMLElement} cardsBlock - элемент, в который мы поместим все карточки
//  * @param {number} cardsAmount - кол-во карточек, которые надо отрисовать
//  */
// const insertCardsBlock = (cardsBlock, cardsAmount) => {
//   const renderedCards = new Array(parseInt(cardsAmount, 10)) // создаем пустой массив из необходимого кол-ва объектов
//     .fill() // заполняем этот массив 7 undefined
//     .map((card, index) => generateSingleCard(createCard(card, index))) // изменяем массив, выполнив функцию generateSingleCard на каждом элементе массива
//     .join(``); // превращаем массив в строку

//   cardsBlock.innerHTML = renderedCards;
// };

const tasks = (cardsAmount) => {
  return new Array(parseInt(cardsAmount, 10))
    .fill()
    .map(() => {
      const data = createCard();

      const task = new Task(data);
      const editTask = new TaskEdit(data);

      task.onEdit = () => {
        editTask.render();
        taskContainer(editTask.element, task.element);
        task.unrender();
      };

      editTask.onSubmit = () => {
        task.render();
        taskContainer(task.element, editTask.element);
        editTask.unrender();
      };
    });
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

    taskContainer.appendChild(tasks(TASKS_COUNT).task.render(createTemplate));
    // insertCardsBlock(taskContainer, clickedFilterAmount.textContent);
  }
};

// вставляем карточки с тасками и фильтры на страницу
insertFiltersBlock(filterSection);
taskContainer.appendChild(tasks(TASKS_COUNT).task.render(createTemplate()));
// insertCardsBlock(taskContainer, TASKS_COUNT);

// добавляем обработчик события click для отрисованных фильтров
filterSection.addEventListener(`click`, filterClickHandler);
