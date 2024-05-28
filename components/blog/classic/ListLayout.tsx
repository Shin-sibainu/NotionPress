import { usePathname } from "next/navigation";
import Tag from "./Tag";
import { NotionPageData } from "@/types";
import CustomLink from "./Link";
import ClassicSidebar from "./ClassicSidebar";

interface PaginationProps {
  totalPages: number;
  currentPage: string;
}

interface ListLayoutProps {
  posts: NotionPageData[];
  title: string;
  initialDisplayPosts?: NotionPageData[];
  pagination?: PaginationProps;
  domain: string;
}

// function Pagination({ totalPages, currentPage }: PaginationProps) {
//   const pathname = usePathname();
//   const basePath = pathname.split("/")[1];
//   const prevPage = currentPage - 1 > 0;
//   const nextPage = currentPage + 1 <= totalPages;

//   return (
//     <div className="space-y-2 pb-8 pt-6 md:space-y-5">
//       <nav className="flex justify-between">
//         {!prevPage && (
//           <button
//             className="cursor-auto disabled:opacity-50"
//             disabled={!prevPage}
//           >
//             Previous
//           </button>
//         )}
//         {prevPage && (
//           <Link
//             href={
//               currentPage - 1 === 1
//                 ? `/${basePath}/`
//                 : `/${basePath}/page/${currentPage - 1}`
//             }
//             rel="prev"
//           >
//             Previous
//           </Link>
//         )}
//         <span>
//           {currentPage} of {totalPages}
//         </span>
//         {!nextPage && (
//           <button
//             className="cursor-auto disabled:opacity-50"
//             disabled={!nextPage}
//           >
//             Next
//           </button>
//         )}
//         {nextPage && (
//           <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
//             Next
//           </Link>
//         )}
//       </nav>
//     </div>
//   );
// }

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  domain,
}: ListLayoutProps) {
  return (
    <>
      <div className="md:flex gap-5">
        <div className="md:w-3/12 md:block hidden">
          <ClassicSidebar domain={domain} />
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 md:w-9/12">
          {/* <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              {title}
            </h1>
          </div>
          <ul>
            {!posts.length && "No posts found."}
            {posts.map((post) => {
              const { id, date, title, tags } = post;
              return (
                <li key={id} className="py-4">
                  <article className="space-y-2">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{date}</time>
                      </dd>
                    </dl>
                    <div className="space-y-3 xl:col-span-3">
                      <div>
                        <h3 className="text-2xl font-bold leading-8 tracking-tight">
                          <CustomLink
                            href={`/${id}`}
                            className="text-gray-900 dark:text-gray-100"
                          >
                            {title}
                          </CustomLink>
                        </h3>
                        <div className="flex flex-wrap">
                          {tags?.map((tag: string) => (
                            <Tag key={tag} tag={tag} domain={domain} />
                          ))}
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400"></div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul> */}
          <div className="px-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
            commodi! Facilis ipsa assumenda corporis qui accusantium laborum.
            Rem et inventore minima, perspiciatis similique mollitia laudantium,
            repellat fugit atque, porro nam ullam nulla a ut exercitationem
            numquam suscipit quo voluptates! Voluptates earum amet perferendis
            maxime facere, veritatis atque dolorem dolore modi odit, pariatur
            cum sit quas reiciendis, omnis magni itaque. Dolor commodi eveniet
            dolores quibusdam, labore illo tempore inventore dolore repellat et
            quis. Dolorum sequi illo eaque perspiciatis facilis harum? Corrupti
            fuga unde adipisci similique sunt commodi modi praesentium quo, vero
            laboriosam, cum sint? Laudantium explicabo eum voluptatibus sit
            pariatur rem itaque repudiandae nemo dolor tempore maxime natus iste
            animi, perspiciatis officiis quisquam dignissimos fuga dolorum eos
            porro! Aliquid quasi natus autem veniam reprehenderit dolorem.
            Inventore cupiditate labore quis eveniet minima. Pariatur laborum
            molestias ex commodi accusamus deserunt incidunt vero delectus
            dolore sed? Cumque, quod voluptatibus maxime ipsum dicta facilis
            deleniti magnam! Magnam praesentium saepe maiores aliquid iste. Fuga
            ullam nobis, rem vel et aperiam eaque aspernatur repudiandae
            deserunt accusamus distinctio esse non molestias sapiente ratione
            cumque, omnis recusandae obcaecati architecto est aliquam.
            Blanditiis deserunt minus ducimus distinctio non temporibus enim
            explicabo? Officiis debitis ea aliquid sed, quo qui? Molestias
            maiores molestiae quibusdam nostrum ipsam a, cupiditate deleniti
            quos necessitatibus rem ab et, harum impedit, illo eveniet veritatis
            nam dolor aut sit corporis quaerat? Quo totam enim corporis illo
            eos, reiciendis, odio facere amet repudiandae reprehenderit
            distinctio sint unde iste saepe corrupti error voluptatum. Odio
            ipsum a, quam accusantium harum atque impedit inventore quasi
            repellat eos eaque laborum soluta ipsa ducimus minus dignissimos
            totam minima doloremque accusamus quibusdam ut blanditiis tempora
            ab. Mollitia reprehenderit consequuntur, inventore sint veritatis a
            maxime asperiores odit hic? Nemo repudiandae exercitationem fuga
            sint totam impedit, adipisci numquam ut molestias eveniet a,
            voluptatem, necessitatibus illo possimus officiis.
          </div>
        </div>
        {/* {pagination && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        )} */}
      </div>
    </>
  );
}
