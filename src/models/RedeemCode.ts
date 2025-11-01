import mongoose, { Schema, Document } from 'mongoose';

export interface IRedeemCode extends Document {
  code: string;
  codeType: 'common' | 'unique';
  redemptionLimit?: number;
  expiryDate: Date;
  status: 'active' | 'expired';
  redeemedBy: Array<mongoose.Types.ObjectId>;
}

const RedeemCodeSchema = new Schema<IRedeemCode>({
  code: { type: String, required: true, unique: true },
  codeType: { type: String, enum: ['common', 'unique'], required: true },
  redemptionLimit: { type: Number, default: undefined },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'expired'], default: 'active' },
  redeemedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.models.RedeemCode || mongoose.model<IRedeemCode>('RedeemCode', RedeemCodeSchema);
