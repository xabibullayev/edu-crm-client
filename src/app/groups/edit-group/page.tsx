"use client";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "@/components/Input";
import Select from "@/components/Select";
import useFetch from "@/hooks/useFetch";
import Button from "@/components/Button";

export default function EditAuditory() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const title: any = searchParams.get("title");
  const course: any = searchParams.get("course");
  const courseId: any = searchParams.get("courseId");
  const teacher: any = searchParams.get("teacher");
  const teacherId: any = searchParams.get("teacherId");
  const auditory: any = searchParams.get("auditory");
  const auditoryId: any = searchParams.get("auditoryId");
  const startDate: any = searchParams.get("startDate");
  const duration: any = searchParams.get("duration");

  const [newTitle, setNewTitle] = useState(title);
  const [newCourse, setNewCourse] = useState(courseId);
  const [newTeacher, setNewTeacher] = useState(teacherId);
  const [newAuditory, setNewAuditory] = useState(auditoryId);
  const [newStartDate, setNewStartDate] = useState(new Date(startDate));
  const [newDuration, setNewDuration] = useState(duration);

  const urls = ["courses", "teachers", "auditories"];

  const [courses, teachers, auditories] = urls.map((url: string) => {
    return useFetch(`${process.env.API_MAIN_URL}/${url}`);
  });

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const data = {
      title: newTitle,
      courseId: newCourse,
      teacherId: newTeacher,
      auditoryId: newAuditory,
      startDate: newStartDate,
      duration: newDuration,
    };

    if (process.env.API_MAIN_URL) {
      await axios
        .patch(`${process.env.API_MAIN_URL}/groups/${id}`, data)
        .then((res) => {
          toast.success("Gruppa jan'alandi!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCourse = (id: any) => {
    setNewCourse(id);

    const dur: any = courses.data.find((course: any) => course._id === id);

    setNewDuration(dur.duration);
  };

  const courseOptions = courses.data.map((course: any) => {
    return { id: course._id, title: course.title };
  });

  const teacherOptions = teachers.data.map((teacher: any) => {
    return {
      id: teacher._id,
      title: teacher.firstname + " " + teacher.lastname,
    };
  });

  const auditoryOptions = auditories.data.map((auditory: any) => {
    return { id: auditory._id, title: auditory.title };
  });

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
          <Input
            type="text"
            placeholder="Gruppa atamasi"
            value={newTitle}
            onChange={setNewTitle}
          />

          <Select
            defaultOption={{ value: courseId, title: course }}
            onChange={handleCourse}
            options={courseOptions}
          />

          <Select
            defaultOption={{ value: teacherId, title: teacher }}
            onChange={setNewTeacher}
            options={teacherOptions}
          />

          <Select
            defaultOption={{ value: auditoryId, title: auditory }}
            onChange={setNewAuditory}
            options={auditoryOptions}
          />
        </div>
        <div className="flex gap-4 mb-3">
          <div className="w-[24%]">
            <label className="mb-1 block">Baslaniw sanesi:</label>
            <div className="border rounded-md border-gray-400 p-1">
              <DatePicker
                className="w-[100%] border-none outline-none"
                showIcon
                selected={newStartDate}
                onChange={(date: any) => setNewStartDate(date)}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          <div className="w-[24%]">
            <label className="mb-1 block">Kurs dawamlilig'i</label>
            <h1>{newDuration}</h1>
          </div>
        </div>
        <Button title="O'zgertiw" />
      </form>
    </div>
  );
}
