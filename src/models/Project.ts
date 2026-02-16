import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  featured: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
