"use client";
import DataTable from "@/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { Edit, Delete, ArrowRightAlt } from "@mui/icons-material";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";

const columns: GridColDef[] = [
  { field: "title", headerName: "Gruppa atamasi", width: 200 },
  { field: "course", headerName: "Kurs atamasi", width: 150 },
  { field: "teacher", headerName: "Mugallim", width: 150 },
  { field: "auditory", headerName: "Auditoriya", width: 200 },
  {
    field: "edit",
    headerName: "",
    sortable: false,
    disableColumnMenu: true,
    width: 150,
    renderCell: (params: any) => {
      return (
        <div className="flex gap-3">
          <Link
            href={{
              pathname: "/groups/edit-group",
              query: {
                id: params.row._id,
                title: params.row.title,
                course: params.row.course,
                courseId: params.row.courseId,
                teacher: params.row.teacher,
                teacherId: params.row.teacherId,
                auditory: params.row.auditory,
                auditoryId: params.row.auditoryId,
                startDate: params.row.startDate,
                duration: params.row.duration,
              },
            }}
          >
            <Edit />
          </Link>
          <Link href="/" className="block">
            <Delete />
          </Link>
          <Link href="/">
            <ArrowRightAlt />
          </Link>
        </div>
      );
    },
  },
];

export default function Groups() {
  const keys = ["title"];

  // urls for useFetch hook
  const urls = ["groups", "courses", "teachers", "auditories"];

  // fetch all needed data
  const result = urls.map((url) => {
    return useFetch(`${process.env.API_MAIN_URL}/${url}`);
  });

  // build rows for datatable with all fetching data
  const rows: any = result[0].data.map((group: any) => {
    const course: any = result[1].data.find(
      (course: any) => course._id === group.courseId
    );

    const teacher: any = result[2].data.find(
      (teacher: any) => teacher._id === group.teacherId
    );

    const auditory: any = result[3].data.find(
      (auditory: any) => auditory._id === group.auditoryId
    );

    return {
      _id: group._id,
      title: group?.title,
      course: course?.title,
      courseId: course?._id,
      teacher: teacher?.firstname + " " + teacher?.lastname,
      teacherId: teacher?._id,
      auditory: auditory?.title,
      auditoryId: auditory?._id,
      startDate: group?.startDate,
      endDate: group?.endDate,
      duration: course?.duration,
    };
  });

  return (
    <div className="">
      <h1 className="mb-3">Gruppalar</h1>

      <div>
        <DataTable
          columns={columns}
          rows={rows}
          keys={keys}
          url="/groups/add-group"
        />
      </div>
    </div>
  );
}
