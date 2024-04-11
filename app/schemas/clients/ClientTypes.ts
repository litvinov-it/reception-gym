import { z } from "zod";
import { clientSchema } from "./validation-schemas";

// Различные типы для TS

export type ClientTypes = z.infer<typeof clientSchema>;
export interface TClientForm extends ClientTypes {
  file: FormData;
}
export type ClientFields = keyof TClientForm;

export interface IClient extends ClientTypes {
  id: number;
}

export interface IInputClient {
  label: string;
  type: string;
  register: any;
  defaultValue: any;
  errorName: ClientFields;
  placeholder?: string;
}
