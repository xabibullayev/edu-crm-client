"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EditAuditory() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const title: any = searchParams.get("title");

  const [newTitle, setNewTitle] = useState(title);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const data = { title: newTitle };

    if (process.env.API_MAIN_URL) {
      await axios
        .patch(`${process.env.API_MAIN_URL}/auditories/${id}`, data)
        .then((res) => {
          toast.success("Auditoriya jan'alandi!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center border p-4">
        <h1>Auditoriya mag'liwmatlarin o'zgertiw</h1>
        <Link
          href="/auditories"
          className="bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          Dizimge qaytiw
        </Link>
      </div>

      <form onSubmit={submitHandler} className="border p-4 min-h-[70vh]">
        <Input
          type="text"
          placeholder="Ati"
          value={newTitle}
          onChange={setNewTitle}
        />
        <Button title="O'zgertiw" />
      </form>
    </div>
  );
}
