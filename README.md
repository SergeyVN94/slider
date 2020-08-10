# slider - виджет для сайта, оформленный в JQuery плагин.

## Демо
https://sergeyvn94.github.io/slider/

## Установка
`git clone https://github.com/SergeyVN94/slider.git && cd slider && npm i && npm run-script build` - Установка и сборка.
 
`npm run-script test` - Запуск тестов с помощью KarmaJS и PhantomJS.  

## Подключение

Скоприруйте папку `plugin` из `dist` в корень вашего сайта. В `index.html` добавте следующие строки:  
```
<head>
  <link rel="stylesheet" href="plugin/slider.css">
</head>
<body>
  // контент страницы
  <script type="text/javascript" src="plugin/slider.js"></script>
</body>
```

## Использование
```
$('#slider').slider(command[, argument]);
```

## Команды:
* `init` - Инициализация сладера.  
Всегда возвращает объект JQuery.  
Ожидает параметром объект с конфигом. Если вызывается без параметров, инициализирует дефолтными значениями.
* `step` - Размер шага.  
Возвращает объект JQuery. Ожидает в качестве аргумента число. Если передана строка, будет попытка привести к числу.  
Значение игнорируется если оно меньше 1, либо больше диапазона шкалы.  
Если вызывется без аргумента, возвращается текущее значение.
* `values` - текущие значения сладера.  
Возвращает объект JQuery. Ожидает в качестве аргумента массив чисел либо массив строк.
Массив игнорируется если в нем меньше 2х значений, либо какое то из них не соответствует шкале. В случае необходимости будет попытка приведения типа элементов массива.  
Если команда вызвана без аргумента, будут возвращены текущие значения сладера.
* `show-tooltips` - отобразить тултипы со значениями над ползунками.   
Возвращает объект JQuery. В качестве аргумента ожидается булевое значение. Аргумент приводится к булевуму типу! Если вызывется без аргумента, возвращается текущее значение.
* `show-bg-line` - отобразить фоновую линию между крайними ползунками.   
Возвращает объект JQuery. В качестве аргумента ожидается булевое значение. Аргумент приводится к булевуму типу! Если вызывется без аргумента, возвращается текущее значение.
* `view-name` - имя вида сладера.  
Возвращает объект JQuery. В качестве аргумента ожидает строки "horizontal" и "vertical". Некорректные значения игнорируются.
Если вызывется без аргумента, возвращается текущее значение. 
* `custom-scale` - кастомные знаения шкалы.  
Возвращает объект JQuery. В качестве аргумента ожидает массив строк. Все значения других типов будут переведины в строку. Команда игнорируется, если в массиве меньше 2х значений.  
Если вызывется без аргумента, возвращается текущее значение.
* `min` и `max` - минимальное и максимальное значение шкалы.  
Возвращает объект JQuery. В качестве аргумента ожидает число.
Для строки будет попытка привести к нужному типу. Значения игнорируются если задана кастомня шкали, либо минимум равен максимуму, либо максимум меньше минимума.  
Если вызывется без аргумента, возвращается текущее значение.
  
#### Поля объекта конфига для команды `init`
* `customScale` - кастомная шкала.  
Должен быть массив строк минимум из 2х элементов. Все не строчные значения переводятся в строки. Если знаение некорректно, установливается дефолтное значение (массив с названиями месяцев). Для кастомной шкалы диапазон сладера равен **длина массива - 1**.
* `min` - минимум шкалы сладера. Игнорируется, если задан параметр `customScale`.  
Если поле объекта не является числом и его нельзя сконвертировать в число, будет задано дефолтное значение 0.
* `max` - максимум шкалы сладера. Игнорируется, если задан параметр `customScale`.  
Если поле объекта не является числом и его нельзя сконвертировать в число, будет задано дефолтное значение `min` + **диапазон сладера по умолчанию** (диапазон по умолчанию равен 100). Если максимум окажется меньше минимума, то они будут поменяны местами.
* `step` - размер шага.  
Число будет установлено в 1 если: поле некорректного типа и его нельзя привести в к числу, оно меньше 1 либо выходит за диапазон сладера.
* `tooltips` - отображать или скрыть всплывающие подсказки над ползунками. По умолчанию `true`.
* `bgLine` - отображать или скрыть фоновую линию между крайними ползунками. По умолчанию `true`.
* `values` - значения ползунков сладера.  
Ожидается массив строк если задана кастомная шкала, иначе массив чисел. Если какое либо из значений не соответствует шкале, то выбирются дефолтные. Для кастомной шкалы это первый элемент, а диапазона чисел это минимальное значение.
* `viewName` - название внешнего вида сладера.  
Возможные значения: "horizontal" горизонтальный вид (значение по умолчанию), и "vertical" - вертикальный вид.
* `prettify` - функция для кастомизации значений всплывающих подсказон над ползенками.  
Ожидается функция, которая примимает число (если не задана кастомная шкала) или строку. Функция должна возвращать отформатированную строку. Если тип не корректен, параметр игнорируется.

# Архитектура приложения
#### Реализована архитектура MVP.  
![alt text](/docs/uml.png)  



### Доменная модель

Объект `Model` выполняет все функции перерасчета положений точек на сладере и отвечает за уведомление слушателей о событиях .  
Для абстрагирования от типа шкалы используется интерфейс `IScaleDriver`.
Объекты, которые реализуют этот интерфейс отвечают за определение максимального шага для шкалы, преобразования значения в шаг и шага в значение на шкале.  

### Представление

Основной класс `View` отвечает за:
1) уведомление о действиях пользователя
2) обновление компонентов при поступлении данных и ресайзе окна.
3) создание и инициализацию компонетнов
4) переадресацию комманд копонентам
5) отрисовку шкалы
  
Для управления событиями используется `Controller`. Этот класс слушает низкоуровневые события компонентов и преобразует их в событие `PositionChange`.

Компоненты:
1) `Slider` отвечает за изменение классов сладера, а так же предоставляет метод для рассчета позиции, в котору пользователь хочет установить значение. Сообщает о событии клика по сладеру.
2) `Point` перериовывает точку на линии сладера и сообщает о клике по ней. Обрабатывает коллизиии и обновляет z-index.
3) `Tooltip` перерисовывает тултип.
4) `BgLine` перерисовывает фоновую линию.

### Связь слоев
Класс `Presenter` выполняет роль посредника между `View` и `Model`. Т.к количество событий не велико от реализации обозревателя было решено отказаться.
Что бы не возникало путаницы в методах презентер работает только с частью функционала модели (`IModel`) и представления (`IView`).

### Фасад приложения 
`Slider` выполнен в виде класического фасада. Его задача адресовать команды в модель и представление. Их функциональность, как и в презентере, ограничена интерфейсами `IModelStateManager` для модели и `IViewConfigManager` для представления.  
