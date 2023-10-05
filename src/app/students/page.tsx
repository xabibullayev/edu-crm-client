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

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (process.env.API_MAIN_URL) {
        await axios
          .get(`${process.env.API_MAIN_URL}/students`)
          .then((res) => {
            setStudents(res.data);
          })
          .catch((err) => console.log(err));
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="">
      <h1>Oqiwshilar</h1>

      <div>
        <div>
          <h1>Oqiwshilar</h1>
        </div>

        <DataTable columns={columns} rows={students} />
      </div>
    </div>
  );
}
