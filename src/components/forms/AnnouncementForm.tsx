"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormInputField from "../FormInputField";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(20, {
      message: "Username must be at most 20 characters.",
    }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  firstName: z.string().min(2, {
    message: "First name is required and must be atleast 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name is required and must be atleast 2 characters.",
  }),
  phone: z.string().min(11, {
    message: "Phone is required and must be valid and atleast 11 digits.",
  }),
  address: z.string().min(2, {
    message: "Address is required and must be atleast 2 characters.",
  }),
  bloodType: z.string().min(1, {
    message: "Blood is required and must be atleast 1 character.",
  }),
  birthday: z.date({
    message: "Birthday is required.",
  }),
  img: z.union([
    z.string().url({ message: "Invalid image URL" }),
    z.custom<FileList>(
      (files) => {
        if (!(files instanceof FileList)) return false;
        if (files.length === 0) return false;

        const file = files[0];
        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) return false;
        if (file.size > 2 * 1024 * 1024) return false; // 2MB limit

        return true;
      },
      { message: "Image is required and must be JPG, PNG, or WEBP under 2MB" }
    ),
  ]),
  sex: z.enum(["male", "female"], { message: "Sex is required" }),
});

const AnnouncementForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: data?.username,
      email: data?.email,
      password: data?.password,
      firstName: data?.firstName,
      lastName: data?.lastName,
      sex: data?.sex,
      address: data?.address,
      phone: data?.phone,
      birthday: data?.date,
      img: data?.img,
      bloodType: data?.bloodType,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <h1 className="text-xl font-semibold">Create new Student</h1>
        <span className="text-xs text-gray-400 font-medium">
          Authentication information
        </span>
        <div className="flex justify-between flex-wrap gap-4">
          {/* username */}
          <FormInputField
            label="Username"
            name="username"
            placeholder="furqanmirzaa_"
            form={form}
          />
          {/* email */}
          <FormInputField
            label="Email"
            name="email"
            placeholder="furqanmirza@gmail.com"
            form={form}
            type="text"
          />
          {/* password */}
          <FormInputField
            label="Password"
            name="password"
            placeholder="*****"
            form={form}
            type="password"
          />
        </div>
        <span className="text-xs text-gray-400 font-medium">
          Personal information
        </span>
        <div className="flex justify-between flex-wrap gap-4">
          {/* firstName */}
          <FormInputField
            label="First Name"
            name="firstName"
            placeholder="Furqan"
            form={form}
          />
          {/* lastName */}
          <FormInputField
            label="Last Name"
            name="lastName"
            placeholder="Mirza"
            form={form}
          />
          {/* address */}
          <FormInputField
            label="Address"
            name="address"
            placeholder="Khattak colony bannu road kohat."
            form={form}
          />
          {/* phone */}
          <FormInputField
            label="Phone"
            name="phone"
            placeholder="+92-343-9395514"
            form={form}
            type="tel"
          />
          {/* bloodType */}
          <FormInputField
            label="Blood"
            name="bloodType"
            placeholder="O-"
            form={form}
          />
          {/* sex */}
          <div className="w-full md:w-1/4 flex flex-col gap-2 ">
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-gray-500 ">Sex</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="ring-[1.5px] ring-gray-300 rounded-md p-2 text-sm w-full">
                        <SelectValue placeholder="Select your sex" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-300 text-xs" />
                </FormItem>
              )}
            />
          </div>
          {/* img */}

          <div className="w-full md:w-1/4 flex flex-col gap-2">
            <FormField
              control={form.control}
              name="img"
              render={({ field }) => {
                const [preview, setPreview] = useState<string | null>(null);

                useEffect(() => {
                  // Show preview if default value is a URL
                  if (
                    typeof field.value === "string" &&
                    field.value.startsWith("http")
                  ) {
                    setPreview(field.value);
                  }
                }, [field.value]);

                return (
                  <FormItem>
                    <FormLabel className="text-xs text-gray-500">
                      Image
                    </FormLabel>

                    {/* Upload button */}
                    <FormLabel
                      htmlFor="img"
                      className="text-gray-500 flex gap-2 items-center ring-[1.5px] ring-gray-300 rounded-md py-1 px-2 text-sm w-full cursor-pointer"
                    >
                      <Image
                        src={"/upload.png"}
                        alt="upload icon"
                        width={28}
                        height={28}
                      />
                      <span>Upload Photo</span>
                    </FormLabel>

                    {/* Preview image if exists */}
                    {preview && (
                      <div className="mt-2">
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-md border"
                        />
                      </div>
                    )}

                    <FormControl>
                      <Input
                        id="img"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const files = e.target.files as FileList;
                          field.onChange(files);

                          if (files && files.length > 0) {
                            setPreview(URL.createObjectURL(files[0]));
                          }
                        }}
                      />
                    </FormControl>

                    <FormMessage className="text-red-300 text-xs" />
                  </FormItem>
                );
              }}
            />
          </div>
          {/* birthdary */}
          <div className="w-full md:w-1/4 flex flex-col gap-2">
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-xs text-gray-500 ">
                    Date of birth
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " ring-[1.5px] text-black font-normal ring-gray-300 rounded-md p-2 text-sm w-full"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span className="text-gray-500">
                              Aug 31th, 2003
                            </span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-300 text-xs" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-md"
          type="submit"
        >
          {type === "create" ? "create" : "update"}
        </Button>
      </form>
    </Form>
  );
};

export default AnnouncementForm;
