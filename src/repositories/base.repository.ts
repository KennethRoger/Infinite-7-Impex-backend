import { Db, ObjectId, WithId } from 'mongodb';
import { PaginationOptions, PaginatedResult, SortOptions } from '../types/common';

export interface IRepository<T> {
  findById(id: string): Promise<WithId<T> | null>;
  findOne(filter: Record<string, unknown>): Promise<WithId<T> | null>;
  findMany(filter?: Record<string, unknown>, pagination?: PaginationOptions, sort?: SortOptions): Promise<PaginatedResult<WithId<T>>>;
  create(data: T): Promise<WithId<T>>;
  update(id: string, data: { [P in keyof T]?: T[P] | undefined }): Promise<WithId<T> | null>;
  delete(id: string): Promise<boolean>;
  count(filter?: Record<string, unknown>): Promise<number>;
}

export abstract class BaseRepository<T> implements IRepository<T> {
  protected collection: string;

  constructor(protected db: Db, collection: string) {
    this.collection = collection;
  }

  protected getCollection() {
    return this.db.collection(this.collection);
  }

  async findById(id: string): Promise<WithId<T> | null> {
    const collection = this.getCollection();
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result as WithId<T> | null;
  }

  async findOne(filter: Record<string, unknown>): Promise<WithId<T> | null> {
    const collection = this.getCollection();
    const result = await collection.findOne(filter);
    return result as WithId<T> | null;
  }

  async findMany(
    filter: Record<string, unknown> = {},
    pagination?: PaginationOptions,
    sort?: SortOptions
  ): Promise<PaginatedResult<WithId<T>>> {
    const collection = this.getCollection();
    
    const total = await collection.countDocuments(filter);
    
    let query = collection.find(filter);
    
    if (sort) {
      query = query.sort({ [sort.field]: sort.order === 'asc' ? 1 : -1 });
    }
    
    if (pagination) {
      const skip = (pagination.page - 1) * pagination.limit;
      query = query.skip(skip).limit(pagination.limit);
    }
    
    const data = await query.toArray();
    
    return {
      data: data as WithId<T>[],
      total,
      page: pagination?.page || 1,
      limit: pagination?.limit || total,
      totalPages: pagination ? Math.ceil(total / pagination.limit) : 1,
    };
  }

  async create(data: T): Promise<WithId<T>> {
    const collection = this.getCollection();
    const document = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(document);
    const created = await collection.findOne({ _id: result.insertedId });
    
    if (!created) {
      throw new Error('Failed to create document');
    }
    
    return created as WithId<T>;
  }

  async update(id: string, data: { [P in keyof T]?: T[P] | undefined }): Promise<WithId<T> | null> {
    const collection = this.getCollection();
    const updateData = {
      $set: {
        ...data,
        updatedAt: new Date(),
      },
    };
    
    await collection.updateOne(
      { _id: new ObjectId(id) },
      updateData as any
    );
    
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const collection = this.getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  async count(filter: Record<string, unknown> = {}): Promise<number> {
    const collection = this.getCollection();
    return collection.countDocuments(filter);
  }
}