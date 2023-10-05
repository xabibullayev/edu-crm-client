"use client";
import DataTable from "@/components/DataTable";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";

const columns: GridColDef[] = [
  { field: "firstname", headerName: "Ati", width: 150 },
  { field: "lastname", headerName: "Familiyasi", width: 150 },
  { field: "phone_number", headerName: "Telefon nomeri", width: 150 },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      if (process.env.API_MAIN_URL) {
        await axios
          .get(`${process.env.API_MAIN_URL}/teachers`)
          .then((res) => {
            setTeachers(res.data);
          })
          .catch((err) => console.log(err));
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="">
      <h1>Mug'allimler</h1>

      <div>
        <div>
          <h1>Mug'allimler</h1>
        </div>

        <DataTable columns={columns} rows={teachers} />
      </div>
    </div>
  );
}
