type Factory<T> = () => T;

export class DIContainer {
  private factories: Map<string, Factory<any>> = new Map();
  private singletons: Map<string, any> = new Map();

  register<T>(name: string, factory: Factory<T>, isSingleton: boolean = true): void {
    this.factories.set(name, factory);
    if (isSingleton) {
      this.singletons.set(name, null);
    }
  }

  resolve<T>(name: string): T {
    const factory = this.factories.get(name);
    if (!factory) {
      throw new Error(`Service '${name}' not registered in DI container`);
    }

    if (this.singletons.has(name)) {
      const instance = this.singletons.get(name);
      if (instance !== null) {
        return instance as T;
      }
      const newInstance = factory();
      this.singletons.set(name, newInstance);
      return newInstance as T;
    }

    return factory() as T;
  }

  clear(): void {
    this.factories.clear();
    this.singletons.clear();
  }
}

export const container = new DIContainer();