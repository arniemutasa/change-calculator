import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Float } from './entities/float.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FloatService {
    
    constructor(
        @InjectRepository(Float)
        private floatRepository: Repository<Float>,
    ){}


    async getFloat(): Promise<Float>{
        return this.floatRepository.findOne({where: {id: 1}});
    }


    async updateFloat(updatedFloat: Partial<Float>): Promise<Float>{
        const float = await this.getFloat();

        return this.floatRepository.save({
            ...float,
            ...updatedFloat
        });
    }
}
