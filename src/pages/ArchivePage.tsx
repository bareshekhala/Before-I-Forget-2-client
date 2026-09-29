//with tabs-> all/books/movies/songs/dreams/thoughts/memories
//mood filtering
//search
import FavBooks from "@/components/book/FavBooks";
import { Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs"


function ArchivePage() {
  return (

    <Tabs defaultValue="All">
      <TabsList>
        <TabsTrigger value="All">All</TabsTrigger>
        <TabsTrigger value="Books">Books</TabsTrigger>
        <TabsTrigger value="Movies">Movies</TabsTrigger>
        <TabsTrigger value="Songs">Songs</TabsTrigger>
        <TabsTrigger value="Websites">Websites</TabsTrigger>
        <TabsTrigger value="Memories">Memories</TabsTrigger>
        <TabsTrigger value="Dreams">Dreams</TabsTrigger>
        <TabsTrigger value="Thoughts">Thoughts</TabsTrigger>
      </TabsList>
      <TabsContent value="All">
        <FavBooks/>
      </TabsContent>
      <TabsContent value="Books">
        <FavBooks/>
      </TabsContent>
      <TabsContent value="Movies">
        {/* <FavMovies/> */}
      </TabsContent>
      <TabsContent value="Songs">
        {/* <FavSongs/> */}
      </TabsContent>
      {/* <TabsContent value="Websites">
        <FavBooks/>
      </TabsContent> */}

    </Tabs>
  )
}

export default ArchivePage
