export function useDateFormat() {
  const formatDate = (date) => {
    const options = { month: "2-digit", day: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return formatDate;
}
