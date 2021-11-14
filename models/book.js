import mongoose from "mongoose";
import path from "path";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  publishDate: {
    type: Date,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  coverImageName: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  }
});

bookSchema.virtual('coverImagePath').get(function() {
  if(this.coverImageName != null) {
    return path.join('/', coverImageBasePath, this.coverImageName);
  }
});

export const coverImageBasePath = 'uploads/bookCovers';
export default mongoose.model('Book', bookSchema);