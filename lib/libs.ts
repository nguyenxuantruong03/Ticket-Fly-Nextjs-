export const getInitialsName = (name: string) => {
  if (!name) return "CN"; // Fallback nếu không có tên

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    // Nếu chỉ có 1 từ, lấy chữ cái đầu tiên
    return words[0].charAt(0).toUpperCase();
  }

  // Nếu có từ 2 từ trở lên, lấy chữ đầu từ thứ nhất và chữ đầu từ cuối cùng
  const firstInitial = words[0].charAt(0).toUpperCase();
  const lastInitial = words[words.length - 1].charAt(0).toUpperCase();

  return `${firstInitial}${lastInitial}`;
};
