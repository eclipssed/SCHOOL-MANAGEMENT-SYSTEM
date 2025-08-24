"use client";

import Image from "next/image";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
  useActionState,
  ReactNode,
  ReactElement,
} from "react";
import dynamic from "next/dynamic";
import { deleteClass, deleteSubject, deleteTeacher } from "@/lib/actions";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormContainerProps } from "./FormContainer";
import { error } from "console";

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteSubject,
  parent: deleteSubject,
  lesson: deleteSubject,
  exam: deleteSubject,
  assignment: deleteSubject,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,
  announcement: deleteSubject,
};

// DYNAMIC IMPORTS
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ParentForm = dynamic(() => import("./forms/ParentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h1>Loading...</h1>,
});
const LessonForm = dynamic(() => import("./forms/LessonForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <h1>Loading...</h1>,
});
const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ResultForm = dynamic(() => import("./forms/ResultForm"), {
  loading: () => <h1>Loading...</h1>,
});
const AttendanceForm = dynamic(() => import("./forms/AttendacneForm"), {
  loading: () => <h1>Loading...</h1>,
});
const EventForm = dynamic(() => import("./forms/EventForm"), {
  loading: () => <h1>Loading...</h1>,
});
const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (
    type: "create" | "update",
    setOpen: Dispatch<SetStateAction<boolean>>,
    data?: any,
    relatedData?: any
  ) => ReactElement;
} = {
  teacher: (type, data, setOpen, relatedData) => (
    <TeacherForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  student: (type, data, setOpen) => (
    <StudentForm type={type} data={data} setOpen={setOpen} />
  ),
  parent: (type, data, setOpen) => (
    <ParentForm type={type} data={data} setOpen={setOpen} />
  ),
  subject: (type, data, setOpen, relatedData) => (
    <SubjectForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  class: (type, data, setOpen, relatedData) => (
    <ClassForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  lesson: (type, data, setOpen) => (
    <LessonForm type={type} data={data} setOpen={setOpen} />
  ),
  exam: (type, data, setOpen) => (
    <ExamForm type={type} data={data} setOpen={setOpen} />
  ),
  assignment: (type, data, setOpen) => (
    <AssignmentForm type={type} data={data} setOpen={setOpen} />
  ),
  result: (type, data, setOpen) => (
    <ResultForm type={type} data={data} setOpen={setOpen} />
  ),
  attendance: (type, data, setOpen) => (
    <AttendanceForm type={type} data={data} setOpen={setOpen} />
  ),
  event: (type, data, setOpen) => (
    <EventForm type={type} data={data} setOpen={setOpen} />
  ),
  announcement: (type, data, setOpen) => (
    <AnnouncementForm type={type} data={data} setOpen={setOpen} />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState<boolean>(false);

  const Form = () => {
    const router = useRouter();
    const [state, formAction] = useActionState(deleteActionMap[table], {
      success: false,
      error: false,
      message: "",
    });
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
      startTransition(() => {
        formAction(formData);
      });
    };

    useEffect(() => {
      if (state.success) {
        toast.success(`${table} had been deleted`);
        router.refresh();
        setOpen(false);
      }
      if (state.error) {
        toast.error(state.message);
      }
    }, [state]);

    return type === "delete" && id ? (
      <form action={handleSubmit} className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" defaultValue={id} hidden />
        <span className="text-center font-medium">
          All data will be lost. Are you sure you wanna delete this {table}?
        </span>
        <button className="text-white py-2 px-4 border-none bg-red-700 rounded-md w-max self-center">
          {isPending ? (
            <p className="flex gap-2 items-center ">
              Deleting
              <Loader className="animate-spin" />
            </p>
          ) : (
            <p>Delete</p>
          )}{" "}
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data, setOpen, relatedData)
    ) : (
      "Form not found"
    );
  };

  return (
    <>
      <button
        className={`${size} ${bgColor} flex items-center justify-center  rounded-full`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt={`${type}`} height={16} width={16} />
      </button>
      {open && (
        <div className="w-screen h-screen bg-black bg-opacity-60 absolute left-0 top-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-4 relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              onClick={() => setOpen(false)}
              className="absolute top-4 cursor-pointer right-4"
            >
              <Image
                src={"/close.png"}
                alt="close icon"
                width={14}
                height={14}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
