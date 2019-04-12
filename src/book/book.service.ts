import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.interface';
import { BookDTO } from './book.dto';

@Injectable()
export class BookService {
    constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) { }

    async list(): Promise<Book[]> {
        return await this.bookModel.find().exec();
    }

    async get(id: string): Promise<Book> {
        return await this.bookModel.findById(id).exec();
    }

    async create(book: BookDTO): Promise<Book> {
        return await new this.bookModel(book).save();
    }

    async change(id: string, book: BookDTO): Promise<Book> {
        return await this.bookModel.findByIdAndUpdate(id, book, { new: true });
    }

    async remove(id: string): Promise<Book> {
        return await this.bookModel.findByIdAndRemove(id);
    }
}
