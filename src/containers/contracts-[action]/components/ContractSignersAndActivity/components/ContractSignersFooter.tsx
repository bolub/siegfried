import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

const Preview = ({
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
        <Button type="button" variant="secondary" className="w-full" size="lg">
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogDescription>
            <div className="mb-20">
              <div className="flex w-full flex-col text-center">
                <Logo type="text" />

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
}: {
  isLoading?: boolean;
  disabled?: boolean;
  action: string;
  contract: {
    name?: string;
    content?: string;
  };
}) => {
  return (
    <>
      <div className="mt-auto w-full border-t p-6">
        <Preview contract={contract} />
        <Button
          type="submit"
          className="mt-3 w-full"
          size="lg"
          isLoading={isLoading}
          disabled={disabled}
        >
          {action}
        </Button>
      </div>
    </>
  );
};
