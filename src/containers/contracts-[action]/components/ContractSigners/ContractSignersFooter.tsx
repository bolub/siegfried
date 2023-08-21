import { Button } from "@/components/ui/button";

export const ContractSignersFooter = ({
  isLoading,
  action,
  disabled,
}: {
  isLoading: boolean;
  disabled?: boolean;
  action: string;
}) => {
  return (
    <div className="mb-22 mt-auto w-full border-t p-6">
      <Button type="button" variant="secondary" className="w-full" size="lg">
        Preview
      </Button>
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
  );
};
