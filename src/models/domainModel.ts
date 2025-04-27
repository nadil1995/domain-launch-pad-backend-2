import mongoose, { Schema, Document } from 'mongoose';

export interface IDomain extends Document {
  name: string;
  url: string;
  isVerified: boolean; // Add isVerified
}

const DomainSchema: Schema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  isVerified: { type: Boolean, default: false }, // Add default value
});

export const Domain = mongoose.model<IDomain>('Domain', DomainSchema);
