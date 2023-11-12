"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const data = { title, price, duration };

    if (process.env.API_MAIN_URL) {
      await axios
        .post(`${process.env.API_MAIN_URL}/course`, data)
        .then((res) => {
          toast.success("Kurs kiritildi!");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setTitle("");
    setPrice("");
    setDuration("");
  };

  return (
    <div>
      <div className="flex justify-between items-center border p-4">
        <h1>Add New Teacher</h1>
        <Link
          href="/courses"
          className="bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          Dizimge qaytiw
        </Link>
      </div>

      <form onSubmit={submitHandler} className="border p-4 min-h-[70vh]">
        <Input
          type="text"
          placeholder="Kurs atamasi"
          value={title}
          onChange={setTitle}
        />
        <Input
          value={price}
          type="number"
          placeholder="Bahasi"
          onChange={setPrice}
        />
        <Input
          type="number"
          placeholder="Dawamiylig'i"
          value={duration}
          onChange={setDuration}
        />
        <Button title="Kiritiw" />
      </form>
    </div>
  );
}
