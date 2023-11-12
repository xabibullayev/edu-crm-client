"use client";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";
import "react-datepicker/dist/react-datepicker.css";

export default function EditStudent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const firstname: any = searchParams.get("firstname");
  const lastname: any = searchParams.get("lastname");
  const phoneNumber: any = searchParams.get("phoneNumber");
  const socialStatus: any = searchParams.get("socialStatus");
  const birthYear: any = searchParams.get("birthYear");
  const group: any = searchParams.get("group");
  const groupId: any = searchParams.get("groupId");

  const [newFirstname, setNewFirstname] = useState(firstname);
  const [newLastname, setNewLastname] = useState(lastname);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
  const [newSocialStatus, setNewSocialStatus] = useState(socialStatus);
  const [newGroup, setNewGroup] = useState(groupId);
  const [newBirthYear, setNewBirthYear] = useState(
    new Date(new Date().setFullYear(birthYear))
  );

  const { data } = useFetch(`${process.env.API_MAIN_URL}/groups`);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const data = {
      firstname: newFirstname,
      lastname: newLastname,
      birthYear: newBirthYear,
      phoneNumber: newPhoneNumber,
      socialStatus: newSocialStatus,
      groupId: newGroup,
    };

    if (process.env.API_MAIN_URL) {
      await axios
        .patch(`${process.env.API_MAIN_URL}/students/${id}`, data)
        .then((res) => {
          console.log(res.data);
          toast.success("Oqiwshi jan'alandi!");
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
        <h1>Oqiwshi mag'liwmatlarin jan'alaw</h1>
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
          <Select
            defaultOption={{ value: newSocialStatus, title: socialStatus }}
            onChange={setNewSocialStatus}
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
                selected={newBirthYear}
                onChange={(date: any) => setNewBirthYear(date)}
                showYearPicker
                dateFormat="yyyy"
              />
            </div>
          </div>

          <Select
            defaultOption={{ value: newGroup, title: group }}
            onChange={setNewGroup}
            options={groupOptions}
          />
        </div>
        <Button title="O'zgertiw" />
      </form>
    </div>
  );
}
