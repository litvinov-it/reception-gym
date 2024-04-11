import { z } from "zod";
import { sheduleSchema } from "./validation-schemas";

// Различные типы для TS

export type SheduleTypes = z.infer<typeof sheduleSchema>;
export type TSheduleForm = SheduleTypes;
export type SheduleFields = keyof SheduleTypes;

export interface IShedule extends SheduleTypes {
  id: number;  
}

export interface IInputShedule {
  label: string;
  type: string;
  register: any;
  defaultValue: string | number | undefined;
  errorName: SheduleFields;
  placeholder?: string;
}