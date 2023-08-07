"use client"

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

import React from 'react'

export async function generateStaticParams() {
  const posts = await fetch('/api/prompt').then((res) => res.json());

  return posts.map((post) => {
    id: post.creator?._id
  })
}

const MyProfile = ({ params }) => {
  const {data: session} = useSession()
  const [posts, setPosts] = useState([])
  
  const router = useRouter();

  const { id } = params

  useEffect(() => {
  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${id}/posts`);
    const data = await response.json();
    console.log(data)
    setPosts(data)
  }

  if(session?.user.id) {
    fetchPosts().finally(() => console.log("Fetched"))
  }
  }, [])
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure want to delete this prompt?");

    if(hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE"
        })

        const filteredPosts = posts.filter((p) => p._id !== post._id)

        setPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
  <Profile
    name={`${session?.user ? "My" : ""}`}
    desc="Welcome to My Profile"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
  />
  )
}

export default MyProfile