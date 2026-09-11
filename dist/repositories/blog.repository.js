"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRepository = void 0;
const mongodb_1 = require("mongodb");
const base_repository_1 = require("./base.repository");
class BlogRepository extends base_repository_1.BaseRepository {
    constructor(db) {
        super(db, 'blogs');
    }
    async findByTitle(title) {
        return this.findOne({ title });
    }
    async searchByTitle(searchTerm) {
        const result = await this.findMany({
            title: { $regex: searchTerm, $options: 'i' }
        });
        return result.data;
    }
    async addSection(blogId, section) {
        const collection = this.getCollection();
        await collection.updateOne({ _id: new mongodb_1.ObjectId(blogId) }, { $push: { sections: section } });
        return this.findById(blogId);
    }
    async removeSection(blogId, sectionIndex) {
        const collection = this.getCollection();
        await collection.updateOne({ _id: new mongodb_1.ObjectId(blogId) }, { $unset: { [`sections.${sectionIndex}`]: 1 } });
        await collection.updateOne({ _id: new mongodb_1.ObjectId(blogId) }, { $pull: { sections: null } });
        return this.findById(blogId);
    }
}
exports.BlogRepository = BlogRepository;
//# sourceMappingURL=blog.repository.js.map