"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = exports.DIContainer = void 0;
class DIContainer {
    constructor() {
        this.factories = new Map();
        this.singletons = new Map();
    }
    register(name, factory, isSingleton = true) {
        this.factories.set(name, factory);
        if (isSingleton) {
            this.singletons.set(name, null);
        }
    }
    resolve(name) {
        const factory = this.factories.get(name);
        if (!factory) {
            throw new Error(`Service '${name}' not registered in DI container`);
        }
        if (this.singletons.has(name)) {
            const instance = this.singletons.get(name);
            if (instance !== null) {
                return instance;
            }
            const newInstance = factory();
            this.singletons.set(name, newInstance);
            return newInstance;
        }
        return factory();
    }
    clear() {
        this.factories.clear();
        this.singletons.clear();
    }
}
exports.DIContainer = DIContainer;
exports.container = new DIContainer();
//# sourceMappingURL=container.js.map