# Создаем нашу библиотеку

За все время нашего курса, мы использовали приветствие, как пример во многих упражнениях. И я собираюсь использовать
эти простые примеры потому что мы сможем сосредоточится на концепте и не потеряться в реализации.

Теперь давайте сформулируем наши требования к библиотеке.

Предположим, что мы хотим сделать библиотеку или фреймворк, который помогает нам здороваться с пользователям, зашедшими
на наш сайт. Например, если кто-то залогинился на сайт и ему будет высвечиваться в каком-либо углу экрана приветствие, 
может быть даже на разных языках, в зависимости от языка, который он выбрал.

## Requirements

* Когда задается имя, фамилия и выбирается язык, библиотека генерирует формальные и неформальные приветствия.
* Должна быть поддержка Английского и Испанского языка.
* Должна быть reusable 
* Легко печатаемая структура вызова 'G$()'
* Поддерживать jQuery

## Structuring Safe Code

Для начала создадим index.html, в котором будут ссылки на 3 наших js файла: jQuery, Greetr.js и app.js

Вся наша библиотека/фреймоврк будет находится в файле Greetr.js. Для начала мы хотим создать новый конекст исполнения
для нашей библиотеки. Чтобы все наши переменные были декларированны безопасно и мы выводили в глобальный объект
только то, что мы хотим.

Оберните некоторый код так, как вы считаете целесообразным, чтобы сделать любой код внутри него безопасным. И передайте 
ему то, к чему нам нужен доступ. Нам нужен доступ к глобальной переменной, которая является Window, и переменной jQuery, 
которая является словом jQuery или знаком доллара. Для этого мы будем использовать мгновенно вызываемую
функцию.

Создадим immediately invoked function, которая принимает глобальный объект и jquery объект и когда вызываем ее
убедимся, что передаем Window и jQuery object.

```javascript
(function (global, $) {
}(window, jQuery));
```
Теперь у нас есть безопасный код.

## Our Object and its Prototype 

Теперь время установить наш Greetr объект и это будет немного хитро, потому что мы хотим установить его таким же образом,
как и реализовано в jQuery. Мы собираемся имитировать структуру jQuery.

Я хочу установить наш Greetr так, чтобы он генерировал объект, поэтому это будет функция, которая генерирует объект. Но так же
я бы хотел, чтобы вызов нашей библиотеки происходил, всего-лишь напечатав G$, и затем передать туда
firstName, lastName и может быть language. И она должна вернуть вернуть нам объект, как это делает jQuery.

```javascript
var g = G$(firstname, lastname, language);
```

Поэтому я не хочу постоянно говорить new G$(...). 

Как я могу сделать именно такую функцию? Давайте начнем создавать функцию, которая принимает все наши аргументы 
(fisrtname, lastname, language) и теперь я хочу, чтобы вместо того, чтобы эта функция была
функцией-конструктором, она возвращала нам реультат другой функции-конструктора. Как, например, .init в jQuery.

```javascript
(function (global, $) {

    const Greetr = function (firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language)
    }

}(window, jQuery));
```

Затем сделаем саму функциюю Greet.init и установим ей дефолтные значения, для аргументов, если они не прийдут.
Так же обратите внимание, что все будет в порядке,  если мы вызовем функцию после создания данной функции-конструктора.
Потому что она не вызовется, пока фактически мы не используем Greetr. Поэтому к тому времени, когда на самом деле функция вызовется
все это будет установлено в памяти.

```javascript
(function (global, $) {

    const Greetr = function (firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language)
    };

    Greetr.init = function (firstName, lastName, language) {
            
            const self = this;
            self.firstName = firstName || '';
            self.lastName = lastName || '';
            self.language = language || 'en';
    };

}(window, jQuery));
```

Теперь я хочу использовать Greetr.prototype, потому что он выглядит лучше в моем коде, и пока что это будет пустой объект.
Здесь я помещу любые методы, которые я хочу использовать внутри моего объекта, возвращаемого из Greetr.
Но для того, чтобы это сделать, это означает, что созданному здесь объекту необходимо указать на него как на прототип.
Любой объект, возвращаемый функцией-конструктором Greetr.init, будет указывать, где находится его прототип.

Greetr.init.prototype - функция. Любой объект, созданный с помощью этой функции в качестве функции-конструкта, именно на это
указывает свойство proto.

Так что все мои объекты будут указывать сюда

```javascript
(function (global, $) {

    const Greetr = function (firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language)
    };
    
    Greetr.prototype = {};

    Greetr.init = function (firstName, lastName, language) {
        
        const self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
    };

    Greetr.init.prototype = Greetr.prototype

}(window, jQuery));
```

Теперь я хочу открыть свой Greetr для внешнего мира. Я хочу прикрепить его к глобальному объектму так, чтобы
можно было вызвать эту функцию, где угодно. Мы не будем беспокоиться о проверки, существует она или нет. И так же мы хотим
прикрепить к ней псеводним "G$"

```javascript
(function (global, $) {

    const Greetr = function (firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language)
    };

    Greetr.prototype = {};

    Greetr.init = function (firstName, lastName, language) {

        const self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
    };

    Greetr.init.prototype = Greetr.prototype;

    global.Greetr = global.G$ = Greetr;

}(window, jQuery));
```

Мы делаем ссылки на ячейку в глобальном объекте и теперь у нас переменная G$ = функции Greetr и ссылкается на global.Greetr.

Таким образом, в глобальном объекте эти два имени будут указывать на это значение.

Итак, у меня есть базовая настройка моего объекта и моего прототипа. Так что, если я попал в свое приложение, я уже 
могу сказать, вызвать наш Greetr черезе псеводним G$, передать в него имя и фамили. и вывести через console.log.

В App.js
```javascript
const g = G$('John', 'Doe');
console.log(g);
```

## Properties and chainable methods

Давайте добавим несколько свойств и цепочных методов в наш объект.

Также мы настроим некоторые функции настройки, которые находятся внутри приветствующего, но не подвержены
влиянию внешнего мира.

Мы уже создали свойства, которые уникальны для каждой копии или каждого экземпляра объекта. Итак, чтобы сэкономить место в памяти,
куда мне стоит поместить какие-либо методы и свойства, которые будут использоваться любыми объектами, 
сгенерированными здесь?

Я мог бы добавить их в Greetr.init через self.someMethod, но куда лучше бы было это сделать?

На прототип, который благодаря этой строке кода

```javascript
Greetr.prototype = {};
```

станет этим объектом.

А как насчет вещей, которые я хочу использовать в логике всей этой библиотеки, но я не хочу, чтобы
она вообще была представлена внешнему миру?

Могу ли я создать переменные и понятия, которые не являются частью объекта, который возвращается, когда мы используем Greetr.
Да.

Я могу бы поставить переменную, например, здесь...назовем ее "supportedLangs"

```javascript
(function (global, $) {

    const Greetr = function (firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language)
    };
    
    var supportedLangs = ['en', 'es'];

    Greetr.prototype = {};
    //...other code
}());
```

Это не свойство, это не метод возвращаемого объекта, это внутри данного пространства памяти именно этой функции.
Тем не менее, я могу использовать переменную внутри своего объекта. Почему объект, который возвращается, тогда любые методы
этого объекта будут иметь доступ к этой переменной. Почему любые объекты, созданные здесь, имеют доступ к этой переменной?

Потому что лексическая среда этого объекта - это целая функция. И поэтмоу, благодаря замыканиям, он будет закрываться в этой переменной,
даже когда эта немедленно вызванная функция будет завершена.

Но так же эта переменная скрыта от других разработчиков для изменений, пока они не захотят поправить что-то в исходном коде.

Я хочу настроить приветствия, а так и формальные приветствия. Я мог бы создать эти массивы, но по-настоящему хотел бы
ссылаться на приветствие по названию языка, по строке с названием языка.

```javascript
(function (global, $) {

    const Greetr = function (firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language)
    };
    
    const supportedLangs = ['en', 'es'];
    
    const greetings = {
        en: 'Hello',
        es: 'Hola'
    };
    
    const formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    Greetr.prototype = {};
    //...other code
}());
```

Просто потому, что я хороший разработчик. Я хочу добавить опцию, чтобы выводить сообщение, в любое время, когда эти
приветствия используются или вызываются.

В нашем случае мы будем выводить в console. Поэтому если я хочу выводить сообщение в консоль, у меня должны быть для этого сообщения.
Так мы создадим logMessages переменную и добавим мультиязычные сообщения.

```javascript
(function (global, $) {

    const Greetr = function (firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language)
    };
    
    const supportedLangs = ['en', 'es'];
    
    const greetings = {
        en: 'Hello',
        es: 'Hola'
    };
    
    const formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };
    
    const logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion'  
    };

    Greetr.prototype = {};
    //...other code
}());
```

И так у нас есть 3 вариант сообщений и они являются объектами, а не массивами, потому что я хочу ссылаться на них с помощью
name/value pair. 

Давайте добавим некоторые вещи, которые будут выставлены внутри этого объекта-прототипа. Так что любые, объекты, 
построенные здесь, будут иметь доступ к любым методам и свойствам здесь.

Создадим свойство fullName, которое будет функция, возвращающей firstName и lastName

```javascript
Greetr.prototype = {
    
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    }
    
};
```

И в любых методах здесь переменная this будет указывать на объект, который был создан.

Так же я хотел бы добавить возможность подтвердить, что язык поддерживается данным приложением.

Поэтому, если разработчик попытается вызвать приложение и передать туда Немецкий или Французский или какой-либо 
другой язык, я смогу сказать им, что данный язык не поддерживается.

Я установил скрытую переменную здесь, которая скрыта от внешнего мира, но доступна через замыкание - supportedLangs. 
Таким образом, JS будет гарантировать, что когда эта функция вызывается из-за того, где она находится в лексическом смысле, 
она пойдет вверх по цепочке областей и найдется поддерживаемые языки, которые находятся в памяти данного контекста исполнения.

Т.к. supportedLangs - массив, я могу использовать indexOf, который просто говорит мне, найден ли элемент в массиве и мы передадим туда
this.language. Помните, что ключевое слово this указывает на объект, вызвавший эту функцию. И объект будет хранить
свои собственные языки, которые мы запрашиваем. И я проверю найден он или нет.

Если он не найден, я выдам новую ошибку.

```javascript
Greetr.prototype = {
    
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },
    
    validate: function() {
      if (supportedLangs.indexOf(this.language) === -1) {
          throw "Invalid language";
      }
    }
    
};
```

Добавим еще регулярное приветствие. Итак, теперь у меня есть имя и фамилия человека, которого я хочу приветствовать.


```javascript
Greetr.prototype = {
    
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },
    
    validate: function() {
      if (supportedLangs.indexOf(this.language) === -1) {
          throw "Invalid language";
      }
    },
    
    greeting: function() {
      return greetings[this.language] + ' ' + this.firstName + '!';
    },
    
    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullName();
    }
};
```

Так же я не хочу постоянно вызывать greeting или formalGreeting. Поэтому я создам greet метод, который будет использовать
рзаработчик.

 ```javascript
 Greetr.prototype = {
     
     fullName: function() {
       return this.firstName + ' ' + this.lastName;
     },
     
     validate: function() {
       if (supportedLangs.indexOf(this.language) === -1) {
           throw "Invalid language";
       }
     },
     
     greeting: function() {
       return greetings[this.language] + ' ' + this.firstName + '!';
     },
     
     formalGreeting: function() {
       return formalGreetings[this.language] + ', ' + this.fullName();
     },
     
     greet: function(formal) {
         let msg;
         
         // if undefined or null it will be coerced to 'false'
         if (formal) {
             msg = this.formalGreeting();
         } else {
             msg = this.greeting();
         }
         
         if (console) {
             console.log(msg);
         }
         
         // 'this' refers to the calling object at execution time makes the method chainable
         return this;
     },
     
     log: function() {
       if (console) {
           console.log(logMessages[this.language] + ': ' + this.fullName());
       }
       
       return this;
     },
     
     setLang: function(lang) {
        this.language = lang;
         
        this.validate();
       
        return this;
     }
 };
 ```
 
 ## Adding jQuery Support
 
 Добавляем поддержку jQuery в нашу библиотеку.
 
 создадим новый метод HTMLGreeting, который будет принимать селектор для jQuery значение
 для отображение формальное будет сообщение или нет.
 
 Сделаем проверку на присутствие jQuery в проекте. Если джиквири отсутствует, то выкидываем ошибку.
 
 Проверку на селектор, если селектора нет, то также выкидываем ошибку.
 
 Получим сообщение, которое будем выводить
 
 Затем используем jQuery (но так как мы принимали $ в аргументах нашей библиотки, мы можем
 в будущем использовать не только jQuery). 
 
```javascript
Greetr.prototype = {
    HTMLGreeting: function (selector, formal) {
      if (!jQuery) {
          throw "jQuery not loaded";
      }
      
      if (!selector) {
          throw 'Missing selector';
      }
      
      let msg;
      if (formal) {
          msg = this.formalGreeting();
      } else {
          msg = this.greeting();
      }
      
      $(selector).html(msg);
      
      return this;
    }
}   

```
 