import { Mongoose, Schema, Model } from 'mongoose';
import { MPoemRemark } from '../interfaces/poemRemark.interface';

export default (mongooseClient: Mongoose): Model<MPoemRemark> => {
    const poemRemarkSchema: Schema = new mongooseClient.Schema({
        text: {
            type: String,
            required: [true, 'Remark text is required'],
        },

        poem: {
            type: Schema.Types.ObjectId,
            ref: 'Poem',
            required: [true, 'Poem id is required'],
        },
    });

    const model: Model<MPoemRemark> = mongooseClient.model('PoemRemark', poemRemarkSchema);

    return model;
};
