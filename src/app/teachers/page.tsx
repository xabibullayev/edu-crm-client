"use client";
import DataTable from "@/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { Edit, Delete, ArrowRightAlt } from "@mui/icons-material";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";

const columns: GridColDef[] = [
  { field: "firstname", headerName: "Ati", width: 150 },
  { field: "lastname", headerName: "Familiyasi", width: 150 },
  { field: "phoneNumber", headerName: "Telefon nomeri", width: 150 },
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
              pathname: "/teachers/edit-teacher",
              query: {
                id: params.row._id,
                firstname: params.row.firstname,
                lastname: params.row.lastname,
                phoneNumber: params.row.phoneNumber,
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

export default function Teachers() {
  const keys = ["firstname", "lastname", "phoneNumber"];

  const { data } = useFetch(`${process.env.API_MAIN_URL}/teachers`);

  return (
    <div className="">
      <h1 className="mb-3">Mug'allimler</h1>

      <div>
        <DataTable
          columns={columns}
          rows={data}
          keys={keys}
          url="/teachers/add-teacher"
        />
      </div>
    </div>
  );
}
