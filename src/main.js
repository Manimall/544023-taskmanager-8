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
    .fill(null)
    .map(() => {
      const data = createCard();

      const task = new Task(data);
      const taskEdit = new TaskEdit(data);

      // task.onEdit = () => {
      //   taskEdit.render();
      //   taskContainer.replaceChild(taskEdit.element, task.element);
      //   task.unrender();
      // };

      // taskEdit.onSubmit = () => {
      //   task.render();
      //   taskContainer.replaceChild(task.element, taskEdit.element);
      //   taskEdit.unrender();
      // };

      return {
        task,
        taskEdit,
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

    // taskContainer.appendChild(tasks(TASKS_COUNT));
    // taskContainer.appendChild(tasks(TASKS_COUNT).task.render(createTemplate));
    // insertCardsBlock(taskContainer, clickedFilterAmount.textContent);
  }
};

// вставляем карточки с тасками и фильтры на страницу
insertFiltersBlock(filterSection);

tasks(TASKS_COUNT).forEach((el, index) => {
  const singleTask = el.task;
  singleTask.id = index;

  const singleTaskEdit = el.taskEdit;
  singleTaskEdit.id = index;

  const renderedTask = singleTask.render(createTemplate);

  singleTask._onEdit = () => {
    singleTaskEdit.render(createTemplate);
    taskContainer.replaceChild(singleTaskEdit._element, singleTask._element);
    singleTask.unrender();
  };

  singleTaskEdit._onSubmit = () => {
    singleTask.render(createTemplate);
    taskContainer.replaceChild(singleTask._element, singleTaskEdit._element);
    singleTaskEdit.unrender();
  };

  taskContainer.appendChild(renderedTask);
});

// insertCardsBlock(taskContainer, TASKS_COUNT);

// добавляем обработчик события click для отрисованных фильтров
filterSection.addEventListener(`click`, filterClickHandler);
