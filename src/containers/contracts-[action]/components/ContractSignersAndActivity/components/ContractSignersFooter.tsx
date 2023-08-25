import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type ContractStatus } from "@prisma/client";
import { SaveIcon } from "lucide-react";
import { type Dispatch } from "react";

export const ContentToActivity: Record<ContractStatus, string> = {
  DRAFT: "",
  PENDING: "",
  SIGNED: "",
};

const PreviewButton = ({
  contract,
}: {
  contract: {
    name?: string;
    content?: string;
  };
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={!contract.content}
          type="button"
          variant="secondary"
          className="w-full"
          size="lg"
        >
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogDescription>
            <div className="mb-20">
              <div className="flex w-full flex-col text-center">
                <Logo className="mx-auto" />

                <h1 className="mt-9 font-mono font-bold">{contract.name}</h1>
              </div>
            </div>

            <div
              id="content"
              className="prose mx-auto break-all"
              dangerouslySetInnerHTML={{
                __html: contract.content || "",
              }}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export const ContractSignersFooter = ({
  isLoading,
  action,
  disabled,
  contract,
  setButtonAction,
}: {
  isLoading?: boolean;
  disabled?: boolean;
  action: string;
  setButtonAction?: Dispatch<React.SetStateAction<"create" | "update">>;
  contract: {
    name?: string;
    content?: string;
    status?: ContractStatus;
  };
}) => {
  const showSaveButton = !contract.status || contract.status === "DRAFT";

  return (
    <>
      <div className="mt-auto w-full border-t p-6">
        <PreviewButton contract={contract} />

        <div className="relative">
          <Button
            type="submit"
            className="relative mt-3 w-full"
            size="lg"
            isLoading={isLoading}
            disabled={disabled}
            onClick={() => {
              setButtonAction && setButtonAction("create");
            }}
          >
            {action}
          </Button>

          {showSaveButton && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="absolute right-0 top-[12px] z-20 flex h-[44px] w-10 items-center justify-center rounded-r-lg border-l text-white"
                    onClick={() => {
                      setButtonAction && setButtonAction("update");
                    }}
                  >
                    <SaveIcon className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Save as draft</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </>
  );
};
