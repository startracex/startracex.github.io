import Heading from "@godown/react/heading.js";
import defaultComponents from "fumadocs-ui/mdx";
import { MDXComponents } from "mdx/types";

const createHeading =
  (as: 1 | 2 | 3 | 4 | 5 | 6) =>
  ({ id, children }) => {
    return (
      <Heading
        id={id}
        as={`h${as}`}
        side="left"
        className="ml-4"
      >
        {children}
      </Heading>
    );
  };

export function useMDXComponents(): MDXComponents {
  return {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
  };
}

export function getMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...useMDXComponents(),
    ...components,
  };
}
