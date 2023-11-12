"use client";
import DataTable from "@/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { Edit, Delete, ArrowRightAlt } from "@mui/icons-material";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";

const columns: GridColDef[] = [
  { field: "title", headerName: "Kurs atamalari", width: 200 },
  { field: "price", headerName: "Bahasi", width: 150 },
  { field: "duration", headerName: "Dawamlilig'i", width: 150 },
  {
    field: "edit",
    headerName: "",
    sortable: false,
    disableColumnMenu: true,
    width: 150,
    renderCell: (params: any) => {
      return (
        <div className="flex gap-4">
          <Link
            href={{
              pathname: "/courses/edit-course",
              query: {
                id: params.row._id,
                title: params.row.title,
                price: params.row.price,
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

export default function Courses() {
  const keys = ["title", "price", "duration"];

  const { data } = useFetch(`${process.env.API_MAIN_URL}/courses`);

  return (
    <div className="">
      <h1 className="mb-3">Kurslar</h1>

      <div>
        <DataTable
          columns={columns}
          rows={data}
          keys={keys}
          url="/courses/add-course"
        />
      </div>
    </div>
  );
}
