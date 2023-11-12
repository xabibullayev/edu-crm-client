"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddAuditory() {
  const [title, setTitle] = useState("");

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const data = { title };

    if (process.env.API_MAIN_URL) {
      await axios
        .post(`${process.env.API_MAIN_URL}/auditories`, data)
        .then((res) => {
          toast.success("Auditoriya kiritildi!");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setTitle("");
  };

  return (
    <div>
      <div className="flex justify-between items-center border p-4">
        <h1>Taza auditoriya kiritiw</h1>
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
          value={title}
          onChange={setTitle}
        />
        <Button title="Kiritiw" />
      </form>
    </div>
  );
}
