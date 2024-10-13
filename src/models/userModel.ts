import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";


export interface IUser extends Document {
  username: string;
  email: string;
  profile: {
    bio?: string;
    socialLinks?: string[];
  };
  posts: Types.ObjectId[];
  password: string;
  comparePassword(userPassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  profile: {
    bio: String,
    socialLinks: [String]
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  password: {
    type: String,
    required: true
  }
});
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

UserSchema.methods.comparePassword = async function (userPassword: string) : Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};
export default mongoose.model<IUser>("User", UserSchema);
