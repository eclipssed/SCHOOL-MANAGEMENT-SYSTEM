"use server";

import { clerkClient } from "@clerk/nextjs/server";
import {
  ClassPropType,
  SubjectPropType,
  TeacherPropType,
} from "./formValidationSchemas";
import prisma from "./prisma";
import { Prisma } from "@prisma/client";
import { handleAppError } from "./errorHandler";

const clerkAuthClient = await clerkClient();
export type currentStateType =
  | {
      success: true;
      error: false;
      message: string;
    }
  | {
      success: false;
      error: true;
      field?: string;
      message: string;
    }
  | {
      success: false;
      error: false;
      message: string;
    };

// SUBJECT ACTIONS
// CREATE
export const createSubject = async (
  currentState: currentStateType,
  data: SubjectPropType
): Promise<currentStateType> => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });
    // revalidatePath("/list/subjects");
    return {
      success: true,
      error: false,
      message: "success",
    };
  } catch (error) {
    console.error("error:", JSON.stringify(error, null, 2));
    const { field, message } = handleAppError(error);
    return {
      success: false,
      error: true,
      field,
      message,
    };
  }
};
// UPDATE
export const updateSubject = async (
  currentState: currentStateType,
  data: SubjectPropType
): Promise<currentStateType> => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });
    // revalidatePath("/list/subjects");
    return {
      success: true,
      error: false,
      message: "success",
    };
  } catch (error) {
    console.error("error:", JSON.stringify(error, null, 2));
    const { field, message } = handleAppError(error);
    return {
      success: false,
      error: true,
      field,
      message,
    };
  }
};
// DELETE
export const deleteSubject = async (
  currentState: currentStateType,
  data: FormData
): Promise<currentStateType> => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });
    // revalidatePath("/list/subjects");
    return {
      success: true,
      error: false,
      message: "success",
    };
  } catch (error) {
    console.error("error:", JSON.stringify(error, null, 2));
    const { field, message } = handleAppError(error);
    return {
      success: false,
      error: true,
      field,
      message,
    };
  }
};

// CLASS ACTIONS
// CREATE
export const createClass = async (
  currentState: currentStateType,
  data: ClassPropType
): Promise<currentStateType> => {
  try {
    await prisma.class.create({
      data,
    });
    // revalidatePath("/list/Classs");
    return {
      success: true,
      error: false,
      message: "success",
    };
  } catch (error) {
    console.error("error:", JSON.stringify(error, null, 2));
    const { field, message } = handleAppError(error);
    return {
      success: false,
      error: true,
      field,
      message,
    };
  }
};
// UPDATE
export const updateClass = async (
  currentState: currentStateType,
  data: ClassPropType
): Promise<currentStateType> => {
  try {
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data,
    });
    // revalidatePath("/list/Classs");
    return {
      success: true,
      error: false,
      message: "success",
    };
  } catch (error) {
    console.error("error:", JSON.stringify(error, null, 2));
    const { field, message } = handleAppError(error);
    return {
      success: false,
      error: true,
      field,
      message,
    };
  }
};
// DELETE
export const deleteClass = async (
  currentState: currentStateType,
  data: FormData
): Promise<currentStateType> => {
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });
    // revalidatePath("/list/class");
    return {
      success: true,
      error: false,
      message: "success",
    };
  } catch (error) {
    console.error("error:", JSON.stringify(error, null, 2));
    const { field, message } = handleAppError(error);
    return {
      success: false,
      error: true,
      field,
      message,
    };
  }
};

// TECHER ACTIONS
// CREATE
export const createTeacher = async (
  currentState: currentStateType,
  data: TeacherPropType
): Promise<currentStateType> => {
  try {
    // console.log(data);
    const user = await clerkAuthClient.users.createUser({
      emailAddress: (data.email && [data.email]) || undefined,
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "teacher" },
    });
    // console.log("user: ", user);
    try {
      await prisma.teacher.create({
        data: {
          id: user.id,
          email: data.email,
          username: data.username,
          name: data.name,
          surname: data.surname,
          phone: data.phone,
          address: data.address,
          img: data.img,
          bloodType: data.bloodType,
          sex: data.sex,
          birthday: data.birthday,
          subjects: {
            connect: data.subjects?.map((subjectId: string) => ({
              id: parseInt(subjectId),
            })),
          },
        },
      });
    } catch (prismaErr) {
      // Prisma failed → roll back Clerk user
      await clerkAuthClient.users.deleteUser(user.id);
      throw prismaErr;
    }
    // revalidatePath("/list/teachers");
    return {
      success: true,
      error: false,
      message: "success",
    };
  } catch (error) {
    console.error("error:", JSON.stringify(error, null, 2));
    const { field, message } = handleAppError(error);
    return {
      success: false,
      error: true,
      field,
      message,
    };
  }
};

// UPDATE
export const updateTeacher = async (
  currentState: currentStateType,
  data: TeacherPropType
): Promise<currentStateType> => {
  if (!data.id) {
    return {
      success: false,
      error: true,
      message: "id is needed for updation",
    };
  }
  try {
    const user = await clerkAuthClient.users.updateUser(data?.id, {
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "teacher" },
    });
    // console.log("user: ", user);
    try {
      await prisma.teacher.update({
        where: { id: data.id },
        data: {
          // id: user.id,
          email: data.email,
          username: data.username,
          name: data.name,
          surname: data.surname,
          phone: data.phone,
          address: data.address,
          img: data.img,
          bloodType: data.bloodType,
          sex: data.sex,
          birthday: data.birthday,
          subjects: {
            connect: data.subjects?.map((subjectId: string) => ({
              id: parseInt(subjectId),
            })),
          },
        },
      });
    } catch (prismaErr) {
      // Prisma failed → roll back Clerk user
      await clerkAuthClient.users.deleteUser(user.id);
      throw prismaErr;
    }
    // revalidatePath("/list/teachers");
    return {
      success: true,
      error: false,
      message: "success",
    };
  } catch (error) {
    console.error("error:", JSON.stringify(error, null, 2));
    const { field, message } = handleAppError(error);
    return {
      success: false,
      error: true,
      field,
      message,
    };
  }
};

// DELETE
export const deleteTeacher = async (
  currentState: currentStateType,
  data: FormData
): Promise<currentStateType> => {
  const id = data.get("id") as string;
  try {
    await prisma.teacher.delete({
      where: {
        id: id,
      },
    });
    await clerkAuthClient.users.deleteUser(id);

    // revalidatePath("/list/teachers");
    return {
      success: true,
      error: false,
      message: "success",
    };
  } catch (error) {
    console.error("error:", JSON.stringify(error, null, 2));
    const { field, message } = handleAppError(error);
    return {
      success: false,
      error: true,
      field,
      message,
    };
  }
};
