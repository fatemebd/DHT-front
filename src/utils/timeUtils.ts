export function convertToSeconds(
  input: number,
  timeFormat: "s" | "m" | "h" | "d",
): number {
  switch (timeFormat) {
    case "s":
      return input; // Already in seconds
    case "m":
      return input * 60; // Convert minutes to seconds
    case "h":
      return input * 60 * 60; // Convert hours to seconds
    case "d":
      return input * 24 * 60 * 60; // Convert days to seconds
    default:
      throw new Error("Invalid recurrence format");
  }
}