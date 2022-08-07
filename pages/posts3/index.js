import { useState, useEffect } from "react";
import AddPost from "../../components/AddPost";
import DisplayPost from "../../components/DisplayPost";
import getPosts from "../../utils/getPosts";

export default function POSTS() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPosts()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  return !data ? (
    <p>No POSTS Fetched</p>
  ) : (
    <div>
      <h1 className="font-bold text-2xl m-2">ADD POSTS</h1>
      <AddPost length={data.length} setData={setData} />
      <h1 className="font-bold text-2xl m-2">POSTS</h1>;
      {data.slice(0).reverse().map(({ title, body, id }) => (
        <DisplayPost key={id} title={title} body={body} id={id} />
      ))}
    </div>
  );
}
