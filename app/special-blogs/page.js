import axios from "axios"
import { cookies, headers } from "next/headers"

const fetchSpecialBlogs = async () => {
  try {
    const token = cookies().get("token")
    const response = await axios.get(
      `${process.env.STRAPI_BASE_URL}/api/special-blogs`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    )

    return response.data.data
  } catch (error) {
    console.log("error", error)
    return []
  }
}

export default async function Page() {
  const blogs = await fetchSpecialBlogs()
  const headerList = headers()
  const user = JSON.parse(headerList.get("user"))

  return (
    <div className="container mx-auto">
      Home {user.email}
      <div className="grid grid-cols-4 gap-2">
        {blogs.map((blog, idx) => (
          <div key={idx} className="flex flex-col">
            <h2>ID: {blog.id}</h2>
            <div className="text-3xl">{blog.attributes.title}</div>
            <div className="text-lg">{blog.attributes.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
