/* Copyright (c) 2020-present CloudIO Inc */

import React from "react";
import {
  useStringExpression,
  useTrigger,
  useSetCurrentRecord,
  useAsyncControllerFunction,
  useRowIndex,
  BaseProps,
  ExpressionValue,
} from "cloudio";
import { CustomButton } from "@cloudio-saas/custom-types";
import { Button } from "@mui/material";

interface Props extends BaseProps<"CustomButton"> {}

interface Props extends Required<CustomButton>, BaseProps<"CustomButton"> {}

function CustomButtonComponent(
  {
    domProps,
    className,
    children,
    pageId,
    appUid,
    roleUid,
    itemId,
    label,
    platform,
  }: Props,
  ref: React.Ref<HTMLButtonElement>
) {
  const rowIndex = useRowIndex();
  const textResult = useStringExpression({
    exp: label,
    context: { appUid, pageId, itemId, property: "label", data: { rowIndex } },
  });
  const [onClickTrigger, clickInProgress] = useTrigger(
    {
      platform,
      appUid,
      roleUid,
      pageId,
      itemId,
    },
    "TriggerOnClick"
  );
  const setCurrentRecord = useSetCurrentRecord();

  const onClick = React.useCallback(
    async (e) => {
      if (rowIndex !== undefined) {
        setCurrentRecord(rowIndex);
      }
      if (platform.isRecording()) {
        platform.recordLine(
          itemId,
          `await ui.click({ testid: '${itemId}-some-unique-testid' });`
        );
      }
      if (onClickTrigger) {
        await onClickTrigger(e);
      }
    },
    [onClickTrigger, rowIndex, setCurrentRecord]
  );

  return (
    <Button
      ref={ref}
      disabled={clickInProgress}
      variant="contained"
      data-testid={`${itemId}-some-unique-testid`}
      className={className}
      onClick={onClick}
      {...domProps}
    >
      {textResult}
      {children}
    </Button>
  );
}

export default React.forwardRef(CustomButtonComponent);
