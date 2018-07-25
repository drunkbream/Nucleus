Написание Readme еще в процессе. Docs in progress.

# Nucleus sketch plugin
Инструмент позволяющий создавать атомарный дизайн в Sketch, а также экспортировать данные для верстки из макета в формате scss map. Ориентирован на создание реиспользуемых дизайн систем.

Cоздание дизайна c Nucleus возможно только при организации гайдлайна и библиотеки компонентов по определенным правилам которые формируют дизайн фреймворк. Это создает единый язык между дизайном и разработкой путем экспорта данных из гайдлайна. За счет экспорта данных организуется синхронизация дизайн-макетов и внешнего вида компонентов в браузере. Это напоминает принципц wysiwyg, однако вы сами определяете как использовать данные в коде.

Демо скачать можно [тут](https://github.com/levtolstoi/Nucleus-demo).

## Установка
Чтобы установить загрузите [zip архив](https://github.com/levtolstoi/Nucleus/releases/download/v1.0.3/Nucleus.sketchplugin.zip) с последним релизом, разархивируйте и дважды щелкните по Nucleus.sketchplugin.


## Нуклоны и синхронизация
Атомарный дизайн в контексте плагина расширен более мелкими частицами, нуклонами(nucleon), применение которых полностью замещает собой Sketch styles и Sketch text styles c помощью хэштегов в имени слоя. Вследствии этого обновленный концепт выглядит следующим образом:

![Image alt](https://github.com/levtolstoi/Nucleus/blob/assets/nucleons.jpg?raw=true)

**Нукло́ны** (от лат. nucleus — ядро) — общее название для протонов и нейтронов, из которых состоит ядро атома.

Нуклоны в контексте Nucleus это обычные Sketch слои, каждый из которых хранит в себе определенное свойство, например ширину, высоту, тень и т.д.

![Пример. Нуклон высоты](https://github.com/levtolstoi/Nucleus/blob/assets/nucleons.png?raw=true)

Предусмотрено всего 9 префиксов для тегов:
* **«h-»** (height) высота;
* **«w-»** (width) ширина;
* **«o-»** (offset) отступ, обращается к ширине слоя;
* **«r-»** (radius) радиус;
* **«s-»** (shadow) тень, может хранить как внутреннюю так и внешнюю тень, или обе одновременно (бордеры так же следует хранить в этих нуклонах, так как sketch не умеет создавать бордеры с одной стороны слоя);
* **«b-»** (background) хранит цвета для слоев;
* **«t-»** (typographic) хранит font-size, font-family, letter-spacing, line-height, text-transform(uppercase/lowercase), font-weight;
* **«с-»** (color) цвет текста;
* **«i-»** (icon) для иконок. Применив нуклон иконки к любому слою, при синхронизации он заменит его на иконку, в дальнейшем вы можете менять исходную иконку.


## Команда Sync (cmd+shift+i).
Вы можете синхронизировать свойства между нуклонами и слоями внутри символов с помощью хештегов.

![Image alt](https://github.com/levtolstoi/Nucleus/blob/assets/sync.gif?raw=true)

Вот как это работает:

![Image alt](https://github.com/levtolstoi/Nucleus/blob/assets/sync-scheme.jpg?raw=true)


### Создание нуклонов
Для того чтобы создать нуклоны, необходимо создать artboard с именем Nucleons(обязательно). Это имя создает область видимости для синхронизации свойств между, с свойствами слоев внутри Sketch symbols, к которым были применены теги. 

Видео тутор на youtube:

[![Nucleus create nucleons](https://img.youtube.com/vi/wEt_Y7tL2cw/0.jpg)](https://youtu.be/wEt_Y7tL2cw)

Артборд с нуклонами является своеобразной «базой данных» элементарных частиц, механика  взаимодействия с которыми заложена в их наименовании и имеет вид:

**nucleon#h-sm-s**

В данном примере:
* «nucleon» обязательное имя с помощью которого Nucleus обращается к данному слою за тем или иным свойством слоя(обязательно);
* '#' символ(хэштег/диез/октоторп) отделяющий имя слоя от тега(обязательно);
* «h-» префикс указывающий какое именно свойство забирать с нуклона(в данном примере h- это высота);
* «sm-s» уникальное имя(может быть любым). Рекомендуется давать абстрактные имена(например sm-xs, sm-m, sm-xlg-xl).

---
**Свойства нуклонов могут синхронизироваться лишь со слоями(в названии которых есть их теги) внутри master symbols находящимися на странице символов.**
---

Разберем создание нуклона на примере нуклона высоты (h-):
1. На артборде с именем «Nucleons» создаем Sketch group с именем «nucleons_name», в нашем случае «nucleons_height». На самом деле имя группы может быть любым, вы можете называть по своему, однако рекомендуется придерживаться единого стиля.
2. В группе создаем слои с именем nucleon и хештегом обозначающим свойство, раз мы создаем нуклоны высоты, то это «nucleon#h-имя-высоты».
3. В группе nucleons_name не может быть никаких других слоев кроме nucleon(всяческие графические украшательства и пояснения делаем вне группы).
4. Не может быть двух одинаковых нуклонов, один нуклон — один слой(кроме иконок — нуклоны иконок это Sketch group, но правила те же).
5. Следует создавать все типы нуклонов чтобы полностью покрыть ими слои атомов, для дальнейшей синхронизации.
6. Нуклонов можно создавать сколько угодно, главное чтобы вы организовали это так, чтобы сами в них не запутались.

## Создание атомов
Концепция атомарного дизайна рассматривает атомы как целостные независимые единицы не имеющие смысла сами по себе, но при этом контекст их использования предполагается. Поэтому стараемся снижать реиспользуемость атома, пусть лучше будет больше сильно похожих друг на друга(это называется «совпадение»), это повышает точечный контроль применения. Не забываем что атомы будут верстаться каждый отдельно, точно так же как в гайдлайне.

Видео тутор на youtube:

[![Nucleus create nucleons](https://img.youtube.com/vi/JMWxw-i4V-M/0.jpg)](https://youtu.be/JMWxw-i4V-M)

Если вы создали artboard с именем Nucleons, для атомов следует создать отдельный.

Очень важно определиться со структурой дерева слоев и придерживаться ее постоянно при создании новых атомов, предлагается следующая:
* Каждый атом должен быть символом. 
* Default, active, hover, это состояния атома. 
* Cостояний может быть сколько угодно. 
* Создание атомов-состояний для каждого экземпляра атома строго обязательно.

Каждый отдельный символ в группе атома называется экземпляром атома.

Заглянем внутрь атома:
![Слои атома](https://github.com/levtolstoi/Nucleus/blob/assets/inside-atom.png?raw=true)

«button / primary / sm / default» — имя / тема / размер / состояние. Cлэши необходимы для дальнейшей удобной навигации в библиотеке символов.

button-primary-sm — название для группы содержащей слои атома, обязательно без пробелов, указание состояния опускается. Группа, обертывающая слои обязательна, и должна оборачивать все слои в символе. Будьте внимательны, именно такое имя атом получит при верстке, если разработчик не пожелает изменить его в коде, поэтому будьте последовательными, и не приписывайте название состояния.

**Подробно про слои**

Имена слоев состоят из двух частей. Все что пишется до первого #-символа называется именем слоя, все что после — цепью нуклонов. Главное правило — никаких пробелов.
	
Следует запомнить: количество базовых слоев в каждом экземпляре атома одного типа не может меняться, как и их имена, это шаблон, но кроме базовых вы можете добавлять дополнительные слои(например иконку) от экземпляра к экземпляру. При этом этом нуклоны, их порядок и тип — могут изменяться как угодно. Однако не следует назначать текстовые атомы обычным слоям и наоборот.

В данном примере представлены слои с именем offset. Хештегом с префиксом #o- как мы помним, является нуклон несущий через свою ширину размер отступа. Эти слои более важны для разработчиков при экспорте кода атома. К сожалению Sketch не предоставляет никаких способов реализации отступов.

Повторим обязательные правила:
* стремимся снижать функциональность атома, лучше больше чем универсальней;
* синхронизация свойств между слоями нуклонов и слоями в атомах происходит лишь если атом является символом;
* создаем атомы на отдельном на отдельных артобрдах, а не на том что несет в себе нуклоны;
* пробелы допустимы только в названии атом-символа;
* слои атом-символа всегда должны быть обернуты в группу с названием атома, в названии может меняться только модификатор размера, для отдельной темы создаем отдельный атом;
* отображение состояний обязательно, даже если оно одно нужно создавать группу (причина станет более очевидной когда вы прочтете раздел про генерацию css);
* слои имеют читабельные имена без пробелов и повторяющиеся от экземпляра к экземпляру атом-символа;
* в каждом экземпляре атом-символа всегда одинаковое количество слоев;
* нельзя использовать одинаковые имена для двух или нескольких слоев в одном и том же символе;


## Экспорт данных (cmd+shift+b)

![Схема](https://github.com/levtolstoi/Nucleus/blob/assets/export-scheme.jpg?raw=true)

Все мы знаем команду Copy CSS Attributes в Sketch, соотетственно мы уже понимаем что Sketch уже содержит в себе все данные которые нужны для верстки, однако почему то мы до сих пор пишем css вручную. Nucleus исправляет эту проблему. Если вы правильно создали структуру атомов как описано выше вы можете экспортировать scss map из макета. Один атом - одна map.


![экспорт](https://github.com/levtolstoi/Nucleus/blob/assets/export.gif?raw=true)


#### Пример экспортируемого кода.
Первые строки в примере это ипортируемые scss map нуклонов, Nucleus импортирует их ориентируясь на хэштеги в слоях.
Так же вы можете увидеть строки типа *"background: mdg($nucleons_background, b-two-higher)"*, тут используется "Map Deep Get" sass mixin, который наследует свойства нуклонов из импортируемых nucleons sass map. Таким образом, если вы примените этот код, вы можете изменять в Sketch свойства нуклонов и экспортировать их заново, и увидеть изменения уже не только в макете, но и в браузере.

![Структура для экспорта](https://github.com/levtolstoi/Nucleus/blob/assets/export-tree.png?raw=true)
```scss
@import 'nucleons_height';
@import 'nucleons_offset';
@import 'nucleons_background';
@import 'nucleons_typography_sizes';
@import 'nucleons_typography_themes';
@import 'nucleons_shadow';
@import 'nucleons_radius';

  $atom-btn-primary: (
    active: (
      btn-primary: (
        margin: (
          background: #D8D8D8,
          border: 1px solid #979797,
          height: 32px,
          width: mdg($nucleons_offset, o-sm-xs),
          border-radius: 0px 0px 0px 0px
        ),
        padding: (
          background: #D8D8D8,
          border: 1px solid #979797,
          height: 40px,
          width: mdg($nucleons_offset, o-md-s),
          border-radius: 0px 0px 0px 0px
        ),
        button: (
          background: mdg($nucleons_background, b-two-higher),
          height: mdg($nucleons_height, h-md-l),
          width: 240px,
          border-radius: mdg($nucleons_radius, r-sm)
        ),
        text: (
          font-family: mdg($nucleons_typography_sizes, t-button-uppercase-lg, font-family),
          font-size: mdg($nucleons_typography_sizes, t-button-uppercase-lg, font-size),
          color: mdg($nucleons_typography_themes, c-primary),
          letter-spacing: mdg($nucleons_typography_sizes, t-button-uppercase-lg, letter-spacing),
          text-align: mdg($nucleons_typography_sizes, t-button-uppercase-lg, text-align),
          line-height: mdg($nucleons_typography_sizes, t-button-uppercase-lg, line-height),
          extend: 't-button-uppercase-lg',
          text-transform: mdg($nucleons_typography_sizes, t-button-uppercase-lg, text-transform),
          font-weight: mdg($nucleons_typography_sizes, t-button-uppercase-lg, font-weight)
        )
      )
    ),
    hover: (
      btn-primary: (
        margin: (
          background: #D8D8D8,
          border: 1px solid #979797,
          height: 32px,
          width: mdg($nucleons_offset, o-sm-xs),
          border-radius: 0px 0px 0px 0px
        ),
        padding: (
          background: #D8D8D8,
          border: 1px solid #979797,
          height: 40px,
          width: mdg($nucleons_offset, o-md-s),
          border-radius: 0px 0px 0px 0px
        ),
        button: (
          background: mdg($nucleons_background, b-two-hi),
          height: mdg($nucleons_height, h-md-l),
          width: 240px,
          border-radius: mdg($nucleons_radius, r-sm)
        ),
        text: (
          font-family: mdg($nucleons_typography_sizes, t-button-uppercase-lg, font-family),
          font-size: mdg($nucleons_typography_sizes, t-button-uppercase-lg, font-size),
          color: mdg($nucleons_typography_themes, c-primary),
          letter-spacing: mdg($nucleons_typography_sizes, t-button-uppercase-lg, letter-spacing),
          text-align: mdg($nucleons_typography_sizes, t-button-uppercase-lg, text-align),
          line-height: mdg($nucleons_typography_sizes, t-button-uppercase-lg, line-height),
          extend: 't-button-uppercase-lg',
          text-transform: mdg($nucleons_typography_sizes, t-button-uppercase-lg, text-transform),
          font-weight: mdg($nucleons_typography_sizes, t-button-uppercase-lg, font-weight)
        )
      )
    ),
    default: (
      btn-primary: (
        margin: (
          background: #D8D8D8,
          border: 1px solid #979797,
          height: 32px,
          width: mdg($nucleons_offset, o-sm-xs),
          border-radius: 0px 0px 0px 0px
        ),
        padding: (
          background: #D8D8D8,
          border: 1px solid #979797,
          height: 40px,
          width: mdg($nucleons_offset, o-md-s),
          border-radius: 0px 0px 0px 0px
        ),
        button: (
          background: mdg($nucleons_background, b-two),
          height: mdg($nucleons_height, h-md-l),
          width: 240px,
          border-radius: mdg($nucleons_radius, r-sm)
        ),
        text: (
          font-family: mdg($nucleons_typography_sizes, t-button-uppercase-lg, font-family),
          font-size: mdg($nucleons_typography_sizes, t-button-uppercase-lg, font-size),
          color: mdg($nucleons_typography_themes, c-primary),
          letter-spacing: mdg($nucleons_typography_sizes, t-button-uppercase-lg, letter-spacing),
          text-align: mdg($nucleons_typography_sizes, t-button-uppercase-lg, text-align),
          line-height: mdg($nucleons_typography_sizes, t-button-uppercase-lg, line-height),
          extend: 't-button-uppercase-lg',
          text-transform: mdg($nucleons_typography_sizes, t-button-uppercase-lg, text-transform),
          font-weight: mdg($nucleons_typography_sizes, t-button-uppercase-lg, font-weight)
        )
      )
    )
  )
;

```
 
