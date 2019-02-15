import { Document, Types } from 'mongoose';

interface IPoem {
    title: string;
    verse: string;
    poet: Types.ObjectId;
    likes: [Types.ObjectId];
    remarks: [Types.ObjectId];
}

interface MPoem extends IPoem, Document { }

export { IPoem, MPoem };
