# Jornada 4

Angular 2: Templates, Databinding, Directivas, Pipes (solo introducción).

## Plan de trabajo

Vamos a revisar los conceptos de inyección de dependencias en especial vamos a ver ejemplos de su comportamiento entre módulos.
También vamos a profundizar en los siguientes conceptos:

* Templates
* Directivas
* Observables
* Pipes

## Templates

El lenguaje de templating de Angular 2 es HTML, todas las etiquetas HTML son válidas excepto ```<script>``` esta estiqueta está prohibida por motivos de seguridad para evitar ataques de inyección de Script.  

Además de los elementos propios de HTML podemos enriquecer el vocabulario de nuestros templayes con otros lementos como componentes, directivas y pipes. Además podemos cambiar valores del DOM dinámicamente mediante databinding.

La primera forma de databinding es la interpolación:
```HTML 
<p>My current hero is {{currentHero.firstName}}</p>
```
 Usamos la interpolación para incluir strings calculados dentro de nuestro template.

 En realidad lo que metemos entre {{ }} es una *template expression* que primeramente evalua Angular y después es convertida a un String.

 ```HTML
 <!-- "The sum of 1 + 1 is 2" -->
<p>The sum of 1 + 1 is {{1 + 1}}</p>
 ```

La expresión puede invocar a métodos del componente anfitrión. 

```HTML
<!-- "The sum of 1 + 1 is not 4" -->
<p>The sum of 1 + 1 is not {{1 + 1 + getVal()}}</p>
```

### Template expressions

A template expression produces a value. Angular executes the expression and assigns it to a property of a binding target; the target might be an HTML element, a component, or a directive.

Las expresiones pueden parecer instrucciones de JavaScript pero no lo todas. Alguas expresiones están prohibidas:

* assignments (=, +=, -=, ...)
* new 
* chaining expressions with ; or ,
* increment and decrement operators (++ and --)
* no support for the bitwise operators | and &
* new template expression operators, such as | and ?.

### Contexto de un expression

Las expresiones no pueden hacer referencia a nada global, como *window* o *document*. No pueden llamar a *console.log* o *Math.max*. Está limitadas a los miembros del contexto de la expresión y eso suele ser la *instancia del componente*.

"When we see title wrapped in double-curly braces, {{title}}, we know that title is a property of the data-bound component. When we see isUnchanged in [disabled]="isUnchanged", we know we are referring to that component's isUnchanged property."

### Buenas prácticas con Template Expressions

1. NO VISIBLE SIDE EFFECTS: Nunca una expresión debe cambiar un estado o valor de la aplicación.
2. QUICK EXECUTION: Las expresiones no deben consumir demasiado tiempo.
3. SIMPLICITY: No deben de ser complejas. Deberían de portar la lógica al componente cuando esta no sea trivial.

## Databinding

> "Data binding is a mechanism for coordinating what users see with application data values. While we could push values to and pull values from HTML, the application is easier to write, read, and maintain if we turn these chores over to a binding framework. We simply declare bindings between binding sources and target HTML elements and let the framework do the work."

Uno de los principales valores de Angular es que nos abstrae de la lógica pull/push asociada a insertar y actualizar valores en el HTML y convertir las respuestas de usuario (inputs, clicks, etc) en acciones concretas

Angular 2 dispone de 4 formas de data binding:

```HTML
<div>{{todo.subject}}</div>
<todo-detail [todo]="selectedTodo"></todo-detail>
<div (click)="selectTodo(todo)"></div>
```

* Interpolación: (Hacia el DOM) Al hacer {{todo.subject}}, Angular se encarga de insertar el valor de esa propiedad del componente entre las etiquetas ```<div>``` donde lo hemos definido. Es decir, evalúa todo.subject e introduce su resultado en el DOM.

* Property binding: (Hacia el DOM) Al hacer [todo]="selectedTodo", Angular está pasando el objeto *selectedTodo* del Componente padre a la propiedad *todo* del Componente hijo.

* Event binding: (Desde el DOM) Al hacer (click)="selectTodo(todo)", le indicamos a Angular que cuando se produzca un evento click sobre esa etiqueta ```<div>```, llame al método selectTodo del Componente, pasando como atributo el objeto todo presente en ese contexto.

* Two-way binding: (Desde/Hacia el DOM) Un caso importante que no hemos visto con los ejemplos anteriores es el binding bi-direccional, que combina event binding y property binding, como podemos ver en el siguiente ejemplo:

```html
<input [(ngModel)]="name" >
```

Eso es equivalente a:

```html
<input [ngModel]="name" (ngModelChange)="name=$event">
```

En este caso, el valor de la propiedad fluye a la caja de input como en el caso property binding, pero los cambios del usuario también fluyen de vuelta al componente, actualizando el valor de dicha propiedad.

Veamos un ejemplo mas complejo:

```typescript
@Component({/*....*/})
export default class Counter {
    
    @Input() count: number = 0;
    @Output() countChange: EventEmitter<number> = new EventEmitter<number>();

    increment() {
        this.count++;
        this.countChange.emit(this.count);
    }
}

@Component({
    template:'<counter [(count)]="myNumber"></counter>'
    directives:[Counter]
})
class SomeComponent {
// ...
}
```

Angular mapea los eventos típicos de cualquier elemento del DOM para que los podamos utilizar como event binding.

_Sobre esto del DOM tenemos que hacer una aclaración:_

_HTML attribute vs. DOM property_

The distinction between an HTML attribute and a DOM property is crucial to understanding how Angular binding works.

_Attributes are defined by HTML. Properties are defined by the DOM (Document Object Model)._

* A few HTML attributes have 1:1 mapping to properties. id is one example.
* Some HTML attributes don't have corresponding properties. colspan is one example.
* Some DOM properties don't have corresponding attributes. textContent is one example.
* Many HTML attributes appear to map to properties ... but not in the way we might think!
* That last category can be especially confusing ... until we understand this general rule:

_Attributes initialize DOM properties and then they are done. Property values can change; attribute values can't._

For example, when the browser renders ```<input type="text" value="Bob">```, it creates a corresponding DOM node with a value property initialized to "Bob".

When the user enters "Sally" into the input box, the DOM element value property becomes "Sally". But the HTML value attribute remains unchanged as we discover if we ask the input element about that attribute: input.getAttribute('value') // returns "Bob"

The HTML attribute value specifies the initial value; the DOM value property is the current value.

The disabled attribute is another peculiar example. A button's disabled property is false by default so the button is enabled. When we add the disabled attribute, its presence alone initializes the button's disabled property to true so the button is disabled.

Adding and removing the disabled attribute disables and enables the button. The value of the attribute is irrelevant, which is why we cannot enable a button by writing ```<button disabled="false">Still Disabled</button>```.

Setting the button's disabled property (say, with an Angular binding) disables or enables the button. The value of the property matters.

_The HTML attribute and the DOM property are not the same thing, even when they have the same name._

This is so important, we’ll say it again.

_Template binding works with properties and events, not attributes._

Ver la tabla "Binding targets" en https://angular.io/docs/ts/latest/guide/template-syntax.html#!#binding-syntax

#### Property binding

We write a template property binding when we want to set a property of a view element to the value of a template expression.

The most common property binding sets an element property to a component property value. An example is binding the src property of an image element to a component’s heroImageUrl property:

Algunos ejemplos:

```html
<img [src]="heroImageUrl">
<button [disabled]="isUnchanged">Cancel is disabled</button> <!-- disabling a button when the component says that it isUnchanged -->
<div [ngClass]="classes">[ngClass] binding to the classes property</div> <!-- setting a property of a directive -->
```

An element property between enclosing square brackets identifies the target property. The target property in the following code is the image element’s src property.

```html
<img [src]="heroImageUrl">
```

Some people prefer the bind- prefix alternative, known as the canonical form:

```html
<img bind-src="heroImageUrl">
```

Remember the brackets
The brackets tell Angular to evaluate the template expression. If we forget the brackets, Angular treats the string as a constant and initializes the target property with that string. It does not evaluate the string!

Don't make the following mistake:

```html
<!-- ERROR: HeroDetailComponent.hero expects a
     Hero object, not the string "currentHero" -->
  <hero-detail hero="currentHero"></hero-detail>
```

We should omit the brackets when all of the following are true:

* The target property accepts a string value.
* The string is a fixed value that we can bake into the template.
* This initial value never changes.

##### Property binding or interpolation?

```html
<p><img src="{{heroImageUrl}}"> is the <i>interpolated</i> image.</p>
<p><img [src]="heroImageUrl"> is the <i>property bound</i> image.</p>

<p><span>"{{title}}" is the <i>interpolated</i> title.</span></p>
<p>"<span [innerHTML]="title"></span>" is the <i>property bound</i> title.</p>
```

Por seguridad:

```html
evilTitle = 'Template <script>alert("evil never sleeps")</script>Syntax';
```

No obstante angular intercepta estas cosas y las purga.

#### Attribute binding

We must use attribute binding when there is no element property to bind.

Consider the ARIA, SVG, and table span attributes. They are pure attributes. They do not correspond to element properties, and they do not set element properties. There are no property targets to bind to.

```html
<table border=1>
  <!--  expression calculates colspan=2 -->
  <tr><td [attr.colspan]="1 + 1">One-Two</td></tr>

  <!-- ERROR: There is no `colspan` property to set!
    <tr><td colspan="{{1 + 1}}">Three-Four</td></tr>
  -->

  <tr><td>Five</td><td>Six</td></tr>
</table>
```

#### Class binding

We can add and remove CSS class names from an element’s class attribute with a class binding.

```html
<!-- toggle the "special" class on/off with a property -->
<div [class.special]="isSpecial">The class binding is special</div>

<!-- binding to `class.special` trumps the class attribute -->
<div class="special"
     [class.special]="!isSpecial">This one is not so special</div>
```

#### Style binding

We can set inline styles with a style binding.

```html
<button [style.color] = "isSpecial ? 'red': 'green'">Red</button>
<button [style.background-color]="canSave ? 'cyan': 'grey'" >Save</button>
<button [style.font-size.em]="isSpecial ? 3 : 1" >Big</button>
<button [style.font-size.%]="!isSpecial ? 150 : 50" >Small</button>
```

#### Event binding

Such user actions may result in a flow of data in the opposite direction compared with previous bing¡dings: from an element to a component.

*Target event*
A name between parentheses — for example, (click) — identifies the target event. In the following example, the target is the button’s click event.

```html
<button (click)="onSave()">Save</button>
```

Some people prefer the on- prefix alternative, known as the canonical form:

```html
<button on-click="onSave()">On Save</button>
```

Recordar que podemos crear nuestros propios elementos no asociados a eventos del DOM:

### Two-way binding

Angular offers a special two-way data binding syntax for this purpose, [(x)]. The [(x)] syntax combines the brackets of property binding, [x], with the parentheses of event binding, (x).

> [( )] = BANANA IN A BOX => Visualize a banana in a box to remember that the parentheses go inside the brackets. :-)

The [(x)] syntax is easy to demonstrate when the element has a settable property called x and a corresponding event named xChange. Here's a SizerComponent that fits the pattern. It has a size value property and a companion sizeChange event:

Tomemos este caso:

```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'my-sizer',
  template: `
  <div>
    <button (click)="dec()" title="smaller">-</button>
    <button (click)="inc()" title="bigger">+</button>
    <label [style.font-size.px]="size">FontSize: {{size}}px</label>
  </div>`
})
export class SizerComponent {
  @Input()  size: number | string;
  @Output() sizeChange = new EventEmitter<number>();
  dec() { this.resize(-1); }
  inc() { this.resize(+1); }
  resize(delta: number) {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
  }
}
```

Así más sencillo:

```html
<my-sizer [(size)]="fontSizePx"></my-sizer>
<div [style.font-size.px]="fontSizePx">Resizable Text</div>
```

#### Two-way binding with NgModel

Two-way data binding with the NgModel directive makes that easy. Here's an example:

```html
<input [(ngModel)]="currentHero.firstName">
```

Before we can use the ngModel directive in a two-way data binding, we must import the FormsModule and add it to the Angular module's imports list. Learn more about the FormsModule and ngModel in the Forms chapter.

Here's how to import the FormsModule to make [(ngModel)] available.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

### Template reference variables

A template reference variable is a reference to a DOM element or directive within a template.

It can be used with native DOM elements but also with Angular components — in fact, it will work with any custom web component.

We can refer to a template reference variable anywhere in the current template.

```html
<!-- phone refers to the input element; pass its `value` to an event handler -->
<input #phone placeholder="phone number">
<button (click)="callPhone(phone.value)">Call</button>

<!-- fax refers to the input element; pass its `value` to an event handler -->
<input ref-fax placeholder="fax number">
<button (click)="callFax(fax.value)">Fax</button>
```

The hash (#) prefix to "phone" means that we're defining a phone variable.

Folks who don't like using the # character can use its canonical alternative, the ref- prefix. For example, we can declare the our phone variable using either #phone or ref-phone.

Otro ejemplo:

```typescript
import {Component, QueryList, ViewChildren} from '@angular/core';
import {Hello} from './hello.component';
@Component({
    selector: 'app',
    template: `
        <div>
        <hello></hello>
        <hello #middle></hello>
        <hello></hello>
        </div>
        <button (click)="onClick()">Call Child function</button>`
})
export class App {
    
    @ViewChildren('middle') helloChildren: QueryList<Hello>;
    constructor() {}
    onClick() {
        this.helloChildren.forEach((child) => child.exampleFunction());
    }
}
```

Otro ejemplo más:

```html
<red-ball #myBall></red-ball>
The ball is {{ myBall.color }}.
```

Otro de los elementos que podemos utilizar dentro de los templates son las Directivas.

## Directivas

Directives are entities that change the behavior of components or elements and are one of the core building blocks Angular 2 uses to build applications.

Hay dos tipos de directivas:

1. *Attribute directives*: Directivas que cambian el comportamiento de un componente o elementos pero que no afectan al template.
2. *Structural directives*: Directivas que cambian el comportamiento del componente o elemento y que afectan a como el template es renderizado.

### Attribute directives

Algunas directivas incorporadas a Angular 2:

#### ngStyle

```typescript
@Component({
selector: 'style-example',
template: `
    <p style="padding: 1rem"
        [ngStyle]="{
            color: 'red',
            'font-weight': 'bold',
            borderBottom: borderStyle
        }">
        <ng-content></ng-content>
    </p>`
})
export class StyleExampleComponent {
    borderStyle: string = '1px solid black';
}
```

Podemos pasar cualquier cosa a la directiva *ngStyle* ya que se realiza un binding de atributo de componente, en este caso estamos pasando un objeto literal con un atributo de componente, pero las combinaciones son múltiples.

#### NgClass

```typescript
@Component({
    selector: 'class-as-string',
    template: `
        <p ngClass="centered-text underlined" class="orange">
        <ng-content></ng-content>
        </p>
    `,
    styles: [`
        .centered-text {
            text-align: center;
        }
        .underlined {
            border-bottom: 1px solid #ccc;
        }
        .orange {
            color: orange;
        }
    `]
})
export class ClassAsStringComponent {
}
```

En este caso estamos estamos pasando los estilo en dentro del metadato del componente, además podemos ver que podemos usarlo en combinación con el atributo HTML 'class'.

En este otro caso vamos a pasar un array de clases:

```typescript
@Component({
    selector: 'class-as-array',
    template: `
        <p [ngClass]="['warning', 'big']">
            <ng-content></ng-content>
        </p>
        `,
    styles: [`
        .warning {
            color: red;
            font-weight: bold;
        }
        .big {
            font-size: 1.2rem;
        }
    `]
})
export class ClassAsArrayComponent {
}
```

También podemos pasar un objeto con los un valor *boolean* indicando si esa clase está activa o no:

```typescript
@Component({
    selector: 'class-as-object',
    template: `
        <p [ngClass]="{ card: true, dark: false, flat: flat }">
        <ng-content></ng-content>
        <br/>
        <button type="button" (click)="flat=!flat">Toggle Flat</button>
        </p>
    `,
    styles: [`
        .card {
            border: 1px solid #eee;
            padding: 1rem;
            margin: 0.4rem;
            font-family: sans-serif;
            box-shadow: 2px 2px 2px #888888;
        }
        .dark {
            background-color: #444;
            border-color: #000;
            color: #fff;
        }
        .flat {
            box-shadow: none;
        }
    `]
})
export class ClassAsObjectComponent {
    flat: boolean = true;
}
```

### Structural Directives

Tienen esta pinta:

```typescript
@Component({
    selector: 'directive-example',
    template: `
        <p *structuralDirective="expression">
        Under a structural directive.
        </p>
    `
})
```

Notice that the binding is still an expression binding even though there are no square brackets. That's due to the fact that it's syntactic sugar that allows using the directive in a more intuitive way and similar to how directives were used in Angular 1. The component template above is equivalent to the following:

```typescript
@Component({
    selector: 'directive-example',
    template: `
        <template [structuralDirective]="expression">
        <p>
        Under a structural directive.
        </p>
        </template>
        `
})
```

En realidad también podemos escribirlo de esta forma:

```typescript
@Component({
    selector: 'directive-example',
    template: `
        <p template="structuralDirective expression">
        Under a structural directive.
        </p>
    `
})
```

#### NgIf

The ngIf directive conditionally renders components or elements based on whether or not
an expression is true or false.

```typescript
@Component({
    selector: 'app',
    template: `
        <button type="button" (click)="toggleExists()">Toggle Component</button>
        <hr/>
        <if-example *ngIf="exists">
        Hello
        </if-example>
    `
})
export class AppComponent {
    exists: boolean = true;
    toggleExists() {
        this.exists = !this.exists;
    }
}
```

Realmente no ocultamos el elementos, realmente lo creamos y lo destruimos, el elemento DOM. Por eso, si tenemos estrucuturas muy complejas, usar ngIf tenga una sobrecarga en el rendimiento y sea mejor utilizar otra estrategia.

#### NgFor

```typescript
@Component({
    selector: 'app',
    template: `
        <for-example *ngFor="let episode of episodes" [episode]="episode">
        {{episode.title}}
        </for-example>
    `
})
export class AppComponent {
    episodes: any[] = [
        { title: 'Winter Is Coming', director: 'Tim Van Patten' },
        { title: 'The Kingsroad', director: 'Tim Van Patten' },
        { title: 'Lord Snow', director: 'Brian Kirk' },
        { title: 'Cripples, Bastards, and Broken Things', director: 'Brian Kirk' },
        { title: 'The Wolf and the Lion', director: 'Brian Kirk' },
        { title: 'A Golden Crown', director: 'Daniel Minahan' },
        { title: 'You Win or You Die', director: 'Daniel Minahan' },
        { title: 'The Pointy End', director: 'Daniel Minahan' }
    ];
}
```

ngFor también aporta algunos elementos adicionales:

* index - position of the current item in the iterable starting at 0
* first - true if the current item is the first item in the iterable
* last - true if the current item is the last item in the iterable
* even - true if the current index is an even number
* odd - true if the current index is an odd number

```typescript
@Component({
    selector: 'app',
    template: `
        <for-example
            *ngFor="let episode of episodes; let i = index; let isOdd = odd"
                [episode]="episode"
                [ngClass]="{ odd: isOdd }">
                {{i+1}}. {{episode.title}}
        </for-example>
        <hr/>
        <h2>Desugared</h2>
            <template ngFor [ngForOf]="episodes" let-episode let-i="index" let-isOdd="odd">
                <for-example [episode]="episode" [ngClass]="{ odd: isOdd }">
                    {{i+1}}. {{episode.title}}
                </for-example>
            </template>`
})
```


*trackBy*

Often ngFor is used to iterate through a list of objects with a unique ID field. In this case, we can provide a trackBy function which helps Angular keep track of items in the list so that it can detect which items have been added or removed and improve performance.
Angular 2 will try and track objects by reference to determine which items should be created and destroyed. However, if you replace the list with a new source of objects, perhaps as a result of an API request - we can get some extra performance by telling Angular 2 how we want to keep track of things.

```typescript
@Component({
    selector: 'app',
    template: `
        <button (click)="addOtherEpisode()" [disabled]="otherEpisodes.length === 0">Add Episode</button>
        <for-example
            *ngFor="let episode of episodes;
                    let i = index; let isOdd = odd;
                    trackBy: trackById" [episode]="episode"
                    [ngClass]="{ odd: isOdd }">
                    {{episode.title}}
            </for-example>`
})
export class AppComponent {
    otherEpisodes: any[] = [
{ title: 'Two Swords', director: 'D. B. Weiss', id: 8 },
{ title: 'The Lion and the Rose', director: 'Alex Graves', id: 9 },
{ title: 'Breaker of Chains', director: 'Michelle MacLaren', id: 10 },
{ title: 'Oathkeeper', director: 'Michelle MacLaren', id: 11 }]

episodes: any[] = [
{ title: 'Winter Is Coming', director: 'Tim Van Patten', id: 0 },
{ title: 'The Kingsroad', director: 'Tim Van Patten', id: 1 },
{ title: 'Lord Snow', director: 'Brian Kirk', id: 2 },
{ title: 'Cripples, Bastards, and Broken Things', director: 'Brian Kirk', id: 3 },
{ title: 'The Wolf and the Lion', director: 'Brian Kirk', id: 4 },
{ title: 'A Golden Crown', director: 'Daniel Minahan', id: 5 },
{ title: 'You Win or You Die', director: 'Daniel Minahan', id: 6 }
{ title: 'The Pointy End', director: 'Daniel Minahan', id: 7 }
];

    addOtherEpisode() {
        // We want to create a new object reference for sake of example
        let episodesCopy = JSON.parse(JSON.stringify(this.episodes))
        this.episodes=[...episodesCopy,this.otherEpisodes.pop()];
    }

    trackById(index: number, episode: any): number {
        return episode.id;
    }
}
```

### También podemos crear nuestras propias directivas:

#### Vamos a crear una Attribute Directive:

Para ello vamos a dibiujar el siguiente escenario. Tenemos una componente con un botón que lleva al usuario a una página distinta:

```typescript
@Component({
    selector: 'visit-rangle',
    template: `
        <button type="button" (click)="visitRangle()">Visit Rangle</button>
    `
})
export class VisitRangleComponent {
    visitRangle() {
        location.href = 'https://rangle.io';
    }
} 
```

Ahora queremos preguntar al usuario si desea navegar antes de lanzarle a lo desconocido:

```typescript
@Directive({
    selector: `[confirm]`
})
export class ConfirmDirective {
    
    @Input('confirm') onConfirmed: Function = () => {};
    
    @HostListener('click', ['$event'])
    confirmFirst() {
        const confirmed = window.confirm('Are you sure you want to do this?');
        if(confirmed) {
            this.onConfirmed();
        }
    }
}
```

Tendriamos que utilizar nuestra directiva de la siguiente forma:

```html
<button type="button" [confirm]="visitRangle">Visit Rangle</button>
```

Podemos ver de forma general como crear una directiva propia:

* Usando el decorador @Directive
* Especificando un selector, este debe ser CamelCase y estar dento de corchetes [] para especificar que se trata de un binding de atributos.

En nuestro caso concreto hemos usado el decorador @HostListener para escuchar los eventos de del componente al que hemos adjuntado nuestra directiva. Esta es una de las principales formas de extender el comportamiento de un componente mediante directivas. 
Este es un mecanismo muy potente que nos permite escuchar eventos de elementos externos como *window* o *document*:

```typescript
@Directive({
    selector: `[highlight]`
})
export class HighlightDirective {
    constructor(private el: ElementRef, private renderer: Renderer) {}
    
    @HostListener('document:click', ['$event'])
    handleClick(event: Event) {
        if (this.el.nativeElement.contains(event.target)) {
            this.highlight('yellow');
        } else {
            this.highlight(null);
        }
    }

    highlight(color) {
        this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
    }
}
```

En este caso estamos interceptando un evento, pero también podemos modificar los atributos del elemento *Host*. Para ello usaremos el decorador *@HostBinding*:

```typescript
import { Directive, HostBinding, HostListener } from '@angular/core';
@Directive({
    selector: '[buttonPress]'
})
export class ButtonPressDirective {
    @HostBinding('attr.role') role = 'button';
    @HostBinding('class.pressed') isPressed: boolean;
    @HostListener('mousedown') hasPressed() {
        this.isPressed = true;
    }
    @HostListener('mouseup') hasReleased() {
        this.isPressed = false;
    }
}
```

#### Vamos a crear una Structural Directive:

Vamos a crear una directiva super chorra que retrasa la instaciación de un componente unos segundos:

```typescript
import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
@Directive({
    selector: '[delay]'
})
export class DelayDirective {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef
    ) { }

    @Input('delay')
    set delayTime(time: number): void {
        setTimeout(
            () => {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
                },
            time);
    }
}
```

En este caso la diferencia con el ejemplo de directivas de atributo es que estamos accediendo a *TemplateRef* que es un objeto que representa la etiqueta *template* a la que esta adjunta la directiva.

Necesitamos de *viewContainerRef: ViewContainerRef* que la la directiva renderice los componentes contenidos en el template, pero para ello necesitamos pasar un referencia a la vista contenedora.

> View Containers are containers where one or more Views can be attached. Views represent some sort of layout to be rendered and the context under which to render it. View containers are anchored to components and are responsible for generating its output so this means that changing which views are attached to the view container affect the final rendered output of the component. Two types of views can be attached to a view container: Host Views which are linked to a Component, and Embedded Views which are linked to a template. Since structural directives interact with templates, we are interested in using Embedded Views in this case. Directives get access to the view container by injecting a ViewContainerRef. Embedded views are created and attached to a view container by calling the ViewContainerRef 's createEmbeddedView method and passing in the template. We want to use the template our directive is attached to so we pass in the injected TemplateRef .

## Pipes (Introducción)

Son el equivalente Angular 2 a los Filters de Angular 1.X

```typescript
import {Component} from '@angular/core';
@Component({
    selector: 'product-price',
    template: `<p>Total price of product is {{ price | currency }}</p>`
})
export class ProductPrice {
    price: number = 100.1234;
}
```

Podemos pasar parametros adicionales de esta forma:

```pipeName: parameter1: parameter2```

```typescript
import {Component} from '@angular/core';
@Component({
    selector: 'product-price',
    template: '<p>Total price of product is {{ price | currency: "CAD": true: "1.2-4"}}</p>'
})
export class ProductPrice {
    price: number = 100.123456;
}
```

Podemos encadenar las Pipes:

```typescript
import {Component} from '@angular/core';
@Component({
    selector: 'product-price',
    template: '<p>Total price of product is {{ price | currency: "CAD": true: "1.2-4" | lowercase }}</p>'
})
export class ProductPrice {
    price: number = 100.123456;
}
```

También podemos crear nuestras propias Pipes.



