import { getPage } from "@/lib/wordpress"
import { parseWPContent } from "@/lib/wpParser"

import ImageTextSection from "@/components/ImageTextSection"

export default async function Page({ params }) {

  const page = await getPage(params.slug)

  const sections = parseWPContent(page.content.rendered)

  return (

    <main>

      {sections.map((section, index) => {

        if (section.type === "two-column") {

          return (
            <ImageTextSection
              key={index}
              left={section.columns[0]}
              right={section.columns[1]}
            />
          )
        }

      })}

    </main>
  )
}