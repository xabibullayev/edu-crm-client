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
  const amount: any = searchParams.get("amount");
  const paymentDate: any = searchParams.get("paymentDate");
  const paymentType: any = searchParams.get("paymentType");
  const student: any = searchParams.get("student");
  const studentId: any = searchParams.get("studentId");

  const [newAmount, setNewAmount] = useState(amount);
  const [newPaymentDate, setNewPaymentDate] = useState(new Date(paymentDate));
  const [newPaymentType, setNewPaymentType] = useState(paymentType);
  const [newStudent, setNewStudent] = useState(studentId);

  const { data, loading, error } = useFetch(
    `${process.env.API_MAIN_URL}/students`
  );

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const data = {
      amount: newAmount,
      paymentDate: newPaymentDate,
      paymentType: newPaymentType,
      studentId: newStudent,
    };

    if (process.env.API_MAIN_URL) {
      await axios
        .patch(`${process.env.API_MAIN_URL}/payments/${id}`, data)
        .then((res) => {
          toast.success("Oqiwshi jan'alandi!");
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
        <h1>To'lem mag'liwmatlarin o'zgertiw</h1>
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
              value={newAmount}
              onChange={setNewAmount}
            />
          </div>
          <div className="flex flex-col w-[25%]">
            <label className="mb-1">Student</label>
            <Select
              defaultOption={{ value: newStudent, title: student }}
              options={studentOptions}
              onChange={setNewStudent}
            />
          </div>

          <div>
            <label className="mb-1">To'lem tu'ri</label>
            <Select
              defaultOption={{ value: newPaymentDate, title: paymentType }}
              onChange={setNewPaymentType}
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
                selected={newPaymentDate}
                onChange={(date: any) => setNewPaymentDate(date)}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
        </div>
        <Button title="O'zgertiw" />
      </form>
    </div>
  );
}
