"use client";
import DataTable from "@/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { Edit, Delete, ArrowRightAlt } from "@mui/icons-material";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";

const columns: GridColDef[] = [
  { field: "amount", headerName: "To'lem mug'dari", width: 150 },
  { field: "paymentDate", headerName: "To'lem sa'nesi", width: 150 },
  { field: "paymentType", headerName: "To'lem tu'ri", width: 100 },
  { field: "student", headerName: "Student", width: 200 },
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
              pathname: "/payments/edit-payment",
              query: {
                id: params.row._id,
                amount: params.row.amount,
                paymentDate: params.row.paymentDate,
                paymentType: params.row.paymentType,
                student: params.row.student,
                studentId: params.row.studentId,
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

export default function Payments() {
  const keys = ["amount", "paymentDate", "paymentType", "student"];

  // urls for useFetch hook
  const urls = ["payments", "students"];

  // fetch all needed data
  const result = urls.map((url) => {
    return useFetch(`${process.env.API_MAIN_URL}/${url}`);
  });

  // build rows for datatable with all fetching data
  const rows = result[0].data.map((payment: any) => {
    const student: any = result[1].data.find(
      (student: any) => student._id === payment.studentId
    );

    return {
      _id: payment._id,
      amount: payment.amount,
      paymentDate: new Date(payment.paymentDate).toLocaleDateString(),
      paymentType: payment.paymentType,
      student: student?.firstname + " " + student?.lastname,
      studentId: student?._id,
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
          url="/payments/add-payment"
        />
      </div>
    </div>
  );
}
