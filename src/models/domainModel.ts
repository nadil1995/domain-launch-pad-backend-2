import mongoose, { Schema, Document } from 'mongoose';

export interface IDomain extends Document {
  domainName: string;
  user: mongoose.Types.ObjectId;
  dnsStatus: 'Pending' | 'Verified' | 'Failed';
  isVerified: boolean;
}

const DomainSchema: Schema = new Schema({
  domainName: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dnsStatus: { type: String, enum: ['Pending', 'Verified', 'Failed'], default: 'Pending' },
  isVerified: { type: Boolean, default: false },
});

export const Domain = mongoose.model<IDomain>('Domain', DomainSchema);
export default Domain;