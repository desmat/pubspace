
export const SuggestedMenuTypes = [
  "Classic Cocktails",
  "Classic Pasta Dishes",
  "Fast Food Dishes",
  "Salads",
  "Appetizers",
]

export type Menu = {
  id?: string,
  createdBy?: string,
  createdAt?: number,
  deletedAt?: number,
  prompt?: string,
  status?: string,
  name: string,
  items: MenuItem[],
};

export type MenuItem = {
  id?: string,
  name: string,
  description?: string,
  ingredients?: string[],
  preparation?: string,
}
