"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CldUploadWidget } from "next-cloudinary";
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
import { CalendarIcon, Loader } from "lucide-react";
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
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
  useTransition,
} from "react";
import { TeacherPropType, teacherSchema } from "@/lib/formValidationSchemas";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { MultiSelect } from "../MultiSelect";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const TeacherForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: any;
  relatedData?: any;
}) => {
  const [state, formAction] = useActionState(
    type === "create" ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
      message: "",
    }
  );
  const [isPending, startTransition] = useTransition();
  const [img, setImg] = useState<any>();
  const router = useRouter();

  const form = useForm<TeacherPropType>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      id: data?.id,
      username: data?.username ?? "",
      email: data?.email ?? "",
      password: data?.password ?? "",
      name: data?.name ?? "",
      surname: data?.surname ?? "",
      sex: data?.sex ?? undefined,
      address: data?.address ?? "",
      phone: data?.phone ?? "",
      birthday: data?.birthday ?? undefined,
      img: data?.img ?? "",
      bloodType: data?.bloodType ?? "",
      subjects:
        data?.subjects?.map((s: { id: string | number }) => String(s.id)) ?? [],
    },
  });

  function onSubmit(values: TeacherPropType) {
    startTransition(() => {
      formAction(values);
    });
  }

  useEffect(() => {
    if (form.getValues("img")) setImg(form.getValues("img"));
    if (state.success) {
      toast.success(
        `Teacher had been ${type === "create" ? "created" : "updated"}`
      );
      router.refresh();
      setOpen(false);
    }
    if (state.error) {
      if (state.field) {
        form.setError(
          state.field as any,
          {
            type: "manual",
            message: state.message,
          },
          { shouldFocus: true }
        );
      } else {
        toast.error(state.message);
      }
    }
  }, [state, form.watch("img")]);

  const { subjects } = relatedData;

  const multiSelectType = "teacher";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-8 items-center">
          <div>
            <h1 className="text-xl font-semibold">
              {type === "create"
                ? "Create a new teacher"
                : "Update the teacher"}
            </h1>
            <span className="text-xs text-gray-400 font-medium">
              Authentication information
            </span>
          </div>
          <Image
            src={img ? img : "/avatar.png"}
            alt="upload icon"
            className="h-[100px] w-[100px] rounded-md"
            width={50}
            height={50}
          />
        </div>
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
          {/* hide password if type === update */}
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
        <div className="flex justify-between flex-wrap gap-2">
          {/* firstName */}
          <FormInputField
            label="First Name"
            name="name"
            placeholder="Furqan"
            form={form}
          />
          {/* lastName */}
          <FormInputField
            label="Last Name"
            name="surname"
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
          {/* blood */}
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
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
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
                return (
                  <>
                    <FormLabel className="text-xs text-gray-500 ">
                      Profile Image
                    </FormLabel>
                    <CldUploadWidget
                      onSuccess={(result, { widget }) => {
                        if (typeof result.info !== "string") {
                          setImg(result.info?.secure_url);
                          field.onChange(result?.info?.secure_url);
                        }
                        widget.close();
                      }}
                      uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                      }
                    >
                      {({ open }) => {
                        return (
                          <div
                            onClick={() => open()}
                            className="text-gray-500 flex gap-2 items-center ring-[1.5px] ring-gray-300 rounded-md py-1 px-2 text-sm w-full cursor-pointer"
                          >
                            <Image
                              src={"/upload.png"}
                              alt="upload icon"
                              width={28}
                              height={28}
                            />
                            <span>Upload Photo</span>
                          </div>
                        );
                      }}
                    </CldUploadWidget>

                    <FormMessage className="text-red-300 text-xs" />
                  </>
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
        {/* SELECT MULTIPLE SUBJECTS */}
        {/* <div className="w-full md:w-1/4 flex flex-col gap-2 "> */}
        <FormField
          control={form.control}
          name="subjects"
          render={({ field }) => {
            // console.log(field.value);

            return (
              <FormItem>
                <FormLabel className="text-xs text-gray-500 ">
                  Select subjects
                </FormLabel>
                <FormControl>
                  <MultiSelect
                    options={subjects}
                    selected={field.value || []}
                    onChange={field.onChange}
                    multiSelectType={multiSelectType}
                    placeholder="Select subjects..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {/* </div> */}

        <Button
          className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-md"
          type="submit"
        >
          {isPending ? (
            <p className="flex gap-2 items-center ">
              {type === "create" ? "creating" : "updating"}{" "}
              <Loader className="animate-spin" />
            </p>
          ) : type === "create" ? (
            "create"
          ) : (
            "update"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default TeacherForm;
