import { client } from "@sanity/lib/sanity";
import { groq } from "next-sanity";

const query = groq`*[_type == "testimonial"]`;

export default async function Testimonials() {
  interface Testimonial {
    _id: string;
    feedback: string;
    clientName: string;
  }

  const testimonials = await client.fetch<Testimonial[]>(query);
  return (
    <div className="p-4">
      {testimonials.map((t) => (
        <div key={t._id} className="mb-4 p-4 border rounded-lg">
          <p>{t.feedback}</p>
          <p>- {t.clientName}</p>
        </div>
      ))}
    </div>
  );
}
