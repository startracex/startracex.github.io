import { Fragment } from "react";

export const createTranslation = (dictionary: Record<string, string>) => {
  return function t(strings: TemplateStringsArray, ...values: any[]) {
    const raw = strings.reduce(
      (acc: any, part: any, i: string | number) => acc + part + (values[i] !== undefined ? `\${${i}}` : ""),
      "",
    );
    const translationEntry = dictionary?.[raw] ?? raw;

    const parts = translationEntry.split(/\$\{(\d+)\}/);

    return (
      <Fragment>
        {parts.map((part: any, i: number) => {
          const key = i + "";
          if (i % 2 === 0) {
            return <Fragment key={key}>{part}</Fragment>;
          }
          return <Fragment key={key}>{values[part]}</Fragment>;
        })}
      </Fragment>
    );
  };
};

export const createStringTranslation = (dictionary: Record<string, string>) => {
  return function t(strings: TemplateStringsArray, ...values: any[]) {
    const raw = strings.reduce(
      (acc: any, part: any, i: string | number) => acc + part + (values[i] !== undefined ? `\${${i}}` : ""),
      "",
    );
    const translationEntry = dictionary?.[raw] ?? raw;

    const parts = translationEntry.split(/\$\{(\d+)\}/);

    return parts
      .map((part: any, i: number) => {
        if (i % 2 === 0) {
          return part;
        }
        return values[part];
      })
      .join("");
  };
};
