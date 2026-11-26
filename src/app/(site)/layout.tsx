import { SiteChrome } from "@/components/site-chrome";

/** Layout for every public page. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <SiteChrome>{children}</SiteChrome>;
}
