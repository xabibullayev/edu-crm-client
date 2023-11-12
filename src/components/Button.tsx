import React from "react";

type Props = {
  title: string;
};

export default function Button({ title }: Props) {
  return (
    <button className="bg-blue-600 text-white px-6 py-2 rounded-md">
      {title}
    </button>
  );
}
