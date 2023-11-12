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
  const firstname: any = searchParams.get("firstname");
  const lastname: any = searchParams.get("lastname");
  const phoneNumber: any = searchParams.get("phoneNumber");

  const [newFirstname, setNewFirstname] = useState(firstname);
  const [newLastname, setNewLastname] = useState(lastname);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const data = {
      firstname: newFirstname,
      lastname: newLastname,
      phoneNumber: newPhoneNumber,
    };

    if (process.env.API_MAIN_URL) {
      await axios
        .patch(`${process.env.API_MAIN_URL}/teachers/${id}`, data)
        .then((res) => {
          toast.success("Mug'allim jan'alandi!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center border p-4">
        <h1>Mug'allim magliwmatlarin o'zgertiw</h1>
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
          value={newFirstname}
          onChange={setNewFirstname}
        />
        <Input
          type="text"
          placeholder="Familiyasi"
          value={newLastname}
          onChange={setNewLastname}
        />
        <Input
          type="text"
          placeholder="Telefon nomeri"
          value={newPhoneNumber}
          onChange={setNewPhoneNumber}
        />
        <Button title="O'zgertiw" />
      </form>
    </div>
  );
}
