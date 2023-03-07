// CustomButton
// 1. Define the type for the props to your custom component
export interface CustomButton extends CommonProps {
  label: ExpressionValue;
}

// 2. Define the item type of your custom component
export interface CustomButtonItem extends BaseComponentItem {
  props: CustomButton;
  type: "CustomButton";
}

// 3. Register your custom component type by adding an entry to CustomComponentItemTypeRegistry
export interface CustomComponentItemTypeRegistry {
  StoreFrontCard: StoreFrontCard;
  StoreFrontCardContainer: StoreFrontCardContainer;
  CustomButton: CustomButton;
}

// 4. Added your custom component item type to CustomComponentItem
export type CustomComponentItem =
  | StoreFrontCardItem
  | StoreFrontCardContainerItem
  | CustomButton;
