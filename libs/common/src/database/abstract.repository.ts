import { Model, Types, FilterQuery, UpdateQuery } from 'mongoose';
// import { AbstractDocument } from './abstract.document';
import { AbstractDocument } from './abstract.schema';
import { Logger } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(private readonly model: Model<TDocument>) {}
  async create(documnents: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...documnents,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);
    if (!document) {
      this.logger.error(
        `Document not found with filter: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException();
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    {
      const document = await this.model
        .findOneAndUpdate(filterQuery, update, { new: true })
        .lean<TDocument>(true);
      if (!document) {
        this.logger.error(
          `Document not found with filter: ${JSON.stringify(filterQuery)}`,
        );
        throw new NotFoundException();
      }
      return document;
    }
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    // return this.model.find(filterQuery).lean<TDocument>(true);
    return this.model.find(filterQuery).lean(true) as unknown as TDocument[];
    // must to return an array like type return on java
  }
  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    {
      const document = await this.model
        .findOneAndDelete(filterQuery)
        .lean<TDocument>(true);
      return document;
    }
  }
}
