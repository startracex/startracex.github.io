"use client";
import {
  SearchDialog as SearchDialog1,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from "fumadocs-ui/components/dialog/search";
import { useDocsSearch, type ClientPreset } from "fumadocs-core/search/client";
import { useI18n } from "fumadocs-ui/contexts/i18n";

export const clientOptions: ClientPreset =
  process.env.NEXT_PUBLIC_OUTPUT === "export"
    ? {
        type: "static",
      }
    : {
        type: "fetch",
      };

export default function SearchDialog(props: SharedProps) {
  const { locale } = useI18n();
  const { search, setSearch, query } = useDocsSearch({
    ...clientOptions,
    locale,
  });

  return (
    <SearchDialog1
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== "empty" ? query.data : null} />
      </SearchDialogContent>
    </SearchDialog1>
  );
}
