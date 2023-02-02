import * as Yup from 'yup';
import { REQUIRED_FIELD } from '../utils/Constants';

export const TeamSchema = Yup.object({
    name: Yup.string().nullable().required(REQUIRED_FIELD),
    password: Yup.string().nullable().required(REQUIRED_FIELD),
    members: Yup.array().nullable().required(REQUIRED_FIELD),
    billableHours: Yup.number().nullable()
})