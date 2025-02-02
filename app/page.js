import axios from "axios"
import Link from "next/link"

const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${process.env.STRAPI_BASE_URL}/api/blogs`)

    return response.data.data
  } catch (error) {
    console.log("error", error)
    return []
  }
}

export default async function Page() {
  const blogs = await fetchBlogs()

  return (
    <div className="container mx-auto">
      Home page
      <div className="grid grid-cols-4 gap-2">
        {blogs.map((blog, idx) => (
          <div key={idx} className="flex flex-col">
            <h2>ID: {blog.id}</h2>
            <div className="text-3xl">{blog.attributes.title}</div>
            <div className="text-lg">{blog.attributes.description}</div>
            <Link href={`blog/${blog.id}`} className="bg-blue-300 p-4">
              See more
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
