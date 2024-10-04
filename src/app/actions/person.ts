"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function addPerson(formData: FormData) {
  try {
    const name = (formData.get("personName") as string) || "";
    if (name === "") {
      throw new Error("name is empty");
    }
    const data = await sql`INSERT INTO Person (NAME) VALUES (${name})`;

    // 데이터 추가에 성공하면 데이터 캐시를 초기화
    // 넣지 않으면 추가된 데이터가 바로 화면에 나타나지 않음
    revalidatePath("/");

    console.log("data", data);
    console.log("success");
  } catch (error) {
    return { error, status: 500 };
  }
}

export async function deletePerson(name: string) {
  try {
    if (name === "") {
      throw new Error("name is empty");
    }
    await sql`DELETE FROM Person WHERE NAME = ${name}`;
    console.log("Delete Success");

    revalidatePath("/");
  } catch (error) {
    return { error, status: 500 };
  }
}
