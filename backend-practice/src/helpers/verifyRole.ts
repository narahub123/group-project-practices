export const verfiyRole = (role: string) => {
  if (role.includes("ADMIN")) {
    return true;
  }

  return false;
};
