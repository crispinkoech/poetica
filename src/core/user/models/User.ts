import { Mongoose, Schema, Model } from 'mongoose';
import { MUser } from '../interfaces/user.interface';

export default (moongooseClient: Mongoose): Model<MUser> => {
    const userSchema: Schema = new moongooseClient.Schema({
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        verified: {
            type: Boolean,
            default: false,
        },
        poems: [{
            type: Schema.Types.ObjectId,
            ref: 'Poem',
        }],
    });

    const model: Model<MUser> = moongooseClient.model<MUser>('User', userSchema);

    return model;
};
