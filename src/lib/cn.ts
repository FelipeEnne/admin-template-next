type ClassValue = string | false | null | undefined;

export default function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}
