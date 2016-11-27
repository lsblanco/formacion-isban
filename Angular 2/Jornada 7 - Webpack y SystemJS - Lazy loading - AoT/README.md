# Jornada 7 - Construyendo Angular 2: Webpack y ~~SystemJS~~. Lazy loading. AoT. Internacionalización.

## Plan de trabajo

Explorar las posibilidades de Angular 2 para:

* Construcción de la aplicación con:
    * Webpack
    * ~~SystemJS~~
* Optimización de los tiempos de carga de aplicación con Lazy Loading.
* Precompilación con AoT.
* Internacionalización.

Dejaremos un tiempo de práctica individual para que los asistentes puedan probar los conceptos aprendidos:

* Lazy loading, tomar el ejemplo del Blog y crear un nuevo módulo de administración, de backoffice que carge un login sencillo, ese módulo nuevo debe tener una carga Lazy. Toamr medidas de tiempos con y sin carga Lazy. Molaría usar el @typing de jQuery, inyectarlo en ese nuevo módulo, para ver la ganancia cuando se tienen subdependencias pesadas.

## ¿Por qué necesitamos SystemJS o Webpack?

Primeramente porque tenemos que crear nuestra aplicación para que funcione. Además quetemos tener una serie de tareas que hagan que nuestra aplicación sea mas sencilla de distribuir y mas eficiente en su ejecución.   

## Webpack

Webpack es empaquedor de módulos, una herramienta para agrupar el código fuente de la aplicación en trozos y para cargar ese código desde un servidor a un navegador.

TODO

## SystemJS

http://david-barreto.com/how-to-use-typescript-with-systemjs/

TODO

## Lazy loading

Lazy loading es la técnica con la cual, cargamos solo los módulos cuando los necesitamos. Esto lo hacemos para reducir los tiempos de carga de nuestra aplicación. 
Veamos las diferentes herramientas que tenemos en Angular 2 para poder realizar el Lazy Loading.

Vamos a partir del siguiente root module:

```typescript
//app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EagerComponent } from './eager.component';
import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    routing
  ],
  declarations: [
    AppComponent,
    EagerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Todo normal.

ya sabemos que necesitamos un root component, pues aquí lo tenemos:

```typescript
//app/app.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>My App</h1>
    <nav>
      <a routerLink="eager">Eager</a>
      <a routerLink="lazy">Lazy</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
```
y que necesitamos un módulo de Routing:

```typescript
//app/app.routing.ts

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EagerComponent } from './eager.component';

const routes: Routes = [
  { path: '', redirectTo: 'eager', pathMatch: 'full' },
  { path: 'eager', component: EagerComponent },
  { path: 'lazy', loadChildren: 'lazy/lazy.module#LazyModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
```

ya podemos ver que en el caso del root component, pues tenemos dos rutas, una a *eager* que se resuelve con *EagerComponent* una de ellas con el nombre de lazy que se resuelve con un String 'lazy/lazy.module#LazyModule'.

Notad que si bien hemos importado, tanto el módulo JavaScript, como el módulo Angular 2 de *EagerComponent* en el root module, no hemos hecho nada con *LazyModule*.

En resumen, tenemos los siguiente que es un poco diferencia de los routing que hemos visto hasta ahora:

1. hemos usado la propiedad *loadChildren* en vez de *component*.
2. Pasamos un string en vez de una clase.

Por cierto, vamos a presentar a EagerModule:

```typescript
//app/eager.component.ts
import { Component } from '@angular/core';

@Component({
  template: '<p>Eager Component</p>'
})
export class EagerComponent {}
```

y a LazyModule:

```typescript
//app/lazy/lazy.module.ts
import { NgModule } from '@angular/core';

import { LazyComponent }   from './lazy.component';
import { routing } from './lazy.routing';

@NgModule({
  imports: [routing],
  declarations: [LazyComponent]
})
export class LazyModule {}
```

Si nos fijamos bien, un detalle importante es que hemos importado un módulo de Routing propio del módulo *LazyModule*:

```typescript
import { routing } from './lazy.routing';
```

ya que estamos, vamos a echar un vistazo a ese módulo de routing:

```typescript
//app/lazy/lazy.routing.ts
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LazyComponent } from './lazy.component';

const routes: Routes = [
  { path: '', component: LazyComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
```

que también tiene algunas cosas diferentes:

```typescript
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
```

No lo estamos construyendo con forRoot como los otros módulos de Routing, estamos usando *forChild*. 
Importante:
---

Siempre debemos hacerlo, usar *forChild* cuando se crea un objeto de enrutamiento para un módulo *feature*, no importa si el módulo se supone que se carga Lazy o no.

Y por último ya solo nos queda ver el componente Lazy:

```typescript
app/lazy/lazy.component.ts
import { Component } from '@angular/core';

@Component({
  template: '<p>Lazy Component</p>'
})
export class LazyComponent {}
```

## AoT

### El problema

Cuando el Browser renderiza la aplicación el template de cada componente debe ser convertido a un ejecutable (transpilación) por el compilador a un Script JavaScript. Esto lo realiza el compilador del navegador Just-in-Time (JiT) compiler.

Esto lo explica muy bien Tobias Bosch en esta charla tan densa: https://www.youtube.com/watch?v=kW9cJsvcsGo

Esto es pesado y el proceso es determinista, significa que invariablemente, siempre y cuando no cambiemos el template, el resultado de la trasnpilación es exacatamente el mismo. Eso cada vez que en cualquier parte del mundo a cualquier hora, alguien carga en su navegador nuestra aplicación.

¿Por qué no hacer ese proceso una sola vez? 

Y ya de paso realizamos una inspección de los errores de la generación del template en tiempo de desarrollo y no en tiempo de ejecución. Todo son ventajas.

A ver, con AoT ganamos en:

* Velocidad de renderizado.
* Eliminar llamadas a recursos externos al poder incluirlos en el template compilado.
* Optimización de los tamaños de los ficheros y menor tiempo de descarga de aplicación.
* Detección temprana de errores en tiempo de creación.
* Mejor seguridad ya que hacemos más díficil los ataques por inyección de código.

Bueno, AoT no es gratis, hay algunas cosas que tenemos que hacer para poder beneficiarnos de esta "maravilla de la técnica".

Pasos que tenemos que realizar:

1. Asegurarnos que los templates de los componentes que vayamos a precompilar estén separados y no incluidos en el componente.

```html
<!-- app.component.html -->
<button (click)="toggleHeading()">Toggle Heading</button>
<h1 *ngIf="showHeading">Hello Angular</h1>

<h3>List of Heroes</h3>
<div *ngFor="let hero of heroes">{{hero}}</div>
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  showHeading = true;
  heroes = ['Magneta', 'Bombasto', 'Magma', 'Tornado'];

  toggleHeading() {
    this.showHeading = !this.showHeading;
  }
}
```

2. Instalar nuevas dependecias:

> npm install @angular/compiler-cli @angular/platform-server --save


3. Una configuración especial para aot. Creando un nuevo fichero 'tsconfig-aot.json':

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "es2015",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": ["es2015", "dom"],
    "noImplicitAny": true,
    "suppressImplicitAnyIndexErrors": true
  },

  "files": [
    "app/app.module.ts",
    "app/main.ts"
  ],

  "angularCompilerOptions": {
   "genDir": "aot",
   "skipMetadataEmit" : true
 }
}
```

importantes las secciones:

```
"lib": ["es2015", "dom"],

"files": [
    "app/app.module.ts",
    "app/main.ts"
  ],

"angularCompilerOptions": {
   "genDir": "aot",
   "skipMetadataEmit" : true
 }
```

Lo que es realmente nuevo es la sección llamada *angularCompilerOptions*. Su propiedad "genDir" le dice al compilador que almacene los archivos de salida compilados en una nueva carpeta aot.

La propiedad "skipMetadataEmit": true impide que el compilador genere archivos de metadatos con la aplicación compilada. Los archivos de metadatos no son necesarios cuando se direccionan archivos TypeScript, por lo que no hay razón para incluirlos.

4. Compilar la aplicación tomando la nueva configuración

> ngc -p tsconfig-aot.json

5. Realizar el bootstrapping de la aplicación para AoT.

Para AoT:

```typescript
//main.ts (AoT)
import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/app/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
```

para JIT:

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

Es incompatible AoT con JIT. Para nada, de hecho lo mejor es usar Jit para desarrollo y AoT para producción.