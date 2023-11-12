"use client";
import DataTable from "@/components/DataTable";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Edit, Delete, ArrowRightAlt } from "@mui/icons-material";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";

const columns: GridColDef[] = [
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstname || ""} ${params.row.lastname || ""}`,
  },
  { field: "phoneNumber", headerName: "Telefon nomeri", width: 150 },
  { field: "birthYear", headerName: "Tuwilgan jili", width: 100 },
  { field: "socialStatus", headerName: "Social statusi", width: 150 },
  { field: "eduStatus", headerName: "Status", width: 150 },
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
              pathname: "/students/edit-student",
              query: {
                id: params.row._id,
                firstname: params.row.firstname,
                lastname: params.row.lastname,
                phoneNumber: params.row.phoneNumber,
                socialStatus: params.row.socialStatus,
                birthYear: params.row.birthYear,
                group: params.row.group,
                groupId: params.row.groupId,
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

export default function Students() {
  const keys = [
    "firstname",
    "lastname",
    "phoneNumber",
    "birthYear",
    "socialStatus",
    "eduStatus",
  ];

  // urls for useFetch hook
  const urls = ["students", "groups"];

  // fetch all needed data
  const result = urls.map((url) => {
    return useFetch(`${process.env.API_MAIN_URL}/${url}`);
  });

  // build rows for datatable with all fetching data
  const rows = result[0].data.map((student: any) => {
    const group: any = result[1].data.find(
      (group: any) => group._id === student.groupId
    );
    return {
      _id: student._id,
      firstname: student.firstname,
      lastname: student.lastname,
      phoneNumber: student.phoneNumber,
      birthYear: new Date(student.birthYear).getFullYear(),
      socialStatus: student?.socialStatus,
      group: group?.title,
      groupId: group?._id,
      eduStatus: student.eduStatus,
    };
  });

  return (
    <div className="">
      <h1 className="mb-3">Oqiwshilar</h1>

      <div>
        <DataTable
          columns={columns}
          rows={rows}
          keys={keys}
          url="/students/add-student"
        />
      </div>
    </div>
  );
}
