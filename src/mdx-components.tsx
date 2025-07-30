import Image, { ImageProps } from "next/image";
import Heading from "@godown/react/heading.js";

const createHeading =
  (as) =>
  ({ children }) => (
    <Heading
      id={children + ""}
      as={as}
    >
      {children}
    </Heading>
  );

export function useMDXComponents() {
  return {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
      />
    ),
  };
}
