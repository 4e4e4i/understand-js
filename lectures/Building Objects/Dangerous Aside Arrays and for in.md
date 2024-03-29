# Dangerous Aside: Arrays and for..in

Теперь когда мы понимаем функции-конструкторы, встроенные функции-конструкторы и как они могут
быть использованы в библиотеках и фреймворках, чтобы добавлять новые фичи, давайте поговорим
немного о массивая и **for..in**

Вы помните что мы делали в уроке о рефлексии и расширении? Где мы проходились циклом через все
свойства и методы объекта. Ну так массива - объекты и мы можем делать с ними теже самые вещи.

Возьмем массив имен:

```javascript
var arr = ['John', 'Jane']
```

и как мы делали до этого - пройдемся циклом по всем свойства и методами в этом массиве:

```javascript
for (var prop in arr) {
    console.log(prop + ': ' + arr[prop]); // выведет поочередно 0: John, 1: Jane
}
```

Массивы в Javascript немного отличаются от тех, что есть в других языках.
Когда я ссылаюсь 0, 1 и указываю на определенный элемент в списке массива. 0, 1 - по-настоящему
имена. Имя свойства на паре значений имени, поэтмоу я могу использовать квадратные скобки
чтобы захватить его. 

Была бы небольшая проблема, если где-нибудь у меня был фреймворк, который добалял фиичи к
моему массиву. 

```javascript
Array.prototype.myCustomFeature = 'cool!'
```

Из-за того что литерал создания объекта [] вызывает по сути new array, это всего-лишь сокращенная запись
Поэтому array.prototype - прототип нашего объекта arr. И здесь у нас возникает проблема.
Если мы перезагрузим страницу, то увидим в консоле, что в нашем массиве появился новый элемент
**myCustomFeature: cool!**.

Поэтому в случае массивов не используйте for..in. Вместо этого используйте:

```javascript
for (var i = 0; i < arr.length; i++) {
    
}
```

Потому что массив - это объект и проходясь по его свойства циклом вы опуститесь в прототип 
