
import { defineSchema, defineConfig } from 'tinacms'
import { client } from './__generated__/client'


const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main'
const schema = defineSchema({
  // See https://tina.io/docs/tina-cloud/connecting-site/ for more information about this config
  config: {
    token: process.env.NEXT_APP_TINA_READ_ONLY, // generated on app.tina.io,
    clientId: process.env.NEXT_APP_TINA_CLIENT_ID, // generated on app.tina.io
    branch,
    media: {
      // If you wanted cloudinary do this
      // loadCustomStore: async () => {
      //   const pack = await import("next-tinacms-cloudinary");
      //   return pack.TinaCloudCloudinaryMediaStore;
      // },
      // this is the config for the tina cloud media store
      tina: {
        publicFolder: "public",
        mediaRoot: "uploads",
      },
    },
  },
  collections: [
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/posts',
      format: 'mdx',
      ui: {
        router: ({ document }) => {
          // This can be used to add contextual editing to your site. See https://tina.io/docs/tinacms-context/#accessing-contextual-editing-from-the-cms for more information.
          return `/blog/${document._sys.filename}`
        },
      },
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: "image",
          name: "heroImg",
          label: "Hero Image",
        },
        {
          type: "rich-text",
          label: "Excerpt",
          name: "excerpt",
        },
        // {
        //   type: "reference",
        //   label: "Author",
        //   name: "author",
        //   collections: ["author"],
        // },
        // {
        //   type: "datetime",
        //   label: "Posted Date",
        //   name: "date",
        //   ui: {
        //     dateFormat: "MMMM DD YYYY",
        //     timeFormat: "hh:mm A",
        //   },
        // },
        {
          type: 'rich-text',
          label: 'Body',
          name: 'body',
          isBody: true,
          templates: [
            {
              name: 'PageSection',
              label: 'Page Section',
              fields: [
                {
                  type: 'string',
                  name: 'heading',
                  label: 'Heading',
                },
                {
                  type: 'string',
                  name: 'content',
                  label: 'Content',
                  ui: {
                    component: 'textarea',
                  },
                },
              ],
            },
            // {
            //   name: "BlockQuote",
            //   label: "Block Quote",
            //   fields: [
            //     {
            //       name: "children",
            //       label: "Quote",
            //       type: "rich-text",
            //     },
            //     {
            //       name: "authorName",
            //       label: "Author",
            //       type: "string",
            //     },
            //   ],
            // },
          ],
        },
      ],
    },
    {
      label: "Pages",
      name: "page",
      path: "content/pages",
      ui: {
        router: ({ document }) => {
          if (document._sys.filename === "home") {
            return `/`;
          }
          return undefined
        }
      },
      fields: [
        {
          type: "string",
          label: "SEO Title",
          name: "title"
        },
        {
          type: "string",
          label: "SEO Description",
          name: "description"
        },
        {
          type: "image",
          label: "Open Graph Image",
          name: "heroImg",
        },
      ]
    }
  ],
})

export default schema

// Your tina config

export const tinaConfig = defineConfig({
  client,
  schema,
})

