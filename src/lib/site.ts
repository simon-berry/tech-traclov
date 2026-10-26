export const STORE = "https://pnlcs.tech-trac.co.uk";

export const links = {
  store: `${STORE}/client/store`,
  cart: `${STORE}/client/cart`,
  portal: `${STORE}/client`,
  contact: `${STORE}/client/contact`,
  legal: `${STORE}/legal`,
  vps: `${STORE}/vps-hosting`,
  appHosting: `${STORE}/client/store?kategori=app-hosting`,
  domains: `${STORE}/domains-ssl`,
};

export type Plan = {
  name: string;
  category: "App Hosting" | "VPS";
  price: string;
  features: string[];
  href: string;
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    name: "App Hosting - Basic",
    category: "App Hosting",
    price: "£3.00",
    features: ["2 GB RAM", "1 vCPU", "5 GB SSD storage", "50 GB bandwidth", "Run 1 app", "1 website"],
    href: `${STORE}/client/store/configure/app-hosting`,
  },
  {
    name: "App Hosting - Starter",
    category: "App Hosting",
    price: "£5.00",
    features: ["4 GB RAM", "2 vCPU", "10 GB SSD storage", "50 GB bandwidth", "Run up to 5 apps", "1 website"],
    href: `${STORE}/client/store/configure/app-hosting-3`,
    featured: true,
  },
  {
    name: "VPS - Starter",
    category: "VPS",
    price: "£5.00",
    features: ["Full server access", "See product configuration for specifications"],
    href: `${STORE}/client/store/configure/vps-starter`,
  },
  {
    name: "VPS - Business",
    category: "VPS",
    price: "£9.00",
    features: ["More headroom for growing projects", "See product configuration for specifications"],
    href: `${STORE}/client/store`,
  },
];

export const apps: { name: string; logo: string }[] = [
  { name: "n8n", logo: "/logos/n8n.svg" },
  { name: "OpenLiteSpeed WordPress", logo: "/logos/wordpress.svg" },
  { name: "Watchtower", logo: "/logos/watchtower.svg" },
  { name: "AdGuard Home", logo: "/logos/adguard.svg" },
  { name: "Alpine Linux", logo: "/logos/alpinelinux.svg" },
  { name: "Apache HTTP Server", logo: "/logos/apache.svg" },
  { name: "Authelia", logo: "/logos/authelia.svg" },
  { name: "BookStack", logo: "/logos/bookstack.svg" },
  { name: "Chatwoot", logo: "/logos/chatwoot.svg" },
  { name: "Discourse", logo: "/logos/discourse.svg" },
  { name: "Drupal", logo: "/logos/drupal.svg" },
  { name: "Docker", logo: "/logos/docker.svg" },
];
