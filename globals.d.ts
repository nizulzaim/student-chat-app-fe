declare module "*.gql" {
  import { DocumentNode } from "graphql";
  const Schema: DocumentNode;
  export = Schema;
}
declare module "*.graphql" {
  import { DocumentNode } from "graphql";
  const Schema: DocumentNode;
  export = Schema;
}

declare module "#app" {
  interface PageMeta {
    title: string;
    menuItems?: {
      icon: string;
      name: string;
      description: string;
      href: string;
    }[];
  }
}

declare module "@nael/dls" {
  export * from "@nael/dls/src/main";
}

export { }
