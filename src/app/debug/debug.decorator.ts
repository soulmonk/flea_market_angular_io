import {DebugService} from './debug.service';

export function DebugDecorator(/*options*/) {
  return (constructor: any) => {
    if (!DebugService.isDebug()) {
      return;
    }

    // You can add/remove events for your needs
    // const LIFECYCLE_HOOKS = [
    //   'ngOnInit',
    //   'ngOnChanges',
    //   'ngOnDestroy'
    // ];
    const component = constructor.name;

    const ngOnInitOriginal = constructor.prototype['ngOnInit'];
    // noinspection TsLint
    constructor.prototype['ngOnInit'] = function (...args) {
      DebugService.instance.incCountOfComponents(component);
      console.log(`%c ${component} - ngOnInit`, `color: #4CAF50; font-weight: bold`, ...args);
      ngOnInitOriginal && ngOnInitOriginal.apply(this, args); // tslint:disable-line:no-unused-expression
    };

    const ngOnChangesOriginal = constructor.prototype['ngOnChanges'];
    // noinspection TsLint
    constructor.prototype['ngOnChanges'] = function (changes) {
      // if (this.__prevChanges !== JSON.stringify(changes)) {
      //   console.log(component, 'prev >>>', this.__prevChanges, 'new >>>', JSON.stringify(changes));
      //   this.__prevChanges = JSON.stringify(changes);
      // }

      DebugService.instance.incCountChanges(component);
      console.log(`%c ${component} - ngOnChanges`, `color: #4CAF50; font-weight: bold`, changes);
      ngOnChangesOriginal && ngOnChangesOriginal.call(this, changes); // tslint:disable-line:no-unused-expression
    };

    /*

    LIFECYCLE_HOOKS.forEach(hook => {
      const original = constructor.prototype[hook];

      // must be function not arrow function
      constructor.prototype[hook] = function (...args) {
        // console.log(`%c ${component} - ${hook}`, `color: #4CAF50; font-weight: bold`, ...args);
        original && original.apply(this, args);
      };
    });*/

  };
}
