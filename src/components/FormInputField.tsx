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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

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
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={hidden ? "hidden" : "w-full md:w-1/4 flex flex-col gap-2"}>
      <FormField
        control={form.control}
        name={name as string}
        render={({ field }) => (
          <FormItem>
            <FormLabel className={"text-xs text-gray-500 "}>{label}</FormLabel>
            <FormControl>
              {type === "password" ? (
                <div className="ring-[1.5px] relative ring-gray-300 rounded-md text-sm w-full flex items-center justify-center">
                  <Input
                    className="pr-6"
                    placeholder={placeholder}
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  {showPassword ? (
                    <EyeOff
                      className="text-muted-foreground absolute right-0 mr-2 hover:cursor-pointer"
                      size={15}
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <Eye
                      className="text-muted-foreground absolute right-0 mr-2 hover:cursor-pointer"
                      size={15}
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              ) : (
                <Input
                  className="ring-[1.5px] ring-gray-300 rounded-md p-2 text-sm w-full"
                  placeholder={placeholder}
                  type={type ? type : "text"}
                  {...field}
                />
              )}
            </FormControl>
            <FormMessage className="text-red-300 text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
}

export default FormInputField;
