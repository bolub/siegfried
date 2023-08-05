import { type Control, type UseFormRegister } from "react-hook-form";
import { z } from "zod";

export const SignerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const FormDataSchema = z.object({
  contractName: z.string(),
  contractContent: z.string(),
  signers: z.array(SignerSchema),
});

export type ContractFormData = z.infer<typeof FormDataSchema>;
export type ContractFormRegisterType = UseFormRegister<ContractFormData>;
export type ContractFormControlType = Control<ContractFormData>;
