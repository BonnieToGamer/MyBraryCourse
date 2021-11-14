import mongoose from 'mongoose';
import Book from './book.js';

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// check if author still has books
authorSchema.pre('remove', function(next) {
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      next(err);
    } else if (books.length > 0) {
      next(new Error('This author still has books'));
    } else {
      next();
    }
  })
});

export default mongoose.model('Author', authorSchema);