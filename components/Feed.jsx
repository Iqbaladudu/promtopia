"use client"

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"

  const PromptCardList = ({ data, handleTagClick}) => {
    return (
      <div className="mt-16 prompt_layout">
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
  const [input, setInput] = useState(false)

  const handleSearchChange = (e) => {
    let searchData = e.target.value
    setSearchtext(searchData)

    const filteredArray = posts?.filter(searchNow)

    setFilteredData(filteredArray)

    function searchNow(value, _index, _array) {
      if (value.prompt.toString().toLowerCase().includes(searchData.toLowerCase())) {
        return true;
      } else if (value.creator.username.toString().toLowerCase().includes(searchData.toLowerCase())) {
        return true
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

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or a username" value={searchText} required className="search_input peer" onChange={handleSearchChange} onInput={() => setInput(true)} />
      </form>
      <PromptCardList data={input ? filteredData : posts} handleTagClick={() => {}} />
    </section>
  )
}

export default Feed