import { useState, useEffect } from "react";
import getPosts from "../../utils/getPosts";

function AddPost() {
  function postAddHandle(event) {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const body = event.target.elements.body.value;
    const post = {
      title: title,
      body: body,
      id: length + 1,
    };
    setData((prevstate) => [...prevstate, post]);
  }

  return (
    <form onSubmit={postAddHandle} className="w-2/5">
      <input
        className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
        name="title"
        placeholder="Title"
      />
      <input
        className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
        name="body"
        placeholder="Body"
      />
      <button
        className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Add post
      </button>
    </form>
  );
}

function DisplayPost({ title, body, id }) {
  return (
    <div className="m-2 rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base"> {body} </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">
          #{id}
        </span>
      </div>
    </div>
  );
}

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

  if (!data) return <p>No POSTS fetched</p>;
  return (
    <div>
      <h1 className="font-bold text-2xl m-2">ADD POSTS</h1>
      <AddPost length={data.length} setData={setData} />
      <h1 className="font-bold text-2xl m-2">POSTS</h1>;
      {data
        .slice(0)
        .reverse()
        .map(({ title, body, id }) => (
          <DisplayPost key={id} title={title} body={body} id={id} />
        ))}
    </div>
  );
}
