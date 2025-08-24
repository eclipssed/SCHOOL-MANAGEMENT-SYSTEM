import { Control, FieldValues, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

type FormInputFieldProps = {
  form: any;
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  defaultValue?: string;
  hidden?: boolean;
};

function FormInputField({
  form,
  label,
  name,
  placeholder,
  type,
  defaultValue,
  hidden,
}: FormInputFieldProps) {
  return (
    <div className={hidden ? "hidden" : "w-full md:w-1/4 flex flex-col gap-2"}>
      <FormField
        control={form.control}
        name={name as string}
        render={({ field }) => (
          <FormItem>
            <FormLabel className={"text-xs text-gray-500 "}>{label}</FormLabel>
            <FormControl>
              <Input
                className="ring-[1.5px] ring-gray-300 rounded-md p-2 text-sm w-full"
                placeholder={placeholder}
                type={type ? type : "text"}
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-300 text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
}

export default FormInputField;
