import { type Control, type UseFormRegister } from "react-hook-form";
import { z } from "zod";

export const ContractSignerSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
});

export const ContractSignersSchema = z.array(ContractSignerSchema);

export const FormDataSchema = z.object({
  contractName: z.string(),
  contractContent: z.string(),
  signers: z.array(ContractSignerSchema),
});

export type ContractSigner = z.infer<typeof ContractSignerSchema>;
export type ContractSigners = z.infer<typeof ContractSignersSchema>;
export type ContractFormData = z.infer<typeof FormDataSchema>;
export type ContractFormRegisterType = UseFormRegister<ContractFormData>;
export type ContractFormControlType = Control<ContractFormData>;
