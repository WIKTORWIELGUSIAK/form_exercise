import { AccordionTrigger } from "../ui/accordion";
import {
  IndeterminateCheckbox,
  SelectionProps,
} from "../ui/indeterminate-checkbox";

export const Header = ({
  getIsAllSelected,
  getIsSomeSelected,
  toggleAllSelected,
  foodType,
}: SelectionProps & { foodType: string }) => {
  return (
    <AccordionTrigger>
      <IndeterminateCheckbox
        selection={{ getIsAllSelected, getIsSomeSelected, toggleAllSelected }}
      />
      {foodType.charAt(0).toUpperCase() + foodType.slice(1)}
    </AccordionTrigger>
  );
};
