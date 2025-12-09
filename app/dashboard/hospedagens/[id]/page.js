"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import HospedagemForm from "../create";

export default function EditHospedagemPage() {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/hospedagens/${id}`);
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, [id]);

  if (!data) return <p>Carregando...</p>;

  return <HospedagemForm existingData={data} />;
}
