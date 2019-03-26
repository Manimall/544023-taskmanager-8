import {getRandomNumber} from './helpers.js';
import {filters} from './filters-data.js';
import {createCard} from './tasks-data.js';
import {renderSingleFilter} from './generate-filter.js';
import {Task} from './task.js';
import {TaskEdit} from './task-edit.js';


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


const createTasks = (cardsAmount) => {
  return new Array(cardsAmount).fill(null).map((el, id) => createCard(id));
};


const getReadyTasks = (tasksAmount) => {

  createTasks(tasksAmount).forEach((el) => {

    const singleTask = new Task(el);
    const singleTaskEdit = new TaskEdit(el);

    const renderedTask = singleTask.render();

    singleTask.onEdit = () => {

      singleTaskEdit.render();
      taskContainer.replaceChild(singleTaskEdit.element, singleTask.element);
      singleTask.unrender();
    };

    singleTaskEdit.onSubmit = (newObject) => {
      Object.assign(el, newObject);

      singleTask.update(el);

      singleTask.render();
      taskContainer.replaceChild(singleTask.element, singleTaskEdit.element);
      singleTaskEdit.unrender();
    };

    taskContainer.appendChild(renderedTask);
  });
};

getReadyTasks(TASKS_COUNT);


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
    taskContainer.innerHTML = ``;
    getReadyTasks(randomNewTasksNumber);
  }
};

// вставляем карточки с тасками и фильтры на страницу
insertFiltersBlock(filterSection);

// добавляем обработчик события click для отрисованных фильтров
filterSection.addEventListener(`click`, filterClickHandler);
