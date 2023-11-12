"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import useFetch from "@/hooks/useFetch";
import "react-datepicker/dist/react-datepicker.css";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";

export default function AddStudent() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthYear, setBirthYear] = useState(new Date());
  const [socialStatus, setSocialStatus] = useState("");
  const [groupId, setGroupId] = useState("");

  const { data } = useFetch(`${process.env.API_MAIN_URL}/groups`);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const data = {
      firstname,
      lastname,
      phoneNumber,
      birthYear,
      socialStatus,
      groupId,
    };

    if (process.env.API_MAIN_URL) {
      await axios
        .post(`${process.env.API_MAIN_URL}/students`, data)
        .then((res) => {
          toast.success("Student kiritildi!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const socialStatusOptions = [
    { id: "Mektep oqiwshisi", title: "Mektep oqiwshisi" },
    { id: "Kolledj/Licey", title: "Kolledj/Licey" },
    { id: "Student", title: "Student" },
    { id: "Jumisqa jaylasqan", title: "Jumisqa jaylasqan" },
    { id: "Jumissiz", title: "Jumissiz" },
  ];

  const groupOptions = data.map((group: any) => {
    return { id: group?._id, title: group?.title };
  });

  return (
    <div>
      <div className="flex justify-between items-center border p-4">
        <h1>Oqiwshi kiritiw</h1>
        <Link
          href="/students"
          className="bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          Dizimge qaytiw
        </Link>
      </div>

      <form onSubmit={submitHandler} className="border p-4 min-h-[70vh]">
        <div className="flex gap-3 mb-3">
          <Input
            type="text"
            placeholder="Ati"
            value={firstname}
            onChange={setFirstname}
          />
          <Input
            value={lastname}
            type="text"
            placeholder="Familiyasi"
            onChange={setLastname}
          />
          <Input
            value={phoneNumber}
            type="text"
            placeholder="Telefon nomeri"
            onChange={setPhoneNumber}
          />
          <Select
            key={"1"}
            defaultOption={{ value: null, title: "Social statusi" }}
            onChange={setSocialStatus}
            options={socialStatusOptions}
          />
        </div>

        <div className="flex items-end gap-3 mb-3">
          <div className="w-[10%]">
            <label className="mb-1 block">Tuwilgan jili:</label>
            <div className="border rounded-md border-gray-400 p-1">
              <DatePicker
                className="w-[100%] border-none outline-none"
                showIcon
                selected={birthYear}
                onChange={(date: any) => setBirthYear(date)}
                showYearPicker
                dateFormat="yyyy"
              />
            </div>
          </div>

          <Select
            defaultOption={{ value: null, title: "Gruppa" }}
            onChange={setGroupId}
            options={groupOptions}
          />
        </div>
        <Button title="Kiritiw" />
      </form>
    </div>
  );
}
