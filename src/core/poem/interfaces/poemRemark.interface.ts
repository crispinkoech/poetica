import { Document, Types } from 'mongoose';

interface IPoemRemark {
    text?: string;
    poem?: Types.ObjectId;
}

interface MPoemRemark extends IPoemRemark, Document { }

export { IPoemRemark, MPoemRemark };
