import type { FormatColumnValueFunction, IconValueWithToolTip } from "cloudio";

const formatColumn: FormatColumnValueFunction = ({
  viewAttribute,
  value,
  rawValue,
  record,
  theme,
}) => {
  if (rawValue) {
    let icon: IconValueWithToolTip | undefined;
    const date = new Date(value);
    if (date > new Date()) {
      icon = {
        iconName: "truck-clock",
        color: theme.palette.success.main,
        iconType: "solid",
      };
    } else {
      icon = {
        iconName: "truck-clock",
        color: theme.palette.error.main,
        iconType: "solid",
      };
    }
    return { value, icon };
  }
  return value;
};

// must export a default object with all the functions to be used by this page
export default { formatColumn };
