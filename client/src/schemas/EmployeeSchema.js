import * as Yup from 'yup';
import { REQUIRED_FIELD } from '../utils/Constants';

export const EmployeeSchema = Yup.object({
    firstName: Yup.string().nullable().required(REQUIRED_FIELD),
    middleName: Yup.string().nullable(),
    lastName: Yup.string().nullable().required(REQUIRED_FIELD),
    birthDate: Yup.date().nullable().required(REQUIRED_FIELD),
    gender: Yup.string().nullable().required(REQUIRED_FIELD),
    address: Yup.string().nullable(),
    phoneNumber: Yup.string().nullable(),
    emailAddress: Yup.string().nullable().email(),
    startsAt: Yup.string().nullable(),
    endsAt: Yup.string().nullable(),
    position: Yup.string().nullable(),
    team: Yup.string().nullable(),
    billableHours: Yup.number().nullable()
})