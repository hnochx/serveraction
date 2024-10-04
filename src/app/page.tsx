import { sql } from "@vercel/postgres";
import RemoveButton from "./components/remove-button";
import FormEditor from "./components/form-editor";

// v2
export default async function Home() {
  // API
  // -> 데이터 요청, 데이터 변경,삭제
  const { rows } = await sql`SELECT * FROM Person`;
  console.log(rows);

  return (
    <div className="bg-zinc-900 min-h-screen flex items-center justify-center p-6">
      <div className="flex flex-col gap-4 w-[400px]">
        {/* Form Container */}
        <div className="w-full max-w-md bg-gray-700 rounded-xl shadow-md">
          <FormEditor />
        </div>

        {/* List Container */}
        <div className="w-full max-w-md rounded-md shadow-md flex flex-col gap-4">
          {rows &&
            rows.map((row, index) => (
              <div
                className="text-white space-y-4 p-4 bg-gray-700 flex justify-between"
                key={index}
              >
                {/* Replace with dynamic content */}
                {row.name}
                <RemoveButton name={row.name} />
              </div>
            ))}
          {/* Repeat for each person */}
        </div>
      </div>
    </div>
  );
}
