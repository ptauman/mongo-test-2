import mongoose, { Schema, Document, Types } from "mongoose";


export interface IClass extends Document {
  classname: string;
  teacher: Types.ObjectId;
  students: Types.ObjectId[];
}
const classSchema = new Schema<IClass>({
  classname: {
    type: String,
    required: true,
    unique: true
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});
export default mongoose.model<IClass>("class", classSchema);
