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
import { examSchema, ExamPropType } from "@/lib/formValidationSchemas";
import {
  createExam,
  createSubject,
  updateExam,
  updateSubject,
} from "@/lib/actions";
import { toast } from "react-toastify";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useActionState,
  useTransition,
} from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { MultiSelect } from "../MultiSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

const ExamForm = ({
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
    type === "create" ? createExam : updateExam,
    {
      success: false,
      error: false,
      message: "",
    }
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<ExamPropType>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      id: data?.id,
      title: data?.title ?? "",
      startTime: data?.startTime ?? "",
      endTime: data?.endTime ?? "",
      lessonId: data?.lessonId ?? "",
    },
  });

  function onSubmit(values: ExamPropType) {
    startTransition(() => {
      formAction(values);
    });
  }

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Exam had been ${type === "create" ? "created" : "updated"}`
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

  const { lessons } = relatedData;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
        className="flex flex-col gap-8"
      >
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create a new exam." : "Update the exam"}
        </h1>

        <div className="flex flex-col gap-4">
          {/* EXAM TITLE */}
          <FormInputField
            label="Exam title"
            name="title"
            placeholder="exam..."
            form={form}
            // defaultValue={data?.title}
          />
          {/* START TIME */}
          <FormField
            control={form.control}
            name={"startTime"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"text-xs text-gray-500 "}>
                  Start time
                </FormLabel>
                <FormControl>
                  <div className="ring-[1.5px] relative ring-gray-300 rounded-md text-sm w-full flex items-center justify-center">
                    <Input
                      className="ring-[1.5px] ring-gray-300 rounded-md p-2 text-sm w-full"
                      placeholder="start date..."
                      type="datetime-local"
                      
                      value={
                        field.value
                          ? new Date(field.value).toISOString().slice(0, 16)
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-300 text-xs" />
              </FormItem>
            )}
          />
          {/* <FormInputField
            label="Start Date"
            name="startTime"
            placeholder="starting date..."
            type="datetime-local"
            form={form}
          /> */}

          {/* END TIME */}
          <FormField
            control={form.control}
            name={"endTime"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"text-xs text-gray-500 "}>
                  End time
                </FormLabel>
                <FormControl>
                  <div className="ring-[1.5px] relative ring-gray-300 rounded-md text-sm w-full flex items-center justify-center">
                    <Input
                      className="ring-[1.5px] ring-gray-300 rounded-md p-2 text-sm w-full"
                      placeholder="start date..."
                      type="datetime-local"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().slice(0, 16)
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-300 text-xs" />
              </FormItem>
            )}
          />

          {/* SELECT LESSONS */}
          {/* <div className="w-full md:w-1/4 flex flex-col gap-2 "> */}
          <FormField
            control={form.control}
            name="lessonId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-gray-500 ">Grade</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="ring-[1.5px] ring-gray-300 rounded-md p-2 text-sm w-full">
                      <SelectValue placeholder="Select Lesson" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lessons.map((lesson: { id: number; name: string }) => (
                      <SelectItem key={lesson.id} value={lesson.id.toString()}>
                        {lesson.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-300 text-xs" />
              </FormItem>
            )}
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

export default ExamForm;
