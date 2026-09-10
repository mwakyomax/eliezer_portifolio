import mongoose, { Schema, Document } from 'mongoose';

export interface ICertification extends Document {
  name: string;
  issuer: string;
  issuingOrganization?: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateImage?: string;
  createdAt: Date;
}

const CertificationSchema: Schema = new Schema({
  name: { type: String, required: true },
  issuer: { type: String, default: '' },
  issuingOrganization: { type: String, default: '' },
  issueDate: { type: String, required: true },
  credentialId: { type: String, default: '' },
  credentialUrl: { type: String, default: '' },
  certificateImage: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

CertificationSchema.pre('save', function(this: any) {
  if (!this.issuer && this.issuingOrganization) this.issuer = this.issuingOrganization;
  if (!this.issuingOrganization && this.issuer) this.issuingOrganization = this.issuer;
});

export default (mongoose.models.Certification as mongoose.Model<ICertification>) || mongoose.model<ICertification>('Certification', CertificationSchema);
