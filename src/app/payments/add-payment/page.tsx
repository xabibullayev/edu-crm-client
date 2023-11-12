"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";

export default function AddPayment() {
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date(Date.now()));
  const [paymentType, setPaymentType] = useState("");
  const [studentId, setStudentId] = useState("");

  const { data } = useFetch(`${process.env.API_MAIN_URL}/students`);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const data = {
      amount,
      paymentDate,
      paymentType,
      studentId,
    };

    if (process.env.API_MAIN_URL) {
      await axios
        .post(`${process.env.API_MAIN_URL}/payments`, data)
        .then((res) => {
          toast.success("To'lem kiritildi!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const studentOptions = data.map((student: any) => {
    return {
      id: student._id,
      title: student.firstname + " " + student.lastname,
    };
  });

  return (
    <div>
      <div className="flex justify-between items-center border p-4">
        <h1>To'lem kiritiw</h1>
        <Link
          href="/payments"
          className="bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          Dizimge qaytiw
        </Link>
      </div>

      <form onSubmit={submitHandler} className="border p-4 min-h-[70vh]">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex flex-col w-[25%]">
            <label className="mb-1">To'lem mug'dari</label>
            <Input
              type="number"
              placeholder="To'lem mug'dari"
              value={amount}
              onChange={setAmount}
            />
          </div>
          <div className="flex flex-col w-[25%]">
            <label className="mb-1">Student</label>
            <Select
              defaultOption={{ value: null, title: "Student" }}
              options={studentOptions}
              onChange={setStudentId}
            />
          </div>

          <div>
            <label className="mb-1">To'lem tu'ri</label>
            <Select
              defaultOption={{ value: null, title: "To'lem tu'ri" }}
              onChange={setPaymentType}
              options={[
                { id: "Naq", title: "Naq" },
                { id: "Plastik karta", title: "Plastik karta" },
              ]}
            />
          </div>

          <div className="w-[20%]">
            <label className="mb-1 block">To'lem sa'nesi</label>
            <div className="border rounded-md border-gray-400 p-1">
              <DatePicker
                className="h-full border-red-500 outline-none"
                selected={paymentDate}
                onChange={(date: any) => setPaymentDate(date)}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
        </div>
        <Button title="Kiritiw" />
      </form>
    </div>
  );
}
