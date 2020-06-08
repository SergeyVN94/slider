# slider - виджет для сайта, оформленный в JQuery плагин.

## Демо
https://sergeyvn94.github.io/site2/

### Установка
git clone https://github.com/SergeyVN94/slider.git && cd slider && npm i && npm run-script build
 
npm run-script test - Запуск тестов с помощью KarmaJS и PhantomJS.  


# Архитектура приложения
Приложение построено на основе идей и архетиктурный решений MVC. Контроллер заменен на презентер.

![alt text](/docs/uml.png)

Слои:
+ Доменная модель
+ Представление

## Слой представления:
Разделен на презентер и вид. 

### Презентер
Реализует интерфейс SliderPresenter.  
Подписывается на события модели и вида. Отвечает за обмен данными между ними.  

### Вид
Обозначения:
+ Точка - элемент, который перемещают по сладеру.
+ Слайдер - виджет для выбора значений, по которому перемещают точку.
+ Тултип - элемент, расположеный рядом с точкой, и отображающий ее значение в текущей позиции, в соответствии со шкалой.
+ Фоновая линия - линия отрисовывается для отображения выбранного диапазона.

Реализует интерфейс ISliderView.
Задача вида взаимодействовать со структурой сладера в DOM и реагировать на события пользователя.  
Когда пользователь взаимодействует со сладером, вид определяет, где хотят установить значение и отправляет данные слушателю.  
В данные входит целевая позиция (куда кликнул пользователь или попытался переместить точку)  
и индекс точки (если точка не выбрана, индекс равен -1).

Когда приходят данные для обновления, используется драйвер вида, для обновления точек, тултипов, фоновой линии.

#### Драйвер вида
Реализует интерфейс ISliderViewDriver.  
Предназначен для того, что бы абстрагироваться от внешних различий сладера (горизонтальный и вертикальный вид).
Предоставляет методы для получения и установки позиций точек, установки позиции тултипов и отрисовки фоновой линии.


## Доменная модель
Основные элементы:
+ Ядро.
+ Менеджер данных.
+ Драйвер шкалы
+ Библиотека функций общего назначения.
+ Модель - внешнее api.

Доменная модель обрабатывает состояние абстрактного сладера. 
Абстрактный сладер состоит из следующих элементов:
+ Количество шагов сладера - максимальное количество шагов сладера от 0 до N. Вычисляется на основе шкалы.
+ Шаги точек - Позиции точек в диапазоне шагов сладера.

Количество шагов сладера вычисляется по следующим формулам:
+ Для массива строк: (длинна массива - 1).
+ Для диапазона чисел: ((максимальное значение - минимальное значение) / шаг). Округляется в меньшую сторону для нецелых чисел, что бы не было выхода за диапазон шкалы.

### Ядро
Реализует интерфейс ISliderModelCore.
Отвечает за перерасчет позиций точек в шагах.

### Менеджер данных
Реализует интерфейс ISliderModelDataManager.
Педоставляет доступ к данным:
+ Размер шага
+ Шкала
+ Количество шагов сладера
+ Шаги точек - массив из чисел диапазона значений сладера
+ Тип шкалы

### Драйвер шкалы
Реализует интерфейс ISliderScaleDriver.
Помогает абстрагироваться от типа шкалы. Благодаря этому сладер может работать как с диапазоном чисел, так и с массивом строк.

### Библиотека функций общего назначения
Содержит общие функции, которые использует модель.

### Модель
Реализует интерфейс ISliderModel.
Предоставляет внешний интерфейс к функционалу доменной модели. Оповещает слушателей об обновлении модели.


## Обмен данными между слоями
Что бы добиться наибольшей изолированности слоев, пакеты обмена данными должны соответствовать определенным параметрам.
Модель получает объект с двумя полями. Поле целевой позиции - место на сладере, куда пользователь хочет установить значение. Поле индекса выбранной точки - индекс точки, которую хочет переместить пользователь.
Для обновления модели извне можно использовать массив значений. Например для диапазона значений можно передать массив чисел, и точки будут установлены в соответствии с этими значениями.

Вид получает массив объектов с состоянием точки. В таком объекте находиться позиция точки ввиде числа от 0 до 1, и значение точки на шкале сладера.
