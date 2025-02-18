import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
Schema({ versionKey: false });
export class ReservationDocument extends AbstractDocument {
  // @Prop()
  // timestamp: Date;
  // @Prop()
  // startDate: Date;
  // @Prop()
  // endDate: Date;
  // @Prop()
  // userId: string;
  // @Prop()
  // placeId: string;
  // @Prop()
  // invoiceId: string;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ type: String, required: true })
  placeId: string;

  @Prop({ type: String, required: true })
  invoiceId: string;

  @Prop({ type: String, required: true })
  userId: string;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
