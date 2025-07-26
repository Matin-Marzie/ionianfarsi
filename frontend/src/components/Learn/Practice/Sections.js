import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.js";
import { Link } from "react-router-dom";

const Sections = () => {
  const axiosPrivate = useAxiosPrivate();

  const {
    data: sections,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/sections");
      return response.data;
    },
    keepPreviousData: true,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  if (isLoading) return <p className="w-full text-center">Loading Sections...</p>;
  if (error) return <p className="w-full text-center">{error.message || "Error loading sections."}</p>;

  return (
    <div className="flex-grow max-w-screen-md m-auto min-h-screen bg-[#F5F5F5] p-4 space-y-8">
      {sections.map((section) => (
        <Link
          key={section.id}
          to=".."
          state={{ currentSection: section.id }}
          className="block io-button max-w-[500px] m-auto"
        >
          <section className="w-full bg-bluesea rounded-[18px] p-4 space-y-3">
            <h2 className="text-center text-2xl font-semibold text-white">Section {section.id}</h2>
            <img
              className="w-11/12 h-auto m-auto object-cover rounded-lg"
              src={section.image_url}
              alt="section"
            />
            <div>
              <h4 className="text-2xl text-center text-white">{section.title}</h4>
              <h4 className="text-xl text-gray-100 mt-2">Level: {section.level}</h4>
            </div>
          </section>
        </Link>
      ))}
    </div>
  );
};

export default Sections;
