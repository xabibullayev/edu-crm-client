"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddTeacher() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone_number, setPhone_number] = useState("");

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const data = { firstname, lastname, phone_number };

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
    setPhone_number("");
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
        <input
          value={firstname}
          type="text"
          placeholder="Ati"
          className="border rounded-md border-gray-400 p-2 mr-4 outline-none"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          value={lastname}
          type="text"
          placeholder="Familiyasi"
          className="border rounded-md border-gray-400 p-2 mr-4 outline-none"
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          value={phone_number}
          type="text"
          placeholder="Telefon nomeri"
          className="border rounded-md border-gray-400 p-2 mr-4 outline-none"
          onChange={(e) => setPhone_number(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md">
          Kiritiw
        </button>
      </form>
    </div>
  );
}
