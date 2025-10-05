import React from 'react'
import { Blog } from '@/types/blogs';

interface BlogBlocksProps {
  blogBlocks: Blog;
}

export const BlogBlocks: React.FC<BlogBlocksProps> = ({blogBlocks}) => {
  return (
    <article className="prose prose-lg max-w-none flex flex-col gap-10 prose-headings:font-bold prose-headings:text-3xl prose-p:text-gray-700 dark:prose-invert">
      {blogBlocks.blocks.map((block, index) => {
        switch (block.type) {
          // 🟢 Heading
          case "heading":
            return (
              <h2
                key={index}
                className="text-2xl font-extrabold text-[#389958]"
              >
                {block.content}
              </h2>
            );

          // 🟢 Paragraph
          case "paragraph":
            return (
              <p
                key={index}
                className="text-lg leading-relaxed text-gray-800 dark:text-gray-300"
              >
                {block.content}
              </p>
            );

          // 🟢 Image
          case "image":
            return (
              <div key={index} className="overflow-hidden ">
                <img
                  src={block.content.src}
                  alt={block.content.alt}
                  className="w-full max-w-3xl"
                />
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 p-2">
                  {block.content.alt}
                </p>
              </div>
            );

          // 🟢 Table
          case "table":
            return (
              <div key={index} className="overflow-x-auto ">
                <table className="w-full text-right">
                  <thead className="border border-green-200 bg-gradient-to-r from-[#48c772] to-[#389958] text-white">
                    <tr>
                      {block.content.headers.map((h: string, i: number) => (
                        <th
                          key={i}
                          className="px-6 py-3 text-lg font-semibold tracking-wide"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.content.rows.map((row: string[], r: number) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className="px-6 py-4 text-gray-700 border border-green-200"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return null;
        }
      })}
    </article>
  );
}
