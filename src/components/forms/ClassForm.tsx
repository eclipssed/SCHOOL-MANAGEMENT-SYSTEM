"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { ClassPropType, classSchema } from "@/lib/formValidationSchemas";
import { createClass, updateClass } from "@/lib/actions";
import { toast } from "react-toastify";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useActionState,
  useTransition,
} from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MultiSelect } from "../MultiSelect";
import { Input } from "../ui/input";

const ClassForm = ({
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
    type === "create" ? createClass : updateClass,
    {
      success: false,
      error: false,
      message: "",
    }
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<ClassPropType>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      id: data?.id,
      name: data?.name ?? "",
      capacity: data?.capacity ?? "",
      supervisorId: data?.supervisorId ?? "",
      gradeId: data?.gradeId ?? "",
    },
  });

  function onSubmit(values: ClassPropType) {
    startTransition(() => {
      formAction(values);
    });
  }

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Class had been ${type === "create" ? "created" : "updated"}`
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
  }, [state]);
  // console.log(relatedData);

  const { teachers, grades } = relatedData;

  // console.log("data: ", data);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
        className="flex flex-col gap-8"
      >
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create a new class." : "Update the class"}
        </h1>

        <div className="flex justify-between flex-wrap gap-4">
          {/* name */}
          <FormInputField
            label="Class name"
            name="name"
            placeholder="5C"
            form={form}
            // defaultValue={data?.name}
          />
          {/* capacity */}
          <div className="w-full md:w-1/4 flex flex-col gap-2">
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"text-xs text-gray-500 "}>
                    Capacity
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      // defaultValue={field.value}
                      placeholder="eg: 54"
                      className="ring-[1.5px] ring-gray-300 rounded-md p-2 text-sm w-full"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300 text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* select teacher */}
          <div className="w-full md:w-1/4 flex flex-col gap-2 ">
            <FormField
              control={form.control}
              name="supervisorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-gray-500 ">
                    Supervisor
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="ring-[1.5px] ring-gray-300 rounded-md p-2 text-sm w-full">
                        <SelectValue placeholder="Select teacher" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teachers?.map(
                        (teacher: {
                          id: string;
                          name: string;
                          surname: string;
                        }) => (
                          <SelectItem key={teacher.id} value={teacher.id}>
                            {teacher.name + " " + teacher.surname}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-300 text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* select grade */}
          <div className="w-full md:w-1/4 flex flex-col gap-2 ">
            <FormField
              control={form.control}
              name="gradeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-gray-500 ">
                    Grade
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={
                      // String(field.value)
                      field.value ? String(field?.value) : undefined
                    }
                  >
                    <FormControl>
                      <SelectTrigger className="ring-[1.5px] ring-gray-300 rounded-md p-2 text-sm w-full">
                        <SelectValue placeholder="eg: 5C--->5" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {grades?.map((grade: { id: number; level: number }) => (
                        <SelectItem
                          // selected={data && field.value === grade.id}
                          key={grade.id}
                          value={String(grade.id)}
                        >
                          {grade.level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default ClassForm;
