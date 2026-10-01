import { useEffect, useState } from "react";
import service from "@/services/service.index";
import Loader from "../Loader";
import MyMindEdit from "./MyMindEdit";
import MyMindCreate from "./MyMindCreate";
import DeleteAlart from "../forAll/DeleteAlart";
import MyMindCard from "./MyMindCard";

export type MyMind = {
  id: string;
  title: string;
  image: string | null;
  description: string | null;
  url: string | null;
  date: string | null;
  category: string;
  moods: { id: string; name: string }[];
};

type MyMindsProps = {
  category: string;
  name: string;
  path: string;
};

function MyMinds({ category, name, path }: MyMindsProps) {
  const [myMinds, setMyMinds] = useState<MyMind[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/mymind/${path}`);
      setMyMinds(response.data);

      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (mymindId: string) => {
    await service.delete(`/mymind/${mymindId}`);
    getData();
  };

  if (isLoading) {
    return (
      <div className="grid place-items-center py-24">
        <Loader />
      </div>
    );
  }
  if (myMinds.length === 0) {
    return (
      <div className="empty-box">
        <p>No {path} in your archive yet.</p>
        <MyMindCreate category={category} name={name} onCreated={getData} />
      </div>
    );
  }
  return (
    <>
      <div className="mt-3 flex justify-end xl:absolute xl:top-0.5 xl:right-0 xl:mt-0">
        <MyMindCreate category={category} name={name} onCreated={getData} />
      </div>

      <div className="card-grid">
        {myMinds.map((myMind) => (
          <div key={myMind.id} className="grid w-full max-w-56 content-start gap-2">
            <MyMindCard myMind={myMind} />

            <div className="flex gap-2">
              <MyMindEdit
                mymindId={myMind.id}
                name={name}
                onUpdated={getData}
              />

              <DeleteAlart onDelete={() => handleDelete(myMind.id)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyMinds;
