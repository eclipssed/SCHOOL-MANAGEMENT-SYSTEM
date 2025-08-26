import prisma from "@/lib/prisma";
import FormModal from "./FormModal";

export type FormContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};
  if (type !== "delete") {
    switch (table) {
      // SUBJECT CASE
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { name: true, surname: true, id: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;

      // CLASS CASE
      case "class":
        const classGrades = await prisma.grade.findMany({
          select: { level: true, id: true },
        });
        const classTeachers = await prisma.teacher.findMany({
          select: { name: true, surname: true, id: true },
        });
        relatedData = { teachers: classTeachers, grades: classGrades };
        break;

      // TEACHER CASE
      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select: { name: true, id: true },
        });

        relatedData = { subjects: teacherSubjects };
        break;

      // STUDENT CASE
      case "student":
        const studentGrades = await prisma.grade.findMany({
          select: { level: true, id: true },
        });
        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        });

        relatedData = { grades: studentGrades, classes: studentClasses };
        break;

      default:
        break;
    }
  }

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
