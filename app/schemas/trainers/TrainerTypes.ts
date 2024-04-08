import { z } from "zod";
import { trainerSchema } from "./validation-schemas";

export type TrainerTypes = z.infer<typeof trainerSchema>;
export type TrainerFields = keyof TrainerTypes;
export type TTrainerForm = TrainerTypes;

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
  