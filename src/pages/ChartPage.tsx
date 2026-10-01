import { useContext, useEffect, useState } from "react";
import service from "@/services/service.index";
import Loader from "@/components/Loader";
import { ThemeContext } from "@/context/theme.context";
import {
  BarChart,
  Bar,
  CartesianGrid,
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

type MyMind = {
  id: string;
  title: string;
  image: string | null;
  description: string | null;
  url: string | null;
  date: string | null;
  category: string;
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
  const [myMinds, setMyMinds] = useState<MyMind[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useContext(ThemeContext);
  const colors = theme?.isDark
    ? { bar: "#4f7bea", text: "#bcc7e6", line: "#22306a", box: "#15214d", ink: "#eef2fc" }
    : { bar: "#1d4fd7", text: "#3e4f78", line: "#d0dbf2", box: "#ffffff", ink: "#0d1b3e" };

  useEffect(() => {
    const getData = async () => {
      try {
        let response1 = await service.get("books/favbooks");
        let response2 = await service.get("movies/favmovies");
        let response3 = await service.get("songs/favsongs");
        let response4 = await service.get("/moods");
        let response5 = await service.get("/mymind");
    

        setBooks(response1.data);
        setMovies(response2.data);
        setSongs(response3.data);
        setMoods(response4.data);
        setMyMinds(response5.data);

        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    };
    getData();
  }, []);

  //find the objects with a specific moodId to get the sum of them for X-axis

  let allData = [...books, ...movies, ...songs, ...myMinds];

  let data = moods.map((mood) => {
    let count = 0;

    allData.forEach((object) => {
      object.moods.some((eachMood) => eachMood.id === mood.id) && count++;
    });

    return { mood: mood.name, count };
  });



  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="app-backdrop" />
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-auto box-content max-w-295 px-4 pt-4.5 pb-6 lg:px-10 lg:pt-6.5 lg:pb-16">
      <div className="app-backdrop" />

      <h1 className="font-display text-[1.75rem] leading-none font-[740] tracking-[-0.02em] text-ink lg:text-[2.125rem] dark:text-night-ink">
        My Moods
      </h1>
      <p className="text-soft mt-1.5 text-[15px]">
        See which moods appear most in your collection
      </p>

      <div className="glass mt-6.5 h-110 p-4 sm:p-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} stroke={colors.line} />

            <XAxis
              angle={-40}
              textAnchor="end"
              height={90}
              dataKey="mood"
              tick={{ fontSize: 12, fill: colors.text }}
              interval={0}
              axisLine={{ stroke: colors.line }}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              width={32}
              tick={{ fontSize: 12, fill: colors.text }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: colors.line, opacity: 0.4 }}
              contentStyle={{ borderRadius: 12, border: "none", backgroundColor: colors.box, color: colors.ink }}
              itemStyle={{ color: colors.ink }}
            />

            <Bar dataKey="count" fill={colors.bar} radius={[4, 4, 0, 0]} maxBarSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default Chart;
