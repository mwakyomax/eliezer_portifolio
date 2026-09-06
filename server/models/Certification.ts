import mongoose, { Schema, Document } from 'mongoose';

export interface ICertification extends Document {
  name: string;
  issuingOrganization: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateImage?: string;
  createdAt: Date;
}

const CertificationSchema: Schema = new Schema({
  name: { type: String, required: true },
  issuingOrganization: { type: String, required: true },
  issueDate: { type: String, required: true },
  credentialId: { type: String, default: '' },
  credentialUrl: { type: String, default: '' },
  certificateImage: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default (mongoose.models.Certification as mongoose.Model<ICertification>) || mongoose.model<ICertification>('Certification', CertificationSchema);
