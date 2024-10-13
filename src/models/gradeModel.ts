import mongoose, { Schema, Document, Types } from "mongoose";
export interface IGrade extends Document {
    student: Types.ObjectId;
    points: number;
    comment: string;
}

const gradeSchema = new Schema<IGrade>({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

export default mongoose.model<IGrade>("Grade", gradeSchema);


