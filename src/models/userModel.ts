import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";


export interface Iuser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'student' | 'teacher';
  grades: Types.ObjectId[];
  myClass : Types.ObjectId; 
  comparePassword(userPassword: string): Promise<boolean>;
}

const userSchema = new Schema<Iuser>({
  username: {
    type: String,
    required: true  
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'teacher'],
    default: 'student'
  },
  grades: {
    type: [Schema.Types.ObjectId],
    ref: "Grade",
    required: true
  },
  myClass : {
    type: Schema.Types.ObjectId,
    ref: "Class",
  }});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

userSchema.methods.comparePassword = async function (userPassword: string) : Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};
export default mongoose.model<Iuser>("User", userSchema);
