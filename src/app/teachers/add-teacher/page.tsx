"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddTeacher() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const data = { firstname, lastname, phoneNumber };

    if (process.env.API_MAIN_URL) {
      await axios
        .post(`${process.env.API_MAIN_URL}/teachers`, data)
        .then((res) => {
          console.log(res.data);
          toast.success("Mug'allim kiritildi!");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setFirstname("");
    setLastname("");
    setPhoneNumber("");
  };

  return (
    <div>
      <div className="flex justify-between items-center border p-4">
        <h1>Add New Teacher</h1>
        <Link
          href="/teachers"
          className="bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          Dizimge qaytiw
        </Link>
      </div>

      <form onSubmit={submitHandler} className="border p-4 min-h-[70vh]">
        <Input
          type="text"
          placeholder="Ati"
          value={firstname}
          onChange={setFirstname}
        />
        <Input
          type="text"
          placeholder="Familiyasi"
          value={lastname}
          onChange={setLastname}
        />
        <Input
          type="text"
          placeholder="Telefon nomeri"
          value={phoneNumber}
          onChange={setPhoneNumber}
        />
        <Button title="Kiritiw" />
      </form>
    </div>
  );
}
