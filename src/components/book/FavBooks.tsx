import { useEffect, useState } from "react";
import service from "@/services/service.index";
import Loader from "../Loader";

function FavBooks() {
const [book, setBook] = useState([])
const [isLoading, setIsLoading] = useState(true)

useEffect(()=>{
    const getData = async()=>{
try{
const response = await service.get("/books/favbooks")
setBook(response.data)


 // to show the loading page for 1.5 seconds
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
    }catch(error){
        console.log(error)
    }
}
getData()
},[])

 if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div><Loader/></div>
      </div>
    );
  }
  return (
    <div>
      
    </div>
  )
}

export default FavBooks
