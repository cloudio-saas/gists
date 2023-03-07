/* Copyright (c) 2020-present CloudIO Inc */

import {
  baseComponentManager,
  defaultCommonProps,
  ComponentManagerFn,
} from "cloudio";

const CustomButtonManager: ComponentManagerFn<"CustomButton"> = (
  platform,
  type
) => {
  return {
    ...baseComponentManager(platform, type),
    type,
    name: "My Custom Component",
    isChildAllowed: (page, item, childType) =>
      ["TriggerOnClick", "PulseTip"].includes(childType),
    defaultChildren: ["TriggerOnClick"],
    defaultValue: {
      ...defaultCommonProps,
      label: { value: "Change Me!", type: "text" },
    },
    props: {
      // refer https://next-docs.cloudio.io/ui/custom-component/sample-property-definitions for more examples
      label: {
        label: "Text",
        type: "expression",
        returnType: async () => "string",
      },
    },
    generateShortId: (item) =>
      item.label?.type === "text" ? item.label.value : "",
    category: "Custom",
    icon: { iconName: "check" },
    getParentItemTypes: () => ["Box", "FlexItem"],
    description: "Description about my custom component... CHANGE ME!",
  };
};

export default CustomButtonManager;
