import {getRandomNumber} from './helpers.js';
import {filters} from './filters-data.js';
import {createCard} from './tasks-data.js';
import {renderSingleFilter} from './generate-filter.js';
import {Task} from './task.js';
import {TaskEdit} from './task-edit.js';
import {generateEditTask, generateDefaultTask} from './template.js';

const TASKS_COUNT = 7; // изначальное кол-во карточек по ТЗ

const filterSection = document.querySelector(`.main__filter`); // секция, куда нужно вставить сгенерированные фильтры
const taskContainer = document.querySelector(`.board__tasks`); // секция для вставки сгенерированных карточек

/**
 * Вставляем разметку фильтров в нужный блок на страницу
 * @param {HTMLElement} filterBlock - элемент для вставки массива фильтров
 */
const insertFiltersBlock = (filterBlock) => {
  const renderedFilter = filters.map(renderSingleFilter).join(``); // делаем из массива строку
  filterBlock.insertAdjacentHTML(`afterbegin`, renderedFilter);
};

for (let i = 0; i < TASKS_COUNT; i++) {
  const data = createCard();

  const task = new Task(data);
  const taskEdit = new TaskEdit(data);

  task.onEdit = () => {
    taskEdit.render(generateEditTask);
    taskContainer.replaceChild(taskEdit._element, task._element);
    task.unrender();
  };

  taskEdit.onSubmit = () => {
    task.render(generateDefaultTask);
    taskContainer.replaceChild(task._element, taskEdit._element);
    taskEdit.unrender();
  };

  const renderedTask = task.render(generateDefaultTask);

  taskContainer.appendChild(renderedTask);
}

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
  }
};

// вставляем карточки с тасками и фильтры на страницу
insertFiltersBlock(filterSection);

// insertCardsBlock(taskContainer, TASKS_COUNT);

// добавляем обработчик события click для отрисованных фильтров
filterSection.addEventListener(`click`, filterClickHandler);
