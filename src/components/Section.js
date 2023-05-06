export class Section {
  constructor({ renderer }, containerSelector) {
    //renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
    this._renderer = renderer;
    //селектор контейнера, в который нужно добавлять созданные элементы.
    this._container = document.querySelector(containerSelector);
  }
  //принимает DOM-элемент и добавляет его в HTML разметку
  addItemServer(element) {
    this._container.append(element);
  }
  addItemUser(element) {
    this._container.prepend(element);
  }
  // Метод удаляет всё содержимое поля _container
  _clear() {
    this._container.innerHTML = '';
  }
  //метод, который отвечает за отрисовку всех элементов переданных в массиве данных
  renderItems(array) {
    this._clear();
    array.forEach(item => {
      this._renderer(item);
    });
  }
}
