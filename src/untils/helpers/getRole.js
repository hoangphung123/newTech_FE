export const getRole = (value) => {
  let label;
  switch (value) {
    case 0:
      label = "Sinh viên";
      break;
    case 1:
      label = "Giáo viên";
      break;
    default:
      label = "";
      break;
  }

  return label;
};

export const getColor = (value) => {
  let color;
  switch (value) {
    case "STUDENT":
      color = "primary";
      break;
    case "TEACHER":
      color = "success";
      break;
    case "MAJOR_HEAD":
      color = "error";
      break;
    default:
      color = "";
      break;
  }

  return color;
};
