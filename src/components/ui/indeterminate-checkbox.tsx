import { Check, Minus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type CheckboxValue = boolean | "indeterminate";

export type SelectionProps = {
  getIsAllSelected: () => boolean;
  getIsSomeSelected: () => boolean;
  toggleAllSelected: (value: boolean) => void;
};

type IndeterminateCheckboxProps = {
  selection: SelectionProps;
  className?: string;
};

export function IndeterminateCheckbox({
  selection,
  className,
  ...props
}: IndeterminateCheckboxProps) {
  const checkedState = (() => {
    if (selection.getIsAllSelected()) {
      return true;
    } else if (selection.getIsSomeSelected()) {
      return "indeterminate";
    } else {
      return false;
    }
  })();

  const handleCheckedChange = (value: CheckboxValue) => {
    if (value === "indeterminate" || selection.getIsAllSelected()) {
      selection.toggleAllSelected(!selection.getIsAllSelected());
    } else {
      selection.toggleAllSelected(!!value);
    }
  };
  return (
    <span className="flex">
      <Checkbox
        className={cn(
          "data-[state=indeterminate]:border-dominant data-[state=indeterminate]:bg-main-100 data-[state=indeterminate]:text-dominant dark:data-[state=indeterminate]:bg-transparent dark:data-[state=checked]:text-white dark:data-[state=indeterminate]:text-white",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        checked={checkedState}
        onCheckedChange={handleCheckedChange}
        {...props}
      >
        {checkedState === "indeterminate" ? (
          <Minus className="h-4 w-4" />
        ) : (
          <Check className="h-4 w-4" />
        )}
      </Checkbox>
    </span>
  );
}
