import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";

export const SignatureSigner = ({
  signature,
  setSignature,
  hideForContractSigning,
}: {
  signature: string;
  setSignature: React.Dispatch<React.SetStateAction<string>>;
  hideForContractSigning: boolean;
}) => {
  const sigPad = useRef<SignatureCanvas>(null);

  const clear = () => {
    if (sigPad.current) {
      sigPad.current.clear();
    }
  };

  const trim = () => {
    if (sigPad.current) {
      setSignature(sigPad.current.getTrimmedCanvas().toDataURL("image/png"));
    }
  };

  const resign = () => {
    setSignature("");
  };

  return (
    <div className="mx-auto flex max-w-[500px] flex-col text-center">
      {!signature ? (
        <div>
          <SignatureCanvas
            ref={sigPad}
            canvasProps={{
              width: 500,
              height: 200,
              className: "border bg-white",
            }}
          />

          <div className="mt-6 flex justify-center space-x-2">
            <Button size="sm" variant="ghost" onClick={clear}>
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>

            <Button size="sm" variant="outline" onClick={trim}>
              <Check className="mr-2 h-4 w-4" />
              Finish
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center">
            <Image src={signature} alt="Signature" width={200} height={200} />
          </div>

          {!hideForContractSigning && (
            <div className="mt-6 flex justify-center space-x-2">
              <Button size="sm" variant="outline" onClick={resign}>
                <ReloadIcon className="mr-2 h-4 w-4" />
                Try again
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
