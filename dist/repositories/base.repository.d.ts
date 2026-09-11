import { Db, WithId } from 'mongodb';
import { PaginationOptions, PaginatedResult, SortOptions } from '../types/common';
export interface IRepository<T> {
    findById(id: string): Promise<WithId<T> | null>;
    findOne(filter: Record<string, unknown>): Promise<WithId<T> | null>;
    findMany(filter?: Record<string, unknown>, pagination?: PaginationOptions, sort?: SortOptions): Promise<PaginatedResult<WithId<T>>>;
    create(data: T): Promise<WithId<T>>;
    update(id: string, data: Partial<T>): Promise<WithId<T> | null>;
    delete(id: string): Promise<boolean>;
    count(filter?: Record<string, unknown>): Promise<number>;
}
export declare abstract class BaseRepository<T> implements IRepository<T> {
    protected db: Db;
    protected collection: string;
    constructor(db: Db, collection: string);
    protected getCollection(): import("mongodb").Collection<import("bson").Document>;
    findById(id: string): Promise<WithId<T> | null>;
    findOne(filter: Record<string, unknown>): Promise<WithId<T> | null>;
    findMany(filter?: Record<string, unknown>, pagination?: PaginationOptions, sort?: SortOptions): Promise<PaginatedResult<WithId<T>>>;
    create(data: T): Promise<WithId<T>>;
    update(id: string, data: Partial<T>): Promise<WithId<T> | null>;
    delete(id: string): Promise<boolean>;
    count(filter?: Record<string, unknown>): Promise<number>;
}
//# sourceMappingURL=base.repository.d.ts.map