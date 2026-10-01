//with tabs-> all/books/movies/songs/dreams/thoughts/memories
//mood filtering
//search
import FavBooks from "@/components/book/FavBooks";
import FavMovies from "@/components/movie/FavMovies";
import FavSongs from "@/components/song/FavSongs";
import { Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs"


function ArchivePage() {
  return (
<div className="mx-auto box-content max-w-295 px-4 pt-4.5 pb-6 lg:px-10 lg:pt-6.5 lg:pb-16">
  
    <div className="app-backdrop"  />

    <h1 className="mb-6 font-display text-[1.75rem] leading-none font-[740] tracking-[-0.02em] text-ink lg:text-[2.125rem] dark:text-night-ink">
      Archive
    </h1>
    <Tabs className="relative" defaultValue="All">
      <TabsList className="seg">
        <TabsTrigger className="seg-item" value="All">All</TabsTrigger>
        <TabsTrigger className="seg-item" value="Books">Books</TabsTrigger>
        <TabsTrigger className="seg-item" value="Movies">Movies</TabsTrigger>
        <TabsTrigger className="seg-item" value="Songs">Songs</TabsTrigger>
        <TabsTrigger className="seg-item" value="Websites">Websites</TabsTrigger>
        <TabsTrigger className="seg-item" value="Memories">Memories</TabsTrigger>
        <TabsTrigger className="seg-item" value="Dreams">Dreams</TabsTrigger>
        <TabsTrigger className="seg-item" value="Thoughts">Thoughts</TabsTrigger>
      </TabsList>
      <div>
      <TabsContent value="All">
        <FavBooks/>
      </TabsContent>
      <TabsContent value="Books">
        <FavBooks/>
      </TabsContent>
      <TabsContent value="Movies">
        <FavMovies/>
      </TabsContent>
      <TabsContent value="Songs">
        <FavSongs/>
      </TabsContent>
      {/* <TabsContent value="Websites">
        <FavBooks/>
      </TabsContent> */}
</div>
    </Tabs>
    </div>
  )
}

export default ArchivePage
