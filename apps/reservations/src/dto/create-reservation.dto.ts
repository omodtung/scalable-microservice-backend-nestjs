import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationDto {
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;

  timestamp?: Date;
}
