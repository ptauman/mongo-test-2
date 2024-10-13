import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";


export interface IClass extends Document {
  className: string;
  teacher: Types.ObjectId;
  students: Types.ObjectId[];
}
const classSchema = new Schema<IClass>({
  className: {
    type: String,
    required: true
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});
export default mongoose.model<IClass>("Post", classSchema);
