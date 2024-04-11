import { z } from "zod";
import { trainerSchema } from "./validation-schemas";

// Различные типы для TS

export type TrainerTypes = z.infer<typeof trainerSchema>;
export type TrainerFields = keyof TrainerTypes;
export interface TTrainerForm extends TrainerTypes {
    file: FormData;
  }

export interface ITrainer extends TrainerTypes {
    id: number;
}

export interface IInputTrainer {
    label: string;
    type: string;
    register: any;
    defaultValue: string | number | undefined;
    errorName: TrainerFields;
    placeholder?: string;
  }
  