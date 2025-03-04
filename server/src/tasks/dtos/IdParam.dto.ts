import { IsMongoId } from 'class-validator';

export class IdParamDto {
  @IsMongoId({ message: 'Invalid ID format' })
  id: string;
}
