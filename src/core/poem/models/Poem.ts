import { Mongoose, Schema, Model } from 'mongoose';
import { MPoem } from '../interfaces/poem.interface';

export default (mongooseClient: Mongoose): Model<MPoem> => {
    const poemSchema: Schema = new mongooseClient.Schema({
        title: {
            type: String,
            required: [true, 'Title is required'],
        },

        verse: {
            type: String,
            required: [true, 'Poem text is required'],
        },

        poet: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Poet id is required'],
        },

        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],

        remarks: [{
            type: Schema.Types.ObjectId,
            ref: 'Remark',
        }],
    });

    const model: Model<MPoem> = mongooseClient.model('Poem', poemSchema);

    return model;
};
