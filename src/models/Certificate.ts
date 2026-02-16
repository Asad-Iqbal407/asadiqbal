import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  issuer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    default: 'certification', // 'certification' or 'education'
  },
  link: {
    type: String,
  },
  image: {
    type: String,
  }
}, { timestamps: true });

export default mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);
