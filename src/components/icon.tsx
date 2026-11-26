import {
  Bank,
  Browser,
  Buildings,
  CalendarBlank,
  CashRegister,
  ChartLineUp,
  ChatsCircle,
  Clock,
  Code,
  DeviceMobile,
  Envelope,
  Factory,
  FileText,
  FirstAidKit,
  ForkKnife,
  GlobeHemisphereWest,
  GraduationCap,
  Handshake,
  Hospital,
  Lightning,
  LockKey,
  MagnifyingGlass,
  MapPin,
  Phone,
  RocketLaunch,
  ShieldCheck,
  ShoppingBag,
  Stack,
  TreeStructure,
  Truck,
  UsersThree,
  VideoCamera,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import type { IconKey } from "@/lib/types";

const map: Record<IconKey, PhosphorIcon> = {
  stack: Stack,
  browser: Browser,
  erp: TreeStructure,
  chat: ChatsCircle,
  automation: Lightning,
  mobile: DeviceMobile,
  pos: CashRegister,
  management: Hospital,
  healthcare: FirstAidKit,
  restaurant: ForkKnife,
  retail: ShoppingBag,
  finance: Bank,
  logistics: Truck,
  realestate: Buildings,
  education: GraduationCap,
  manufacturing: Factory,
  shield: ShieldCheck,
  users: UsersThree,
  code: Code,
  handshake: Handshake,
  clock: Clock,
  globe: GlobeHemisphereWest,
  video: VideoCamera,
  calendar: CalendarBlank,
  pin: MapPin,
  mail: Envelope,
  phone: Phone,
  chart: ChartLineUp,
  search: MagnifyingGlass,
  rocket: RocketLaunch,
  wrench: Wrench,
  lock: LockKey,
  document: FileText,
};

export function Icon({
  name,
  size = 24,
  className,
}: {
  name: IconKey;
  size?: number;
  className?: string;
}) {
  const Cmp = map[name];
  return <Cmp size={size} weight="light" className={className} aria-hidden="true" />;
}
