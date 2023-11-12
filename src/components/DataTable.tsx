"use client";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";

type Props = {
  columns: GridColDef[];
  rows: Array<{}>;
  keys: string[];
  url: string;
};

export default function DataTable({ columns, rows, keys, url }: Props) {
  const [query, setQuery] = useState("");

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer className="flex justify-end">
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  const search = (data: any) => {
    return data.filter((item: any) =>
      keys?.some((key) => {
        if (item[key] !== null) {
          return item[key].toString().toLowerCase().includes(query);
        }
      })
    );
  };

  return (
    <div className={`${rows.length <= 0 && "h-[200px]"}  w-full bg-white`}>
      <div className="flex justify-between items-center p-4 border">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
          className="border-2 rounded-md outline-none p-2"
        />

        <Link
          href={url}
          className="border bg-blue-500 text-white py-2 px-6 rounded-md"
        >
          Add new
        </Link>
      </div>

      <DataGrid
        // checkboxSelection
        disableRowSelectionOnClick
        rows={search(rows)}
        columns={columns}
        getRowId={(row: any) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        localeText={{
          noRowsLabel: "Magliwmat bazasi bos",
          toolbarExportCSV: "CSV faylga juklep aliw",
        }}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
