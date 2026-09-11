"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const mongodb_1 = require("mongodb");
class BaseRepository {
    constructor(db, collection) {
        this.db = db;
        this.collection = collection;
    }
    getCollection() {
        return this.db.collection(this.collection);
    }
    async findById(id) {
        const collection = this.getCollection();
        const result = await collection.findOne({ _id: new mongodb_1.ObjectId(id) });
        return result;
    }
    async findOne(filter) {
        const collection = this.getCollection();
        const result = await collection.findOne(filter);
        return result;
    }
    async findMany(filter = {}, pagination, sort) {
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
            data: data,
            total,
            page: pagination?.page || 1,
            limit: pagination?.limit || total,
            totalPages: pagination ? Math.ceil(total / pagination.limit) : 1,
        };
    }
    async create(data) {
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
        return created;
    }
    async update(id, data) {
        const collection = this.getCollection();
        const updateData = {
            $set: {
                ...data,
                updatedAt: new Date(),
            },
        };
        await collection.updateOne({ _id: new mongodb_1.ObjectId(id) }, updateData);
        return this.findById(id);
    }
    async delete(id) {
        const collection = this.getCollection();
        const result = await collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return result.deletedCount > 0;
    }
    async count(filter = {}) {
        const collection = this.getCollection();
        return collection.countDocuments(filter);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map