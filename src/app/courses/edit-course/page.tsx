"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EditCourse() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const title: any = searchParams.get("title");
  const price: any = searchParams.get("price");
  const duration: any = searchParams.get("duration");

  const [newTitle, setNewTitle] = useState(title);
  const [newPrice, setNewPrice] = useState(price);
  const [newDuration, setNewDuration] = useState(duration);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const data = { title: newTitle, price: newPrice, duration: newDuration };

    if (process.env.API_MAIN_URL) {
      await axios
        .patch(`${process.env.API_MAIN_URL}/courses/${id}`, data)
        .then((res) => {
          toast.success("Kurs jan'alandi!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center border p-4">
        <h1>Kurs mag'liwmatlarin o'zgertiw</h1>
        <Link
          href="/courses"
          className="bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          Dizimge qaytiw
        </Link>
      </div>

      <form onSubmit={submitHandler} className="border p-4 min-h-[70vh]">
        <Input
          value={newTitle}
          type="text"
          placeholder="Kurs atamasi"
          onChange={setNewTitle}
        />
        <Input
          value={newPrice}
          type="number"
          placeholder="Bahasi"
          onChange={setNewPrice}
        />
        <Input
          value={newDuration}
          type="number"
          placeholder="Dawamiylig'i"
          onChange={setNewDuration}
        />
        <Button title="O'zgertiw" />
      </form>
    </div>
  );
}
