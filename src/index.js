import './style.css';
import MethodsTasks from './modules/methods.js';
import { descriptFocusIn, descriptFocusOut } from './modules/interact.js';

const methods = new MethodsTasks();
const tasksList = document.querySelector('.tasks');
const newDescription = document.getElementById('i--1');
const submitBtn = document.getElementById('a--1');
const removeChecked = document.getElementById('removeChecked');

if (localStorage.getItem('tasks')) methods.tasks = JSON.parse(localStorage.getItem('tasks'));

methods.resetList(tasksList);

newDescription.addEventListener('keydown', (e) => {
  const description = newDescription.value;
  if (description.length > 0 && e.code === 'Enter') {
    e.preventDefault();
    methods.addTask(description, false, methods.tasks.length);
    methods.resetList(tasksList);
    localStorage.setItem('tasks', JSON.stringify(methods.tasks));
    newDescription.value = '';
  }
});

submitBtn.addEventListener('click', () => {
  const description = newDescription.value;
  if (description.length > 0) {
    methods.addTask(description, false, methods.tasks.length);
    methods.resetList(tasksList);
    newDescription.value = '';
    localStorage.setItem('tasks', JSON.stringify(methods.tasks));
  }
});

removeChecked.addEventListener('click', () => {
  const checkedDevs = document.querySelectorAll('.py-1.li.checked');
  if (checkedDevs.length > 0) {
    checkedDevs.forEach((dev) => {
      const index = dev.id.replace('d-', '');
      methods.removeTask(tasksList, index, dev);
    });
  }
});

tasksList.addEventListener('click', (e) => {
  const element = e.target.id.substring(0, 2);
  let idIndex = e.target.id.substring(2, e.target.id.length);
  if (element === 'c-') {
    methods.clickCheckbox(e.target.id);
    localStorage.setItem('tasks', JSON.stringify(methods.tasks));
  } else if (element === 'b-' || element === 'tr' || element === 'mo') {
    if (element === 'mo' || element === 'tr') idIndex = e.target.id.substring(5, e.target.id.length);
    const task = document.getElementById(`d-${idIndex}`);
    methods.removeTask(tasksList, idIndex, task);
    methods.resetList(tasksList);
    localStorage.setItem('tasks', JSON.stringify(methods.tasks));
  }
});

tasksList.addEventListener('focusin', (e) => {
  const element = e.target.id.substring(0, 2);
  if (element === 't-') {
    descriptFocusIn(e.target.id);
  }
});

tasksList.addEventListener('focusout', (e) => {
  const element = e.target.id.substring(0, 2);
  if (element === 't-') {
    descriptFocusOut(e.target.id);
  }
});

tasksList.addEventListener('change', (e) => {
  const element = e.target.id.substring(0, 2);
  const idIndex = e.target.id.substring(2, e.target.id.length);
  if (element === 't-') {
    methods.tasks[idIndex].description = e.target.value;
    localStorage.setItem('tasks', JSON.stringify(methods.tasks));
  }
});
