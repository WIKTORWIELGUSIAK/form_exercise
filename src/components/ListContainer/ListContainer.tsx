import { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "../ui/accordion";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Header } from "../Header/Header";
import Content from "../Content/Content";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export type ItemCheckState = {
  [key: string]: boolean;
};

export type ItemPriceState = {
  [key: string]: string;
};

const formSchema = yup.object().shape({
  price: yup
    .string()
    .required("To pole jest wymagane!")
    .matches(/^\d*\.?\d+$/, "To pole musi mieć wartość liczbową!"),
});

type FormValues = yup.InferType<typeof formSchema>;

const ListContainer = ({ foodType }: { foodType: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<string[]>([
    "jabłka",
    "banany",
    "pomarańcze",
    "wiśnie",
    "winogrona",
  ]);

  useEffect(() => {
    const newItems =
      foodType === "owoce"
        ? ["jabłka", "banany", "pomarańcze", "wiśnie", "winogrona"]
        : ["ziemniaki", "pomidory", "marchewki", "selery", "pory"];

    setItems(newItems);

    const initialCheckState = newItems.reduce(
      (acc, item) => ({ ...acc, [item]: false }),
      {}
    );
    setCheckedItems(initialCheckState);

    const initialPriceState = newItems.reduce(
      (acc, item) => ({ ...acc, [item]: "" }),
      {}
    );
    setItemPrices(initialPriceState);
  }, [foodType]);

  const [checkedItems, setCheckedItems] = useState<ItemCheckState>(
    items.reduce((acc, item) => ({ ...acc, [item]: false }), {})
  );

  const [itemPrices, setItemPrices] = useState<ItemPriceState>(
    items.reduce((acc, item) => ({ ...acc, [item]: "" }), {})
  );

  const formMethods = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = formMethods;

  const onPriceSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    // Simulate a real world scenario where this would most likely fetch data
    const newPrices = { ...itemPrices };
    await new Promise((resolve) => setTimeout(resolve, 2000));
    Object.entries(checkedItems).forEach(([item, isChecked]) => {
      if (isChecked) {
        newPrices[item] = data.price || "";
      }
    });
    reset();
    setItemPrices(newPrices);
    setIsLoading(false);
  };

  const getIsAllSelected = (): boolean =>
    items.every((item) => checkedItems[item]);
  const getIsSomeSelected = (): boolean =>
    items.some((item) => checkedItems[item]);

  const toggleAllSelected = () => {
    if (getIsAllSelected() || getIsSomeSelected()) {
      const newState = items.reduce(
        (acc: ItemCheckState, item) => ({ ...acc, [item]: false }),
        {}
      );
      setCheckedItems(newState);
    } else {
      const newState = items.reduce(
        (acc: ItemCheckState, item) => ({ ...acc, [item]: true }),
        {}
      );
      setCheckedItems(newState);
    }
  };

  const toggleItem = (item: string): void => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const selectedItems = Object.keys(checkedItems).filter(
    (item) => checkedItems[item]
  );

  return (
    <section className="flex flex-col items-center justify-between w-full">
      <Accordion
        defaultValue="item-1"
        type="single"
        collapsible
        className="w-full md:w-1/2"
      >
        <AccordionItem value="item-1">
          <Header
            getIsAllSelected={getIsAllSelected}
            getIsSomeSelected={getIsSomeSelected}
            toggleAllSelected={toggleAllSelected}
            foodType={foodType}
          />

          {items.map((item) => (
            <Content
              key={item}
              item={item}
              checkedItems={checkedItems}
              toggleItem={toggleItem}
              itemPrices={itemPrices}
            />
          ))}
        </AccordionItem>
      </Accordion>
      {selectedItems.length > 0 && (
        <div className="flex flex-col items-center justify-between p-x-24 py-8 w-full ">
          <Form {...formMethods}>
            <form
              onSubmit={handleSubmit(onPriceSubmit)}
              className="w-full space-y-6 md:w-1/2"
            >
              <p>
                {selectedItems
                  .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
                  .join(", ")}
              </p>
              <FormField
                name="price"
                control={formMethods.control}
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Cena"
                        {...register("price")}
                      />
                    </FormControl>

                    {errors.price && (
                      <FormMessage>{errors.price.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-2 w-full"
                disabled={isLoading}
                aria-disabled={isLoading}
              >
                Dodaj cenę
              </Button>
            </form>
          </Form>
        </div>
      )}
    </section>
  );
};

export default ListContainer;
