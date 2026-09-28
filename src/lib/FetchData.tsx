import { useEffect, useState } from "react";
import { supabase } from "./superBaseClient";

type Instrument = {
  id: number;
  name: string;
};

function FetchData() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);

  useEffect(() => {
    getInstruments();
  }, []);

  async function getInstruments() {
    const { data, error } = await supabase.from("instruments").select();
    if (error) {
      console.error(error);
      return;
    }
    setInstruments(data);
  }

  return (
    <ul>
      {instruments.map((instrument) => (
        <li key={instrument.id}>{instrument.name}</li>
      ))}
    </ul>
  );
}

export default FetchData;