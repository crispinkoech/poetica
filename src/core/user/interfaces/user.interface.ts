import { Document, Types } from 'mongoose';

interface IUser {
    email?: string;
    password?: string;
    name?: string;
    verified?: boolean;
    poems?: [Types.ObjectId];
}

interface MUser extends Document, IUser { }

export { IUser, MUser };
