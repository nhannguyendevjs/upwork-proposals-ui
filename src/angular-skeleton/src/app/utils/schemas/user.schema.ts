import { z } from 'zod';

export interface User {
  [k: string]: any;
  _id: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
}

export const BLANK_USER: User = {
  _id: '',
  name: '',
  address: '',
  phoneNumber: '',
  email: '',
};

export const zUser = z.object({
  _id: z.string(),
  name: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
});
