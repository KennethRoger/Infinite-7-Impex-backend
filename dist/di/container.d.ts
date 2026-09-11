type Factory<T> = () => T;
export declare class DIContainer {
    private factories;
    private singletons;
    register<T>(name: string, factory: Factory<T>, isSingleton?: boolean): void;
    resolve<T>(name: string): T;
    clear(): void;
}
export declare const container: DIContainer;
export {};
//# sourceMappingURL=container.d.ts.map