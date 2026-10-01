import { useEffect, useState } from "react";
import service from "@/services/service.index";
import Loader from "@/components/Loader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
type Book = {
  id: string;
  title: string;
  author: string | null;
  description: string | null;
  image: string | null;
  category: string;
  pageCount: number | null;
  moods: { id: string; name: string }[];
};
type Movie = {
  id: string;
  title: string;
  overview: string | null;
  poster_path: string | null;
  category: string;
  moods: { id: string; name: string }[];
};

type Song = {
  id: string;
  title: string;
  singerOrComposer: string | null;
  image: string | null;
  url: string | null;
  moods: { id: string; name: string }[];
};

type Mood = {
  id: string;
  name: string;
};

function Chart() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [moods, setMoods] = useState<Mood[]>([]);
  //   const [thoughts, setThoughts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        let response1 = await service.get("books/favbooks");
        let response2 = await service.get("movies/favmovies");
        let response3 = await service.get("songs/favsongs");
        let response4 = await service.get("/moods");
    

        setBooks(response1.data);
        setMovies(response2.data);
        setSongs(response3.data);
        setMoods(response4.data);
        // setThoughts(response5.data);

        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  //find the objects with a specific moodId to get the sum of them for X-axis

  let allData = [...books, ...movies, ...songs];

  let data = moods.map((mood) => {
    let count = 0;

    allData.forEach((object) => {
      object.moods.some((eachMood) => eachMood.id === mood.id) && count++;
    });

    return { mood: mood.name, count };
  });
if (allData.length === 0) {
  return <p>You have not added anything yet.</p>;
}


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ground dark:bg-night">
        <div>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className=" text-center mx-auto mt-15">
        <h1 className="text-3xl italic font-bold ">My Moods</h1>

        <p className="text-center mt-2 italic text-lg">
          See which moods appear most in your collection
        </p>
      </div>

      <div className="w-full max-w-4xl  h-100 mt-25 flex pr-6 mx-auto ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              angle={-90}
              textAnchor="end"
              height={105}
              dataKey="mood"
              tick={{ fontSize: 12 }}
              interval={0}
            />

            <YAxis />

            <Tooltip />

            <Bar dataKey="count" fill="#C9A66B" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
export default Chart;
