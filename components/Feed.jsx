"use client"

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { useTagModeStore } from "@store";

  const PromptCardList = ({ data, handleTagClick}) => {
    const [tagMode, tagValue, setTagMode] = useTagModeStore((state) => [state.tagMode, state.tagValue, state.setTagMode]);
    console.log(tagMode)
    return (
      <div className="mt-16 prompt_layout">
        {tagMode && (
          <div className="flex flex-row justify-between">
            <h1 className="font-bold">Filter by Tag <span className=" bg-primary-orange text-white p-1 rounded-lg">#{tagValue}</span> 
            </h1>
            <button className=" text-blue-950 font-bold" onClick={() => setTagMode(false)}>clear</button>
          </div>  
        )}
        {data.map((post) => (
          <PromptCard key={post._id} post={post}  handleTagClick={handleTagClick} />
        ) )}
      </div>
    )
  }

const Feed = () => {
  const [searchText, setSearchtext] = useState("")
  const [posts, setPosts] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState(false);
  const [tagMode, setTagMode, tagValue] = useTagModeStore((state) => [state.tagMode, state.setTagMode, state.tagValue]);

  const handleSearchChange = (e) => {
    let searchData = e.target.value
    setSearchtext(searchData)

    const filteredArray = posts?.filter(searchNow)

    setFilteredData(filteredArray)

    function searchNow(value, _index, _array) {
        if (value.prompt.toString().toLowerCase().includes(searchData.toLowerCase())) {
          return true;
        } else if (value.creator.username.toString().toLowerCase().includes(searchData.toLowerCase())) {
          return true;
        } else if (value.tag.toString().toLowerCase().includes(searchData.toLowerCase())) {
          return true;
        }
      return false;
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data)
    }
    fetchPosts();
  }, [])

  useEffect(() => {
    tagValue && filterTag();

    function filterTag() {
      const dataByTag = posts.filter((value, _index, _array) => {
        if (value.tag.toString().toLowerCase().includes(tagValue.toLowerCase())) {
          return true;
        }
        return false;
      });

      setFilteredData(dataByTag);
    }
  }, [tagValue])

  function handleTagClick() {
    setTagMode(true);
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or a username" value={searchText} required className="search_input peer" onChange={handleSearchChange} onInput={() => setInput(true)} />
      </form>
      <PromptCardList data={input ? filteredData : tagMode ? filteredData : posts} handleTagClick={handleTagClick} />
    </section>
  )
}

export default Feed