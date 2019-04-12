import { Controller, Post, Body, Res, HttpStatus, Get, Param, Delete, NotFoundException } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Post()
    async create(@Res() res, @Body() _book: BookDTO) {
        const book = await this.bookService.create(_book);

        return res.status(HttpStatus.OK).json({
            message : '생성완료',
            book,
        });
    }

    @Get('list')
    list() {
        return this.bookService.list();
    }

    @Get(':id')
    get(@Param('id') id) {
        return this.bookService.get(id);
    }

    @Delete(':id')
    async remove(@Res() res, @Param('id') id) {
        const book = await this.bookService.remove(id);

        if ( !book ) {
            throw new NotFoundException('도서가 존재하지 않습니다.');
        }
        return res.status(HttpStatus.OK).json({
            message : '삭제완료',
            book,
        });
    }
}
