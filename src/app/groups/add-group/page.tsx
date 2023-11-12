"use client";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Select from "@/components/Select";
import axios from "axios";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddGroup() {
  const [values, setValues] = useState({
    title: "",
    teacherId: "",
    courseId: "",
    auditoryId: "",
    days: "",
    time: new Date(),
    startDate: new Date(),
    endDate: new Date(),
  });

  // urls for useFetch hook
  const urls = ["courses", "teachers", "auditories"];

  // fetch all needed data
  const res = urls.map((url) => {
    return useFetch(`${process.env.API_MAIN_URL}/${url}`);
  });

  const courseOptions = res[0].data.map((course: any) => {
    return { id: course._id, title: course.title, value: course._id };
  });

  const teacherOptions = res[1].data.map((teacher: any) => {
    return {
      id: teacher._id,
      title: teacher.firstname + " " + teacher.lastname,
      value: teacher._id,
    };
  });

  const auditoryOptions = res[2].data.map((auditory: any) => {
    return {
      id: auditory._id,
      title: auditory.title,
      value: auditory._id,
    };
  });

  const dayOptions = [
    { id: 1, title: "Taq kunler", value: "oddDays" },
    { id: 2, title: "Jup kunler", value: "evenDays" },
    { id: 3, title: "Har kuni", value: "everyday" },
  ];

  const submitHandler = async (e: any) => {
    e.preventDefault();

    if (process.env.API_MAIN_URL) {
      await axios
        .post(`${process.env.API_MAIN_URL}/groups`, values)
        .then((res) => {
          toast.success("Gruppa kiritildi!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onChange = (e: any) => {
    setValues({ ...values, [e.target?.name]: e.target?.value });
  };

  return (
    <div>
      <div className="flex justify-between items-center border p-4">
        <h1>Add New Teacher</h1>
        <Link
          href="/groups"
          className="bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          Dizimge qaytiw
        </Link>
      </div>

      <form onSubmit={submitHandler} className="border p-4 min-h-[70vh]">
        <div className="flex gap-4 mb-3">
          <div className="flex-1">
            <Input
              name="title"
              type="text"
              placeholder="Gruppa atamasi"
              value={values.title}
              onChange={onChange}
            />
          </div>

          <div className="flex-1">
            <Select
              name="courseId"
              defaultOption={{ value: null, title: "Kurs" }}
              options={courseOptions}
              onChange={onChange}
            />
          </div>
          <div className="flex-1">
            <Select
              name="teacherId"
              defaultOption={{ value: null, title: "Mug'allim" }}
              options={teacherOptions}
              onChange={onChange}
            />
          </div>
          <div className="flex-1">
            <Select
              name="auditoryId"
              defaultOption={{ value: null, title: "Auditoriya" }}
              options={auditoryOptions}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="flex gap-4 mb-3">
          <div className="w-[24%]">
            <div className="h-full flex flex-col justify-between gap-2">
              <label className="text">Kunler</label>
              <div>
                <Select
                  name="days"
                  defaultOption={{ value: null, title: "Kunler" }}
                  options={dayOptions}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>

          <div className="w-[24%]">
            <label className="mb-1 block">Waqti</label>
            <div className="border rounded-md border-gray-400 p-1">
              <DatePicker
                name="time"
                className="w-full border-none outline-none"
                showIcon
                selected={values.time}
                onChange={(date: any) =>
                  setValues({ ...values, time: new Date(date) })
                }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="HH:mm"
              />
            </div>
          </div>

          <div className="w-[24%]">
            <label className="mb-1 block">Baslaniw sanesi:</label>
            <div className="border rounded-md border-gray-400 p-1">
              <DatePicker
                name="startDate"
                className="w-full border-none outline-none"
                showIcon
                selected={values.startDate}
                onChange={(date: any) =>
                  setValues({ ...values, startDate: new Date(date) })
                }
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>

          <div className="w-[24%]">
            <label className="mb-1 block">Tamamlaniw sanesi:</label>
            <div className="border rounded-md border-gray-400 p-1">
              <DatePicker
                name="endDate"
                className="w-full border-none outline-none"
                showIcon
                selected={values.endDate}
                onChange={(date: any) =>
                  setValues({ ...values, endDate: new Date(date) })
                }
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
