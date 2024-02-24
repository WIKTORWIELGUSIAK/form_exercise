import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FormLabel,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useState } from "react";

interface FoodFormProps {
  foodType: string;
  setFoodType: React.Dispatch<React.SetStateAction<string>>;
}

const formSchema = yup
  .object({
    food: yup.string().required("To pole jest wymagane!"),
  })
  .required();

type FormValues = yup.InferType<typeof formSchema>;

const FoodForm = ({ foodType, setFoodType }: FoodFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formMethods = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: { food: string }) => {
    if (data.food !== foodType) {
      setIsLoading(true);
      // Simulate a real world scenario where this would most likely fetch data
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setFoodType(data.food);
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-between w-full">
      <Form {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className="w-full space-y-6 md:w-1/2"
        >
          <FormField
            control={formMethods.control}
            name="food"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jedzenie</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="wybierz" disabled>
                      Wybierz
                    </SelectItem>
                    <SelectItem value="warzywa">Warzywa</SelectItem>
                    <SelectItem value="owoce">Owoce</SelectItem>
                  </SelectContent>
                </Select>
                {formMethods.formState.errors && (
                  <FormMessage>
                    {formMethods.formState.errors.food?.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            aria-disabled={isLoading}
          >
            Wyślij
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default FoodForm;
