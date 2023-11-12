"use client";
import DataTable from "@/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { Edit, Delete, ArrowRightAlt } from "@mui/icons-material";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";

const columns: GridColDef[] = [
  { field: "title", headerName: "Ati", width: 300 },
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
              pathname: "/auditories/edit-auditory",
              query: { id: params.row._id, title: params.row.title },
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

export default function Auditories() {
  const keys = ["title"];

  const { data, loading, error } = useFetch(
    `${process.env.API_MAIN_URL}/auditories`
  );

  return (
    <div className="">
      <h1 className="mb-3">Auditoriyalar</h1>

      <div>
        <DataTable
          columns={columns}
          rows={data}
          keys={keys}
          url="/auditories/add-auditory"
        />
      </div>
    </div>
  );
}
