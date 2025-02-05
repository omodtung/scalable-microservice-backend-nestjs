import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  // timestamp: Date;
  @IsDate()
  startDate: Date;
  @IsDate()
  endDate: Date;
  // userId: string;
  @IsString()
  @IsNotEmpty()
  placeId: string;
  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}
