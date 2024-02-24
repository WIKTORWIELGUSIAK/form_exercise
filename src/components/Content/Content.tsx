import { ItemCheckState, ItemPriceState } from "../ListContainer/ListContainer";
import { AccordionContent } from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";

type ContentProps = {
  item: string;
  checkedItems: ItemCheckState;
  toggleItem: (item: string) => void;
  itemPrices: ItemPriceState;
};
const Content = ({
  item,
  checkedItems,
  toggleItem,
  itemPrices,
}: ContentProps) => {
  return (
    <AccordionContent key={item} className="flex items-center">
      <Checkbox
        checked={checkedItems[item]}
        onCheckedChange={() => toggleItem(item)}
      />
      <div className="flex justify-between w-full">
        <span className="pl-4">
          {item.charAt(0).toUpperCase() + item.slice(1)}{" "}
        </span>
        <span>{itemPrices[item] && `${itemPrices[item]}`}</span>
      </div>
    </AccordionContent>
  );
};

export default Content;
