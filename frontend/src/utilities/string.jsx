export function capitalizeFirstLetter(string) {
  // Replace underscores with spaces and capitalize each word
  return string
    .split("_") // Split the string into words based on underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join the words back with spaces
}
