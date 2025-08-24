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
import { SubjectPropType, subjectSchema } from "@/lib/formValidationSchemas";
import { createSubject, updateSubject } from "@/lib/actions";
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

const SubjectForm = ({
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
    type === "create" ? createSubject : updateSubject,
    {
      success: false,
      error: false,
      message: "",
    }
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<SubjectPropType>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      id: data?.id,
      name: data?.name ?? "",
      teachers: data?.teachers?.map((t: any) => t.id) ?? [],
    },
  });

  function onSubmit(values: SubjectPropType) {
    startTransition(() => {
      formAction(values);
    });
  }

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Subject had been ${type === "create" ? "created" : "updated"}`
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

  const { teachers } = relatedData;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
        className="flex flex-col gap-8"
      >
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create a new subject." : "Update the subject"}
        </h1>

        <div className="flex flex-col gap-4">
          {/* name */}
          <FormInputField
            label="Subject name"
            name="name"
            placeholder="physics"
            form={form}
            defaultValue={data?.name}
          />

          {/* select teacher */}
          {/* <div className="w-full md:w-1/4 flex flex-col gap-2 "> */}
          <FormField
            control={form.control}
            name="teachers"
            render={({ field }) => {
              // console.log(field.value);
              return (
                <FormItem>
                  <FormLabel className="text-xs text-gray-500 ">
                    Select teachers
                  </FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={teachers}
                      selected={field.value || []}
                      onChange={field.onChange}
                      placeholder="Select teachers..."
                    />
                  </FormControl>
                  <FormMessage className="text-red-300 text-xs" />
                </FormItem>
              );
            }}
          />
          {/* </div> */}
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

export default SubjectForm;
