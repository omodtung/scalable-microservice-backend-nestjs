import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservations.repository';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}
  create(createReservationDto: CreateReservationDto, userId: string) {
    return this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: userId,
    });
  }
  findAll() {
    return this.reservationsRepository.find({});
  }
  findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }
  update(_id: string, createReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: createReservationDto },
    );
  }
  remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
